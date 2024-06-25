export class HentaiHeroes {
    static getEnv() {
        return {
            "www.hentaiheroes.com": { name: "HH_prod", id: "hh_hentai" },
            "test.hentaiheroes.com": { name: "HH_test", id: "hh_hentai" },
            "nutaku.haremheroes.com": { name: "NHH_prod", id: "hh_hentai" },
            "thrix.hentaiheroes.com": { name: "THH_prod", id: "hh_hentai" },
            "eroges.hentaiheroes.com": { name: "EHH_prod", id: "hh_hentai" },
            "esprit.hentaiheroes.com": { name: "OGHH_prod", id: "hh_hentai" }
        }
    }
    static getTrolls(languageCode: string) {
        switch (languageCode) {
            case "fr":
                return ["Dernier",
                    "Dark Lord",
                    "Espion Ninja",
                    "Gruntt",
                    "Edwarda",
                    "Donatien",
                    "Silvanus",
                    "Bremen",
                    "Finalmecia",
                    "Roko Senseï",
                    "Karole",
                    "Jackson",
                    "Pandora",
                    "Nike",
                    "Sake",
                    "Police des Lapines-Garous",
                    "Auga",
                    "Gross",
                    "Harriet"];
            default:
                return ["Latest",
                    "Dark Lord",
                    "Ninja Spy",
                    "Gruntt",
                    "Edwarda",
                    "Donatien",
                    "Silvanus",
                    "Bremen",
                    "Finalmecia",
                    "Roko Senseï",
                    "Karole",
                    "Jackson\'s Crew",
                    "Pandora witch",
                    "Nike",
                    "Sake",
                    "WereBunny Police",
                    "Auga",
                    "Gross",
                    "Harriet"];
        }
    }

    static getTrollGirlsId() {
        return [
            [['8', '9', '10'], ['7270263'], ['979916751']],
            [['14', '13', '12'], ['318292466'], ['936580004']],
            [['19', '16', '18'], ['610468472'], ['54950499']],
            [['29', '28', '26'], ['4749652'], ['345655744']],
            [['39', '40', '41'], ['267784162'], ['763020698']],
            [['64', '63', '31'], ['406004250'], ['864899873']],
            [['85', '86', '84'], ['267120960'], ['536361248']],
            [['114', '115', '116'], ['379441499'], ['447396000']],
            [['1247315', '4649579', '7968301'], ['46227677'], ['933487713']],
            [['1379661', '4479579', '1800186'], ['985085118'], ['339765042']],
            [['24316446', '219651566', '501847856'], ['383709663'], ['90685795']],
            [['225365882', '478693885', '231765083'], ['155415482'], ['769649470']],
            [['86962133', '243793871', '284483399'], [0], [0]],
            [['612527302', '167231135', '560979916', '184523411', '549524850', '784911160'], [0], [0]],
            [['164866290', '696124016', '841591253'], [0], [0]],
            [['344730128', '735302216', '851893423'], [0], [0]],
            [['547099506', '572827174', '653889168'], [0], [0]],
        ];
    }
}