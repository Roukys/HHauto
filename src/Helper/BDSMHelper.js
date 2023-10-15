import { isJSON } from "../Utils";
import { HHStoredVarPrefixKey } from "../config";
import { getHHScriptVars } from "./ConfigHelper";
import { getStoredValue, setStoredValue } from "./StorageHelper";


export function customMatchRating(inSimu) // NOT used ?
{
    let matchRating = inSimu.score;
    var customLimits = getStoredValue(HHStoredVarPrefixKey+"Setting_calculatePowerLimits").split(";");
    if(customLimits.length === 2 && Number(customLimits[0]) < Number(customLimits[1]))
    {
        if (matchRating >= 0)
        {
            matchRating = '+' + matchRating;
        }
        if ( Number(matchRating) < Number(customLimits[0]) )
        {
            return 'r'+matchRating
        }
        else
        {
            if ( Number(matchRating) < Number(customLimits[1]) )
            {
                return 'y'+matchRating
            }
            else
            {
                return 'g'+matchRating
            }
        }
    }
    else
    {
        if ( getStoredValue(HHStoredVarPrefixKey+"Setting_calculatePowerLimits") !== "default")
        {
            setStoredValue(HHStoredVarPrefixKey+"Setting_calculatePowerLimits", "Invalid limits");
        }
        if (matchRating >= 0)
        {
            matchRating = '+' + matchRating;

            if (inSimu.playerEgoCheck <= 0)
            {
                return 'y'+matchRating
            }
            else
            {
                return 'g'+matchRating
            }
        }
        else {
            matchRating = matchRating;
            return 'r'+matchRating
        }
    }
}

let _player;
let _opponent;
let _cache;
let _runs;
//all following lines credit:Tom208 OCD script
export function calculateBattleProbabilities(player, opponent) {
    _player = player;
    _opponent = opponent;

    const setup = x => {
        x.critMultiplier = 2 + x.bonuses.critDamage;
        x.dmg = Math.max(0, x.dmg);
        x.baseAttack = {
            probability: 1 - x.critchance,
            damageAmount: Math.ceil(x.dmg),
            healAmount: Math.ceil(x.dmg * x.bonuses.healOnHit)
        };
        x.critAttack = {
            probability: x.critchance,
            damageAmount: Math.ceil(x.dmg * x.critMultiplier),
            healAmount: Math.ceil(x.dmg * x.critMultiplier * x.bonuses.healOnHit)
        };
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
        return {
            points: [],
            win: Number.NaN,
            loss: Number.NaN,
            avgTurns: Number.NaN,
            scoreClass: 'minus'
        };
    }

    const sum = ret.win + ret.loss;
    ret.win /= sum;
    ret.loss /= sum;
    ret.scoreClass = ret.win>0.9?'plus':ret.win<0.5?'minus':'close';

    return ret;


    function mergeResult(x, xProbability, y, yProbability) {
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
        const baseAtk = _player.baseAttack;
        const baseAtkResult = playerAttack(playerHP, opponentHP, baseAtk, turns);
        const critAtk = _player.critAttack;
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
        // damage
        opponentHP -= attack.damageAmount;

        // heal on hit
        playerHP += attack.healAmount;
        playerHP = Math.min(playerHP, _player.hp);

        // check win
        if (opponentHP <= 0) {
            const point = 15 + Math.ceil(10 * playerHP / _player.hp);
            _runs += 1;
            return { points: { [point]: 1 }, win: 1, loss: 0, avgTurns: 0 };
        }

        // next turn
        return opponentTurn(playerHP, opponentHP, turns);
    }

    function opponentTurn(playerHP, opponentHP, turns) {
        // simulate base attack and critical attack
        const baseAtk = _opponent.baseAttack;
        const baseAtkResult = opponentAttack(playerHP, opponentHP, baseAtk, turns);
        const critAtk = _opponent.critAttack;
        const critAtkResult = opponentAttack(playerHP, opponentHP, critAtk, turns);
        // merge result
        return mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability);
    }

    function opponentAttack(playerHP, opponentHP, attack, turns) {
        // damage
        playerHP -= attack.damageAmount;

        // heal on hit
        opponentHP += attack.healAmount;
        opponentHP = Math.min(opponentHP, _opponent.hp);

        // check loss
        if (playerHP <= 0) {
            const point = 3 + Math.ceil(10 * (_opponent.hp - opponentHP) / _opponent.hp);
            _runs += 1;
            return { points: { [point]: 1 }, win: 0, loss: 1, avgTurns: 0 };
        }

        // next turn
        return playerTurn(playerHP, opponentHP, turns);
    }
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

export function simulateBattle (player, opponent) {
    let points

    const playerStartHP = player.hp
    const opponentStartHP = opponent.hp

    let turns = 0

    while (true) {
        turns++
        //your turn
        let damageAmount = player.dmg
        if (Math.random() < player.critchance) {
            damageAmount = player.dmg * player.critMultiplier
        }
        let healAmount = Math.min(playerStartHP - player.hp, damageAmount * player.bonuses.healOnHit)
        opponent.hp -= damageAmount;
        player.hp += healAmount;

        //check win
        if(opponent.hp<=0){
            //count score
            points = 15+Math.ceil(player.hp/playerStartHP * 10);
            break;
        }

        //opp's turn
        damageAmount = opponent.dmg
        if (Math.random() < opponent.critchance) {
            damageAmount = opponent.dmg * opponent.critMultiplier
        }
        healAmount = Math.min(opponentStartHP - opponent.hp, damageAmount * opponent.bonuses.healOnHit)
        player.hp -= damageAmount;
        opponent.hp += healAmount;

        //check loss
        if(player.hp<=0){
            //count score
            points = 3+Math.ceil((opponentStartHP - opponent.hp)/opponentStartHP * 10);
            break;
        }
    }

    return {points, turns}
}

/*
commented        const girlDictionary
replaced         const girlCount = girlDictionary.size || 800
              by const girlCount = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")).count:800;
              */
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