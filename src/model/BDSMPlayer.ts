//@ts-check
export class BDSMPlayer {
    hp: number;
    atk: number;
    adv_def: number;
    critchance: number;
    bonuses: any;
    theme: any;
    atkMult: any;
    defMult: any;
    name:string = '';

    constructor(hp: number, atk: number, adv_def: number, critchance: number, bonuses: any, theme: any, atkMult: any, defMult: any, name=''){
        this.hp = hp;
        this.atk = atk;
        this.adv_def = adv_def;
        this.critchance = critchance;
        this.bonuses = bonuses;
        this.theme = theme;
        this.atkMult= atkMult;
        this.defMult= defMult;
        this.name = name;
    }
}