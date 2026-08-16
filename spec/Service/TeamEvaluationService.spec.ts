// Tests for the effective-power ranking.
//
// The reference numbers in "live measurements" are real values pulled from
// the game on 2026-08-16 (account level 663, Know-how): the stats
// `action=team_calculate_caracs` returned for the stat-sum pick and for the
// same team with one girl swapped for a third darkness girl. Scored with
// HHauto's own battle simulator over 101 real league opponents, the second
// team won 90.94% of fights against 90.39% -- while having 4,687 LESS total
// power. These fixtures pin that the ranking metric reproduces that order.

import { TeamEvaluationService } from '../../src/Service/TeamEvaluationService';
import { ElementType } from '../../src/Service/TeamScoringService';
import { MockHelper } from '../testHelpers/MockHelpers';

// Live harem shares of this account (fully built harem).
const HAREM: Record<ElementType, number> = {
    darkness: 0.07, light: 0.07, psychic: 0.07, stone: 0.07, sun: 0.07,
    fire: 0.35, nature: 0.10, water: 0.10,
};

// Live measurement: caracs_sum winner, 2x stone / 2x darkness / nature / fire / psychic.
const STAT_SUM_PICK = {
    caracs: { ego: 1275333, damage: 237327.434, defense: 70654, chance: 105848 },
    elements: ['stone', 'stone', 'darkness', 'darkness', 'nature', 'fire', 'psychic'] as ElementType[],
    totalPower: 282487.8,
};
// Live measurement: same team, one stone girl replaced by a third darkness girl.
const THEME_PICK = {
    caracs: { ego: 1258378, damage: 248785, defense: 69961, chance: 105848 },
    elements: ['stone', 'darkness', 'darkness', 'darkness', 'nature', 'fire', 'psychic'] as ElementType[],
    totalPower: 277801,
};

function effective(team: typeof STAT_SUM_PICK) {
    return TeamEvaluationService.computeEffectivePower(
        team.caracs,
        TeamEvaluationService.countElements(team.elements),
        HAREM,
    );
}

afterEach(() => {
    delete (unsafeWindow as any).synergies;
    delete (unsafeWindow as any).battle_type;
    if (unsafeWindow.shared?.general) delete (unsafeWindow.shared.general as any).hh_ajax;
});

describe('TeamEvaluationService -- synergy shares', () => {

    it('adds the team share per girl on top of the harem share', () => {
        const counts = TeamEvaluationService.countElements(['darkness', 'darkness'] as ElementType[]);
        expect(TeamEvaluationService.getSynergy(counts, 'darkness', HAREM)).toBeCloseTo(0.07 + 0.04, 10);
    });

    it('caps the team share at seven girls', () => {
        const counts = TeamEvaluationService.countElements(
            new Array(7).fill('fire') as ElementType[],
        );
        expect(TeamEvaluationService.getSynergy(counts, 'fire', HAREM)).toBeCloseTo(0.35 + 0.70, 10);
    });

    it('returns the pure harem share for an element that is not in the team', () => {
        const counts = TeamEvaluationService.countElements(['water'] as ElementType[]);
        expect(TeamEvaluationService.getSynergy(counts, 'nature', HAREM)).toBeCloseTo(0.10, 10);
    });

    it('reads the harem shares from the game payload when present', () => {
        (unsafeWindow as any).synergies = [
            { element: { type: 'darkness' }, harem_bonus_multiplier: 0.03 },
            { element: { type: 'fire' }, harem_bonus_multiplier: 0.21 },
        ];
        const harem = TeamEvaluationService.getHaremSynergies();
        expect(harem.darkness).toBe(0.03);
        expect(harem.fire).toBe(0.21);
        // Untouched elements keep the built-harem fallback.
        expect(harem.nature).toBe(0.10);
    });
});

describe('TeamEvaluationService -- effective power (live measurements)', () => {

    it('ranks the third darkness girl above the higher stat sum', () => {
        expect(THEME_PICK.totalPower).toBeLessThan(STAT_SUM_PICK.totalPower);
        expect(effective(THEME_PICK)).toBeGreaterThan(effective(STAT_SUM_PICK));
    });

    it('keeps the gap small enough to stay plausible (< 5%)', () => {
        const gain = effective(THEME_PICK) / effective(STAT_SUM_PICK) - 1;
        expect(gain).toBeGreaterThan(0);
        expect(gain).toBeLessThan(0.05);
    });

    it('values fire girls through the crit-damage track only', () => {
        const base = { ego: 1000000, damage: 200000, defense: 60000, chance: 100000 };
        // Psychic only moves harmony, which the metric does not use, so it
        // isolates the fire track.
        const noFire = TeamEvaluationService.computeEffectivePower(
            base, TeamEvaluationService.countElements(['psychic', 'psychic', 'psychic'] as ElementType[]), HAREM);
        const withFire = TeamEvaluationService.computeEffectivePower(
            base, TeamEvaluationService.countElements(['fire', 'fire', 'fire'] as ElementType[]), HAREM);
        // Same stats, more crit damage -> higher expected hit, but nowhere
        // near the full +30% the raw synergy number suggests.
        expect(withFire).toBeGreaterThan(noFire);
        expect(withFire / noFire).toBeLessThan(1.3);
    });

    it('is zero when the game returned no stats', () => {
        expect(TeamEvaluationService.computeEffectivePower(
            { ego: 0, damage: 0, defense: 0, chance: 0 }, {}, HAREM)).toBe(0);
    });
});

describe('TeamEvaluationService -- battle type', () => {

    it('prefers the page global', () => {
        (unsafeWindow as any).battle_type = 'labyrinth';
        expect(TeamEvaluationService.getBattleType()).toBe('labyrinth');
    });

    it('falls back to leagues', () => {
        expect(TeamEvaluationService.getBattleType()).toBe('leagues');
    });
});

describe('TeamEvaluationService -- ranking candidates', () => {

    interface Candidate { name: string; ids: number[]; elements: ElementType[] }

    const statSum: Candidate = { name: 'statSum', ids: [1, 2, 3, 4, 5, 6, 7], elements: STAT_SUM_PICK.elements };
    const theme: Candidate = { name: 'theme', ids: [1, 2, 3, 4, 5, 6, 8], elements: THEME_PICK.elements };

    function mockPerTeam(byLastId: Record<number, any>) {
        if (!unsafeWindow.shared) (unsafeWindow as any).shared = {};
        if (!unsafeWindow.shared!.general) (unsafeWindow.shared as any).general = {};
        (unsafeWindow.shared!.general as any).hh_ajax = (params: any, cb: (data: any) => void) => {
            const last = Number(params.girls[params.girls.length - 1]);
            cb(byLastId[last]);
        };
    }

    it('returns an empty list without hh_ajax so the caller keeps its own order', async () => {
        const ranked = await TeamEvaluationService.rankCandidates(
            [statSum, theme], c => c.ids, c => c.elements);
        expect(ranked).toEqual([]);
    });

    it('puts the measured strongest team first', async () => {
        mockPerTeam({
            7: { success: true, caracs: STAT_SUM_PICK.caracs, total_power: STAT_SUM_PICK.totalPower },
            8: { success: true, caracs: THEME_PICK.caracs, total_power: THEME_PICK.totalPower },
        });
        const ranked = await TeamEvaluationService.rankCandidates(
            [statSum, theme], c => c.ids, c => c.elements);
        expect(ranked).toHaveLength(2);
        expect(ranked[0].candidate.name).toBe('theme');
        expect(ranked[0].totalPower).toBe(THEME_PICK.totalPower);
        expect(ranked[0].effectivePower).toBeGreaterThan(ranked[1].effectivePower);
    });

    it('bails out when one candidate cannot be calculated', async () => {
        mockPerTeam({
            7: { success: true, caracs: STAT_SUM_PICK.caracs, total_power: STAT_SUM_PICK.totalPower },
            8: { success: false },
        });
        const ranked = await TeamEvaluationService.rankCandidates(
            [statSum, theme], c => c.ids, c => c.elements);
        expect(ranked).toEqual([]);
    });

    it('bails out when the call throws', async () => {
        MockHelper.mockAjaxError(new Error('network down'));
        const ranked = await TeamEvaluationService.rankCandidates(
            [statSum], c => c.ids, c => c.elements);
        expect(ranked).toEqual([]);
    });

    it('sends the girl ids as strings, like the game does', async () => {
        const seen: any[] = [];
        if (!unsafeWindow.shared!.general) (unsafeWindow.shared as any).general = {};
        (unsafeWindow.shared!.general as any).hh_ajax = (params: any, cb: (data: any) => void) => {
            seen.push(params);
            cb({ success: true, caracs: STAT_SUM_PICK.caracs, total_power: STAT_SUM_PICK.totalPower });
        };
        await TeamEvaluationService.rankCandidates([statSum], c => c.ids, c => c.elements);
        expect(seen).toHaveLength(1);
        expect(seen[0].action).toBe('team_calculate_caracs');
        expect(seen[0].battle_type).toBe('leagues');
        expect(seen[0].girls).toEqual(['1', '2', '3', '4', '5', '6', '7']);
    });
});
