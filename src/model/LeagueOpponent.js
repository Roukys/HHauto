import { KKLeagueOpponent } from "./KK";

//@ts-check
export class LeagueOpponent {
    opponent_id;
    rank;
    nickname;
    level;
    power;
    player_league_points;
    simuPoints;
    stats= {}; // fill stats if needed
    nb_boosters = 0;
    kkOpponent = {};

    /**
     * 
     * @param {*} opponent_id 
     * @param {number} rank 
     * @param {string} nickname 
     * @param {number} level 
     * @param {number} power 
     * @param {number} player_league_points 
     * @param {number} simuPoints 
     * @param {number} nb_boosters 
     * @param {KKLeagueOpponent} kkOpponent 
     */
    constructor(opponent_id,rank,nickname,level,power,player_league_points,simuPoints,nb_boosters, kkOpponent){
        this.opponent_id = opponent_id;
        this.rank = rank;
        this.nickname = nickname;
        this.level = level;
        this.power = power;
        this.player_league_points = player_league_points;
        this.simuPoints = simuPoints;
        this.nb_boosters = nb_boosters;
        this.kkOpponent = kkOpponent;
    }
}