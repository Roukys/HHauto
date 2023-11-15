//@ts-check
export class BDSMPlayer {
    hp;
    atk;
    adv_def;
    critchance;
    bonuses;
    tier4 = {dmg: 0, def: 0};
    tier5 = {id: 0, value: 0};
    name = '';

    /**
     * 
     * @param {number} hp 
     * @param {number} atk 
     * @param {number} adv_def 
     * @param {number} critchance 
     * @param {Object} bonuses 
     * @param {Object} tier4 
     * @param {Object} tier5 
     * @param {string} name 
     */
    constructor(hp,atk,adv_def,critchance,bonuses,tier4,tier5, name=''){
        this.hp = hp;
        this.atk = atk;
        this.adv_def = adv_def;
        this.critchance = critchance;
        this.bonuses = bonuses;
        this.tier4 = tier4;
        this.tier5 = tier5;
        this.name = name;
    }
}