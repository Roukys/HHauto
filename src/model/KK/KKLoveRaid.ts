export class KKLoveRaid {
  id_raid:any;
  id_girl:any;
  raid_module_pk:any;
  raid_module_type: any; //  "champion", "season", "troll"
  start_datetime:any;
  end_datetime:any;
  event_name:any;
  girl_data: {
    Graded: any;
    shards: any;
    id_girl: any;
    name: any;
    source: {
      anchor_source: {
        url: any;
        label: any;
        disabled: any;
      }
      sentence: any;
      anchor_win_from: {
        url: any;
        label: any;
        disabled: any;
      }
    };
  };
  status: any; // upcoming, ongoing
  seconds_until_event_start: any;
  seconds_until_event_end: any;
  event_duration_seconds: any;
  all_is_owned: any;
  tranche_data: {
    shards_left: any;
  };
}