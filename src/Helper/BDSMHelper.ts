import { BDSMPlayer, BDSMSimu } from '../model/index';
import { logHHAuto } from '../Utils/LogUtils';
import { ConfigHelper } from "./ConfigHelper";

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
            { ...playerBonuses, dominance: dominanceBonuses.player },
            playerElements,
            getSkillPercentage(inHeroData.team, 9),
            getSkillPercentage(opponentData.team, 10),
            inHeroData.nickname
        );
        const opponent = new BDSMPlayer(
            opponentEgo,
            opponentAtk,
            inLeague ? playerDef * (1-opponentBonuses.defReduce) : playerDef,
            calculateCritChanceShare(opponentCrit, playerCrit) + dominanceBonuses.opponent.chance + opponentBonuses.critChance,
            { ...opponentBonuses, dominance: dominanceBonuses.opponent },
            opponentElements,
            getSkillPercentage(opponentData.team, 9),
            getSkillPercentage(inHeroData.team, 10),
            opponentData.nickname
        );
        return {player:player, opponent:opponent, dominanceBonuses:dominanceBonuses}
    }
}

let _player;
let _opponent;
let _cache;
let _runs;

export function calculateBattleProbabilities(player, opponent, debugEnabled: boolean = false):BDSMSimu {

    if (debugEnabled) {
        logHHAuto('Running simulation against' + opponent.name, opponent);
    }

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

    let ret;
    try {
        // start simulation from player's turn
        ret = playerTurn(_player.hp, _opponent.hp, 0);
    } catch (error) {
        // logHHAuto(`An error occurred during the simulation against ${_opponent.name}`, error)
        return new BDSMSimu();
    }

    const sum = ret.win + ret.loss;
    ret.win /= sum;
    ret.loss /= sum;
    ret.scoreClass = ret.win>0.9?'plus':ret.win<0.5?'minus':'close';

    if (debugEnabled) {
        logHHAuto(`Ran ${_runs} simulations against ${_opponent.name}; aggregated win chance: ${ret.win * 100}%, average turns: ${ret.avgTurns}`);
    }

    return ret;

    function calculateDmg(x, turns: number) {
        const dmg = Math.max(0, x.atk * (x.atkMult ** turns) - x.adv_def * (x.defMult ** turns))

        return {
            baseAtk : {
                probability: 1 - x.critchance,
                damageAmount: Math.ceil(dmg),
                healAmount: Math.ceil(dmg * x.bonuses.healOnHit)
            },
            critAtk : {
                probability: x.critchance,
                damageAmount: Math.ceil(dmg * x.critMultiplier),
                healAmount: Math.ceil(dmg * x.critMultiplier * x.bonuses.healOnHit)
            }
        }
    }

    function mergeResult(x: BDSMSimu, xProbability: number, y: BDSMSimu, yProbability: number): BDSMSimu {
        const points = [];
        Object.entries(x.points).map(([point, probability]) => [point, probability * xProbability])
            .concat(Object.entries(y.points).map(([point, probability]) => [point, probability * yProbability]))
            .forEach(([point, probability]) => {
            points[point] = (points[point] || 0) + probability
        });
        const merge = (x, y) => x * xProbability + y * yProbability;
        const win = merge(x.win, y.win);
        const loss = merge(x.loss, y.loss);
        const avgTurns = merge(x.avgTurns, y.avgTurns);
        return new BDSMSimu(points, win, loss, avgTurns);
    }

    function playerTurn(playerHP, opponentHP, turns: number): BDSMSimu {
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

    function playerAttack(playerHP, opponentHP, attack, turns: number): BDSMSimu {
        // damage
        opponentHP -= attack.damageAmount;

        // heal on hit
        playerHP += attack.healAmount;
        playerHP = Math.min(playerHP, _player.hp);

        // check win
        if (opponentHP <= 0) {
            const point = 15 + Math.ceil(10 * playerHP / _player.hp);
            _runs += 1;
            return new BDSMSimu({ [point]: 1 } as any[], 1, 0, 0);
        }

        // next turn
        return opponentTurn(playerHP, opponentHP, turns);
    }

    function opponentTurn(playerHP, opponentHP, turns: number): BDSMSimu {
        // simulate base attack and critical attack
        const {baseAtk, critAtk} = calculateDmg(_opponent, turns);
        const baseAtkResult = opponentAttack(playerHP, opponentHP, baseAtk, turns);
        const critAtkResult = opponentAttack(playerHP, opponentHP, critAtk, turns);
        // merge result
        return mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability);
    }

    function opponentAttack(playerHP, opponentHP, attack, turns: number): BDSMSimu {
        // damage
        playerHP -= attack.damageAmount;

        // heal on hit
        opponentHP += attack.healAmount;
        opponentHP = Math.min(opponentHP, _opponent.hp);

        // check loss
        if (playerHP <= 0) {
            const point = 3 + Math.ceil(10 * (_opponent.hp - opponentHP) / _opponent.hp);
            _runs += 1;
            return new BDSMSimu({ [point]: 1 } as any[], 0, 1, 0);
        }

        // next turn
        return playerTurn(playerHP, opponentHP, turns);
    }
}

/*
export function calculateTier4SkillValue(teamGirlsArray) {
    let skill_tier_4 = {dmg: 0, def: 0};

    teamGirlsArray.forEach((girl) => {
        if (girl.skills[9]) skill_tier_4.dmg += girl.skills[9].skill.percentage_value/100;
        if (girl.skills[10]) skill_tier_4.def += girl.skills[10].skill.percentage_value/100;
    })
    return skill_tier_4;
}

const tier5_Skill_Id = [11, 12, 13, 14];
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
by ConfigHelper.getHHScriptVars("ELEMENTS")
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
            if (ConfigHelper.getHHScriptVars("ELEMENTS").egoDamage[element] && b.includes(ConfigHelper.getHHScriptVars("ELEMENTS").egoDamage[element])) {
                bonuses[k].ego += 0.1
                bonuses[k].attack += 0.1
            }
            if (ConfigHelper.getHHScriptVars("ELEMENTS").chance[element] && b.includes(ConfigHelper.getHHScriptVars("ELEMENTS").chance[element])) {
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

export function getSkillPercentage(team, id) {
    return 1 + (team.girls.map(e => e.skills[id]?.skill.percentage_value ?? 0).reduce((a, b) => a + b, 0) / 100);
}