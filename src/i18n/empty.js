export const HHAuto_ToolTips = {en:{}, fr:{}, es:{}, de:{}, it:{}};

const w = (typeof unsafeWindow == 'undefined') ?  window : unsafeWindow;

export var hhTimerLocale = w.Phoenix ? w.Phoenix.language : null;
export var timerDefinitions;
if (w.Phoenix && (hhTimerLocale !== undefined || hhTimerLocale !== null || hhTimerLocale.length > 0)) {
    timerDefinitions = {
    [hhTimerLocale]: {
        days: w.Phoenix.__.DateTime.time_short_days,
        hours: w.Phoenix.__.DateTime.time_short_hours,
        minutes: w.Phoenix.__.DateTime.time_short_min,
        seconds: w.Phoenix.__.DateTime.time_short_sec
        }
    }
} else {
    hhTimerLocale = 'en';
    timerDefinitions = {'en':{days: "d", hours: "h", minutes: "m", seconds: "s"}};
}
