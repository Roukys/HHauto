//@ts-check
export class BDSMSimu {
    points: any[];
    win: number;
    loss: number;
    avgTurns: number;
    scoreClass: string;
    expectedValue: number = 0;

    constructor(points=[], win= Number.NaN, loss= Number.NaN, avgTurns= Number.NaN, scoreClass='minus'){
        this.points = points;
        this.win = win;
        this.loss = loss;
        this.avgTurns = avgTurns;
        this.scoreClass = scoreClass;
    }
}