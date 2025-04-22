export class ComixHarem {
    static spreadsheet = 'https://docs.google.com/spreadsheets/d/1kVZxcZZMa82lS4k-IpxTTTELAeaipjR_v1twlqW5vbI'; // zoopokemon
    static getEnv() {
        return {
            "www.comixharem.com": { name: "CH_prod", id: "hh_comix", baseImgPath: "https://ch.hh-content.com" },
            "nutaku.comixharem.com": {name:"NCH_prod",id:"hh_comix"}
        }
    }
    static getTrolls() {
        return ['Latest',
            'BodyHack',
            'Grey Golem',
            'The Nymph',
            'Athicus Ho’ole',
            'The Mimic',
            'Cockatrice',
            'Pomelo',
            'Alexa Sl\'Thor',
            'D\'KLONG',
            'Virtue Man',
            'Asmodea',
            'Blueball Gremlin'];
    }
    static getTrollGirlsId() {
        return [
            [['830009523', '907801218', '943323021'], [0], [0]],
            [['271746999', '303805209', '701946373'], [0], [0]],
            [['743748788', '977228200', '943323021'], [0], [0]],
            [['140401381', '232860230', '514994766'], [0], [0]],
            [['623293037', '764791769', '801271903'], [0], [0]],
            [['921365371', '942523553', '973271744'], [0], [0]],
            [['364639341', '879781833', '895546748'], [0], [0]],
            [['148877065', '218927643', '340369336'], [0], [0]],
            [['258185125', '897951171', '971686222'], [0], [0]],
            [['125758004', '233499841', '647307160'], [0], [0]],
            [['994555359', '705713849', '973778141'], [0], [0]],
        ];
    }
    static updateFeatures(envVariables: any) {
    }
}