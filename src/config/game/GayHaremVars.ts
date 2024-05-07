export class GayHarem {
    static getEnv() {
        return {
            "www.gayharem.com": { name: "GH_prod", id: "hh_gay" },
            "nutaku.gayharem.com": { name: "NGH_prod", id: "hh_gay" },
            "eroges.gayharem.com": { name: "EGH_prod", id: "hh_gay" }
        }
    }

    static getTrolls() {
        return ['Latest',
            'Dark Lord',
            'Ninja Spy',
            'Gruntt',
            'Edward',
            'Donatien',
            'Silvanus',
            'Bremen',
            'Edernas',
            'Fredy Sih Roko Senseï',
            'Maro',
            'Jackson&#8217;s Crew',
            'Icarus Warlock',
            'Sol'];
    }

    static overrideTrollsByLang(languageCode:string, trollzList: any[])
    {
        switch (languageCode) {
            case "fr":
                trollzList[2] = 'Espion Ninja';
                trollzList[11] = 'Éq. de Jackson';
                trollzList[12] = 'Sorcier Icarus';
                break;
            case "de":
                trollzList[1] = 'Dunkler Lor';
                trollzList[2] = 'Ninjaspion';
                trollzList[11] = 'Jacksons Crew';
                break;
            default:
                break;
        }
    }
}