//@ts-check
export class BDSMPlayer {
    hp: number;
    atk: number;
    adv_def: number;
    critchance: number;
    bonuses: any;
    tier4 = {dmg: 0, def: 0};
    tier5 = {id: 0, value: 0};
    name:string = '';

    constructor(hp: number,atk: number,adv_def: number,critchance: number,bonuses: any,tier4: any,tier5: any, name=''){
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