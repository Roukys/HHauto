import { KKEnergy } from "./KKEnergy"

export class KKHero {
    infos: any;
    energies: {
        quest: KKEnergy,
        fight: KKEnergy,
        challenge: KKEnergy,
        kiss: KKEnergy,
        worship: KKEnergy,
        reply: KKEnergy
    };
    energy_fields: any;
    caracs:any;
    club: any;
    currencies: {
        hard_currency: number;
        laby_coin: number;
        rejuvenation_stone: number;
        scrolls_common: number;
        scrolls_epic: number;
        scrolls_legendary: number;
        scrolls_mythic: number;
        scrolls_rare: number;
        seasonal_event_cash: number;
        soft_currency: number;
        sultry_coins: number;
        ticket: number;
    };
    mc_level: any;
    name: any;
    recharge: any;
    update: any;
    updates: any;
}