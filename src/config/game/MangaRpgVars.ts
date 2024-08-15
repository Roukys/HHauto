export class MangaRpg {
    static getEnv() {
        return {
            "www.mangarpg.com": { name: "MRPG_prod", id: "hh_mangarpg", baseImgPath: "https://mh.hh-content.com" },
            "nutaku.mangarpg.com": { name: "NMRPG_prod", id: "hh_mangarpg", baseImgPath: "https://mh.hh-content.com" }
        }
    }
    static getTrolls() {
        return ['Latest',
            'Jeshtar',
            'EMPTY',
            'Troll Hound'];
    }

    static updateFeatures(envVariables: any) {
        envVariables.isEnabledPantheon = false;// to remove when Pantheon arrives in Manga RPG
        envVariables.isEnabledBossBangEvent = false;// to remove when event arrives in Manga RPG
        envVariables.isEnabledSultryMysteriesEvent = false;// to remove when event arrives in Manga RPG
    }
}