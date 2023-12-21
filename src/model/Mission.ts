export class Mission {
    rewards:MissionRewards[];
    finished:boolean = false;
    remaining_time:number;
    remaining_cost:any;
    missionObject:HTMLElement;
}

export class MissionRewards {
    classList:DOMTokenList;
    type:string = '';
    data:any;
}