export class TransPornstarHarem  {
    static getEnv() {
        return {
            "www.transpornstarharem.com": { name: "TPH_prod", id: "hh_startrans", baseImgPath: "https://images.hh-content.com/startrans" },
            "nutaku.transpornstarharem.com": { name: "NTPH_prod", id: "hh_startrans", baseImgPath: "https://images.hh-content.com/startrans" }
        }
    }
    static getTrolls() {
        return ['Latest',
            'Ariel Demure',
            'Emma Rose',
            'Natalie Stone',
            'Janie Blade',
            'Nikki Nort',
            'Mistress Venom',
            'CEO Ramona',
            'Mama Bee'];
    }
    static getTrollGirlsId() {
        return [
            [['171883542', '229180984', '771348244'], [0], [0]],
            [['484962893', '879574564', '910924260'], [0], [0]],
            [['334144727', '667194919', '911144911'], [0], [0]],
            [['473470854', '708191289', '945710078'], [0], [0]],
            [['104549634', '521022556', '526732951'], [0], [0]],
            [['317800067', '542090972', '920682672'], [0], [0]],
            [['558585439', '577205682', '741311311'], [0], [0]],
            [['692804877', '984917842', '581358076'], ['397703278', '704166982', '483645616'], ['349968569', '970429531', '954328841']],
        ];
    }

    static updateFeatures(envVariables: any) {
        envVariables.isEnabledPantheon = false;// to remove when Pantheon arrives in transpornstar
        envVariables.isEnabledPoG = false;// to remove when PoG arrives in transpornstar
        envVariables.isEnabledSpreadsheets = false;
    }
}