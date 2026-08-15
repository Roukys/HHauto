// SultryMysteries.pure.ts -- Pure remaining-time resolution for the Sultry
// Mysteries event.
//
// Extracted from SultryMysteries.parse so the "where does the event's
// remaining time come from" decision can be unit-tested without DOM
// access or game globals.
//
// On /event.html the grid tab is shown by default, and the countdown
// selector ('#contains_all #events .nc-panel .timer span[rel="expires"]')
// only matches an element after the user switches to the shop tab. Read
// before that switch, it yields an empty string/null -- and computing
// seconds_before_end from that made the event look already expired.
//
// The game exposes the same remaining time on
// window.sm_event_data.seconds_until_event_end (a numeric string)
// regardless of which tab is active, so that is tried first. The DOM
// value is kept as a fallback for older/other game variants, and a
// caller-supplied default covers the case where neither source is
// available -- resolveSultryMysteriesSecondsLeft never returns a value
// derived from an empty/missing reading.

export function resolveSultryMysteriesSecondsLeft(
    hhVarSecondsUntilEnd: unknown,
    domSecondsLeft: number | null,
    defaultSeconds: number,
): number {
    const parsedHHVar = Number(hhVarSecondsUntilEnd);
    if (hhVarSecondsUntilEnd !== null && hhVarSecondsUntilEnd !== undefined && Number.isFinite(parsedHHVar) && parsedHHVar >= 0) {
        return parsedHHVar;
    }
    if (domSecondsLeft !== null && Number.isFinite(domSecondsLeft) && domSecondsLeft >= 0) {
        return domSecondsLeft;
    }
    return defaultSeconds;
}
