export class KKDailyGoal {
    id_daily_goal: number;
    id_objective: string;
    objective_name: string;
    rarity: string;
    potions_reward: number;
    progress_data: { 
        current: number,
        max: number
    };
    anchor: string;
}