import { isJSON } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { BDSMPlayer, BDSMSimu } from '../model/index';
import { getHHScriptVars } from "./ConfigHelper";
import { getStoredValue, setStoredValue } from "./StorageHelper";

export class BDSMHelper {

    static fightBonues(team){
        return {
            critDamage: team.synergies.find(({element: {type}})=>type==='fire').bonus_multiplier,
            critChance: team.synergies.find(({element: {type}})=>type==='stone').bonus_multiplier,
            defReduce: team.synergies.find(({element: {type}})=>type==='sun').bonus_multiplier,
            healOnHit: team.synergies.find(({element: {type}})=>type==='water').bonus_multiplier
        }
    }
        
    static getBdsmPlayersData(inHeroData, opponentData, inLeague=false)
    {
        // player stats
        const playerEgo = inHeroData.remaining_ego;
        const playerDef = inHeroData.defense;
        const playerAtk = inHeroData.damage;
        const playerCrit = inHeroData.chance;
        
        let playerElements:any[] = [];
        inHeroData.team.theme_elements.forEach((el) => playerElements.push(el.type));
        const playerBonuses = BDSMHelper.fightBonues(inHeroData.team);
    
        const opponentEgo = opponentData.remaining_ego;
        const opponentDef = opponentData.defense;
        const opponentAtk = opponentData.damage;
        const opponentCrit = opponentData.chance;
    
        let opponentElements:any[] = [];
        opponentData.team.theme_elements.forEach((el) => opponentElements.push(el.type));
        
        const opponentBonuses = BDSMHelper.fightBonues(opponentData.team);
        const dominanceBonuses = calculateDominationBonuses(playerElements, opponentElements);
    
        const player = new BDSMPlayer(
            inLeague ? playerEgo * (1+dominanceBonuses.player.ego) : playerEgo,
            inLeague ? playerAtk * (1+dominanceBonuses.player.attack) : playerAtk,
            opponentDef,
            calculateCritChanceShare(playerCrit, opponentCrit) + dominanceBonuses.player.chance + playerBonuses.critChance,
            playerBonuses,
            calculateTier4SkillValue(inHeroData.team.girls),
            calculateTier5SkillValue(inHeroData.team.girls),
            inHeroData.nickname
        );
        const opponent = new BDSMPlayer(
            opponentEgo,
            opponentAtk,
            inLeague ? playerDef * (1-opponentBonuses.defReduce) : playerDef,
            calculateCritChanceShare(opponentCrit, playerCrit) + dominanceBonuses.opponent.chance + opponentBonuses.critChance,
            opponentBonuses,
            calculateTier4SkillValue(opponentData.team.girls),
            calculateTier5SkillValue(opponentData.team.girls),
            opponentData.nickname
        );
        return {player:player, opponent:opponent, dominanceBonuses:dominanceBonuses}
    }
}

let _player;
let _opponent;
let _cache;
let _runs;

//all following lines credit:Tom208 OCD script
const tier5_Skill_Id = [11, 12, 13, 14];
export function calculateBattleProbabilities(player, opponent):BDSMSimu {
    _player = player;
    _opponent = opponent;

    const setup = x => {
        x.critMultiplier = 2 + x.bonuses.critDamage;
        x.hp = Math.ceil(x.hp);
    }

    setup(_player);
    setup(_opponent);

    _cache = {};
    _runs = 0;

    //Tier 5 skill : Shield
    let playerShield = 0;
    let opponentShield = 0;

    let ret;
    try {
        // start simulation from player's turn
        ret = playerTurn(_player.hp, _opponent.hp, 0);
    } catch (error) {
        return {
            points: [],
            win: Number.NaN,
            loss: Number.NaN,
            avgTurns: Number.NaN,
            scoreClass: 'minus'
        } as any as BDSMSimu;
    }

    const sum = ret.win + ret.loss;
    ret.win /= sum;
    ret.loss /= sum;
    ret.scoreClass = ret.win>0.9?'plus':ret.win<0.5?'minus':'close';

    return ret;

    function calculateDmg(x, turns) {
        const dmg = x.atk * (1 + x.tier4.dmg) ** turns - x.adv_def * (1 + x.tier4.def) ** turns;

        return {
            baseAtk : {
                probability: 1 - x.critchance,
                damageAmount: Math.ceil(dmg)
            },
            critAtk : {
                probability: x.critchance,
                damageAmount: Math.ceil(dmg * x.critMultiplier)
            }
        }
    }

    function mergeResult(x:BDSMSimu, xProbability: number, y:BDSMSimu, yProbability: number) {
        const points = {};
        Object.entries(x.points).map(([point, probability]) => [point, probability * xProbability])
            .concat(Object.entries(y.points).map(([point, probability]) => [point, probability * yProbability]))
            .forEach(([point, probability]) => {
            points[point] = (points[point] || 0) + probability
        });
        const merge = (x, y) => x * xProbability + y * yProbability;
        const win = merge(x.win, y.win);
        const loss = merge(x.loss, y.loss);
        const avgTurns = merge(x.avgTurns, y.avgTurns);
        return { points, win, loss, avgTurns };
    }

    function playerTurn(playerHP, opponentHP, turns) {
        turns += 1;
        // avoid a stack overflow
        const maxAllowedTurns = 50;
        if (turns > maxAllowedTurns) throw new Error();

        // read cache
        const cachedResult = _cache?.[playerHP]?.[opponentHP];
        if (cachedResult) return cachedResult;

        // simulate base attack and critical attack
        const {baseAtk, critAtk} = calculateDmg(_player, turns);
        const baseAtkResult = playerAttack(playerHP, opponentHP, baseAtk, turns);
        const critAtkResult = playerAttack(playerHP, opponentHP, critAtk, turns);
        // merge result
        const mergedResult = mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability);

        // count player's turn
        mergedResult.avgTurns += 1;

        // write cache
        if (!_cache[playerHP]) _cache[playerHP] = {};
        if (!_cache[playerHP][opponentHP]) _cache[playerHP][opponentHP] = {};
        _cache[playerHP][opponentHP] = mergedResult;

        return mergedResult;
    }

    function playerAttack(playerHP, opponentHP, attack, turns) {
        //Tier 5 skill : Stun
        if (_opponent.tier5.id == 11 && (turns == 2 || turns == 3)) {
            // next turn
            return playerTurn(playerHP, opponentHP, turns);
        }

        let playerDamage = Math.max(0, (attack.damageAmount - opponentShield));
        opponentHP -= playerDamage;

        //Tier 5 skill : Shield
        if (_player.tier5.id == 12 && turns == 1) {
            playerShield = Math.ceil(_player.tier5.value * _player.hp);
        }
        if (_opponent.tier5.id == 12 && turns > 1) {
            opponentShield -= attack.damageAmount;
            opponentShield = Math.max(0, opponentShield);
        }

        //Tier 5 skill : Reflect
        let opponentReflectDmg = 0;
        if (_opponent.tier5.id == 13 && (turns == 2 || turns == 3)) {
            opponentReflectDmg = Math.ceil(_opponent.tier5.value * attack.damageAmount);
            playerHP -= Math.max(0, (opponentReflectDmg - playerShield));
            playerShield -= opponentReflectDmg;
            playerShield = Math.max(0, playerShield);
        }

        //Tier 5 skill : Execute
        if (_player.tier5.id == 14) {
            let opponentHPRate = opponentHP / _opponent.hp;
            if (opponentHPRate <= _player.tier5.value) {
                opponentHP = 0;
            }
        }

        // heal on hit
        let playerHeal = Math.ceil(_player.bonuses.healOnHit * playerDamage);
        playerHP += playerHeal;
        playerHP = Math.min(playerHP, _player.hp);

        // check win
        if (opponentHP <= 0) {
            const point = Math.min(25, 15 + Math.ceil(10 * playerHP / _player.hp));
            _runs += 1;
            return { points: { [point]: 1 }, win: 1, loss: 0, avgTurns: 0 };
        }

        // next turn
        return opponentTurn(playerHP, opponentHP, turns);
    }

    function opponentTurn(playerHP, opponentHP, turns) {
        // simulate base attack and critical attack
        const {baseAtk, critAtk} = calculateDmg(_opponent, turns);
        const baseAtkResult = opponentAttack(playerHP, opponentHP, baseAtk, turns);
        const critAtkResult = opponentAttack(playerHP, opponentHP, critAtk, turns);
        // merge result
        return mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability);
    }

    function opponentAttack(playerHP, opponentHP, attack, turns) {
        //Tier 5 skill : Stun
        if (_player.tier5.id == 11 && (turns == 1 || turns == 2)) {
            // next turn
            return playerTurn(playerHP, opponentHP, turns);
        }

        // damage
        let opponentDamage = Math.max(0, (attack.damageAmount - playerShield));
        playerHP -= opponentDamage;

        //Tier 5 skill : Shield
        if (_opponent.tier5.id == 12 && turns == 1) {
            opponentShield = Math.ceil(_opponent.tier5.value * _opponent.hp);
        }
        if (_player.tier5.id == 12) {
            playerShield -= attack.damageAmount;
            playerShield = Math.max(0, playerShield);
        }

        //Tier 5 skill : Reflect
        let playerReflectDmg = 0;
        if (_player.tier5.id == 13 && (turns == 1 || turns == 2)) {
            playerReflectDmg = Math.ceil(_player.tier5.value * attack.damageAmount);
            opponentHP -= Math.max(0, (playerReflectDmg - opponentShield));
            opponentShield -= playerReflectDmg;
            opponentShield = Math.max(0, opponentShield);
        }

        //Tier 5 skill : Execute
        if (_opponent.tier5.id == 14) {
            let playerHPRate = playerHP / _player.hp;
            if (playerHPRate <= _opponent.tier5.value) {
                playerHP = 0;
                //console.log("PLAYER EXECUTED!!");
            }
        }

        // heal on hit
        let opponentHeal = Math.ceil(_opponent.bonuses.healOnHit * opponentDamage);
        opponentHP += opponentHeal;
        opponentHP = Math.min(opponentHP, _opponent.hp);

        // check loss
        if (playerHP <= 0) {
            const point = Math.max(3, 3 + Math.ceil(10 * (_opponent.hp - opponentHP) / _opponent.hp));
            _runs += 1;
            return { points: { [point]: 1 }, win: 0, loss: 1, avgTurns: 0 };
        }

        // next turn
        return playerTurn(playerHP, opponentHP, turns);
    }
}

export function calculateTier4SkillValue(teamGirlsArray) {
    let skill_tier_4 = {dmg: 0, def: 0};

    teamGirlsArray.forEach((girl) => {
        if (girl.skills[9]) skill_tier_4.dmg += girl.skills[9].skill.percentage_value/100;
        if (girl.skills[10]) skill_tier_4.def += girl.skills[10].skill.percentage_value/100;
    })
    return skill_tier_4;
}

export function calculateTier5SkillValue(teamGirlsArray) {
    let skill_tier_5 = {id: 0, value: 0};
    const girl = teamGirlsArray[0];

    tier5_Skill_Id.forEach((id) => {
        if (girl.skills[id]) {
            skill_tier_5.id = id;
            skill_tier_5.value = (id == 11) ? parseInt(girl.skills[id].skill.display_value_text, 10)/100 : girl.skills[id].skill.percentage_value/100;
        }
    })
    return skill_tier_5;
}
/*
export function calculateThemeFromElements(elements) {
    const counts = countElementsInTeam(elements)

    const theme = []
    Object.entries(counts).forEach(([element, count]) => {
        if (count >= 3) {
            theme.push(element)
        }
    })
    return theme;
}

export function countElementsInTeam(elements) {
    return elements.reduce((a,b)=>{a[b]++;return a}, {
        fire: 0,
        stone: 0,
        sun: 0,
        water: 0,
        nature: 0,
        darkness: 0,
        light: 0,
        psychic: 0
    })
}
*/
/*
commented        const girlDictionary
replaced         const girlCount = girlDictionary.size || 800
              by const girlCount = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")).count:800;
              *
export function calculateSynergiesFromTeamMemberElements(elements) {
    const counts = countElementsInTeam(elements)

    // Only care about those not included in the stats already: fire, stone, sun and water
    // Assume max harem synergy
    //const girlDictionary = (typeof(localStorage.HHPNMap) == "undefined") ? new Map(): new Map(JSON.parse(localStorage.HHPNMap));
    const girlCount = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")).count:800;
    const girlsPerElement = Math.min(girlCount / 8, 100)

    return {
        critDamage: (0.0035 * girlsPerElement) + (0.1  * counts.fire),
        critChance: (0.0007 * girlsPerElement) + (0.02 * counts.stone),
        defReduce:  (0.0007 * girlsPerElement) + (0.02 * counts.sun),
        healOnHit:  (0.001  * girlsPerElement) + (0.03 * counts.water)
    }
}
*/
/*
replaced       ELEMENTS
by getHHScriptVars("ELEMENTS")
*/
export function calculateDominationBonuses(playerElements, opponentElements) {
    const bonuses = {
        player: {
            ego: 0,
            attack: 0,
            chance: 0
        },
        opponent: {
            ego: 0,
            attack: 0,
            chance: 0
        }
    };

    [
        {a: playerElements, b: opponentElements, k: 'player'},
        {a: opponentElements, b: playerElements, k: 'opponent'}
    ].forEach(({a,b,k})=>{
        a.forEach(element => {
            if (getHHScriptVars("ELEMENTS").egoDamage[element] && b.includes(getHHScriptVars("ELEMENTS").egoDamage[element])) {
                bonuses[k].ego += 0.1
                bonuses[k].attack += 0.1
            }
            if (getHHScriptVars("ELEMENTS").chance[element] && b.includes(getHHScriptVars("ELEMENTS").chance[element])) {
                bonuses[k].chance += 0.2
            }
        })
    })

    return bonuses
}

export function calculateCritChanceShare(ownHarmony, otherHarmony)
{
    return 0.3*ownHarmony/(ownHarmony+otherHarmony)
}