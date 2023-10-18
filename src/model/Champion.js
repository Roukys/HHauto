
export class ChampionModel {
    index;
    timer=-1;
    started=false;
    impression;

    constructor(index, impression) {
        this.index = index;
        this.impression = impression;
        this.started = impression!="0";
        if (this.started) {
            this.timer = 0;
        }
    }
}