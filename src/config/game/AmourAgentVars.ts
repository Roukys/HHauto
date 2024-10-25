export class AmourAgent {
    static getEnv() {
        return {
            "www.amouragent.com": { name: "AA_prod", id: "hh_amour"}
        }
    }
    static getTrolls() {
        return ['Latest',
            'Frank',
            'Adriana',
            'Tara'];
    }

    static updateFeatures(envVariables: any) {
        envVariables.isEnabledClubChamp = false;// to remove when Club Champs arrives in AmourAgent
        envVariables.isEnabledPantheon = false;// to remove when Pantheon arrives in AmourAgent
    }
}