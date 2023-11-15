//@ts-check
export class BDSMSimu {
    points;
    win;
    loss;
    avgTurns;
    scoreClass;
    expectedValue = 0;

    /**
     * 
     * @param {any[]} points 
     * @param {number} win 
     * @param {number} loss 
     * @param {number} avgTurns 
     * @param {string} scoreClass 
     */
    constructor(points=[], win= Number.NaN, loss= Number.NaN, avgTurns= Number.NaN, scoreClass='minus'){
        this.points = points;
        this.win = win;
        this.loss = loss;
        this.avgTurns = avgTurns;
        this.scoreClass = scoreClass;
    }
}