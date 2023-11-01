
export class ChampionModel {
    index;
    timer=-1;
    started=false;
    impression;
    inFilter = false;

    constructor(index, impression, inFilter) {
        this.index = index;
        this.impression = impression;
        this.inFilter = inFilter;
        this.started = impression!="0";
        if (this.started) {
            this.timer = 0;
        }
    }
}