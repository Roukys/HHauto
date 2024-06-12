export class MangaRpg {
    static getEnv() {
        return {
            "www.mangarpg.com": { name: "MRPG_prod", id: "hh_mangarpg", baseImgPath: "https://mh.hh-content.com" },
            "nutaku.mangarpg.com": { name: "NMRPG_prod", id: "hh_mangarpg", baseImgPath: "https://mh.hh-content.com" }
        }
    }
    static getTrolls() {
        return ['Latest',
            'William Scarlett'];
    }

    static updateFeatures(envVariables: any) {
        envVariables.isEnabledClubChamp = false;// to remove when Club Champs arrives in Manga RPG
        envVariables.isEnabledPantheon = false;// to remove when Pantheon arrives in Manga RPG
        envVariables.isEnabledSeasonalEvent = false;// to remove when event arrives in Manga RPG
        envVariables.isEnabledBossBangEvent = false;// to remove when event arrives in Manga RPG
        envVariables.isEnabledSultryMysteriesEvent = false;// to remove when event arrives in Manga RPG
    }
}