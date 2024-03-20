import { BDSMSimu } from './BDSMSimu';

export class SeasonOpponent {
    opponent_id: any;
    nickname: string;
    mojo: number;
    exp: number;
    aff: number;
    simu: BDSMSimu = {} as BDSMSimu;

    constructor(opponent_id: any, nickname: string, mojo: number, exp: number, aff: number, simu:BDSMSimu){
        this.opponent_id = opponent_id;
        this.nickname = nickname;
        this.mojo = mojo;
        this.exp = exp;
        this.aff = aff;
        this.simu = simu;
    }
}