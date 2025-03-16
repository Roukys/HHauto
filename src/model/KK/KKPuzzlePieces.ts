export class KKPuzzlePieces {
    id_piece: number;
    id_objective: number;
    reward: {
        loot: boolean;
        rewards: [
            {
                type: any,
                value: any
            }
        ]
        shards: any[]
    };
    reward_unlocked: boolean;
    reward_claimed: boolean;
    objective: {
        id_objective: number;
        identifier: any;
        name: any;
        anchors: any;
    };
    current_points: any;
    target_points: any;
}