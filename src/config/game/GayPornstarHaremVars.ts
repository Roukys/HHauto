export class GayPornstarHarem {
    static getEnv() {
        return {
            "www.gaypornstarharem.com": { name: "GPSH_prod", id: "hh_stargay", baseImgPath: "https://images.hh-content.com/stargay" },
            "nutaku.gaypornstarharem.com": { name: "NGPSH_prod", id: "hh_stargay", baseImgPath: "https://images.hh-content.com/stargay" }
        }
    }

    static getTrolls() {
        return ['Latest',
            'Tristan Hunter',
            'Jimmy Durano',
            'Lucca Mazzi'];
    }

    static getTrollGirlsId() {
        return [
            [['780402171', '374763633', '485499759'], [0], [0]],
            [[0], [0], [0]],
            [[0], [0], [0]],
            [[0], [0], [0]],
            [['290465722', '524315573', '970767946'], [0], [0]],
            [['127881092', '680366759', '836998610'], [0], [0]],
        ];
    }

    static updateFeatures(envVariables: any) {
        envVariables.isEnabledSideQuest = false;// to remove when SideQuest arrives in gaypornstar
        envVariables.isEnabledClubChamp = false;// to remove when Club Champs arrives in gaypornstar
        envVariables.isEnabledPantheon = false;// to remove when Pantheon arrives in gaypornstar
        envVariables.isEnabledPoG = false;// to remove when PoG arrives in gaypornstar
    }
}