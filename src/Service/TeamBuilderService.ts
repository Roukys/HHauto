// TeamBuilderService.ts -- Builds optimal 7-girl teams using Tier 3
// trait-group optimization.
//
// Two modes (both filter Mythic + Legendary only):
//   Mode 1 "Current Best": current blessed stats
//   Mode 2 "Best Possible": projected stats at max level + grades
//
// Algorithm:
//   1. Filter to M+L, score all girls
//   2. Find best trait group (element pair + shared trait value)
//   3. Select Mythic leader (Shield/Stun priority)
//   4. Fill slots 2-7 from trait group, then by stats

import { BlessingService } from './BlessingService';
import { logHHAuto } from '../Utils/index';
import {
    TeamScoringService,
    GirlData,
    ElementType,
    TraitCategory,
    TraitGroupResult,
} from './TeamScoringService';

export interface TeamResult {
    girls: GirlData[];          // 7 girls, index 0 = leader
    statScores: number[];       // individual stat scores
    synergyValue: number;       // total team synergy value
    leaderTier5: { id: number; name: string; priority: number };
    elements: ElementType[];    // team element composition
    traitCategory: TraitCategory;   // which trait was optimized
    traitValue: string;             // the matching trait value
    tier3Bonus: number;             // total Tier 3 bonus %
    traitMatchCount: number;        // how many girls match the trait
    blessedCategories: string[];   // currently blessed trait categories
    blessedGirlCount: number;      // how many girls have active blessings
    effectivePower: number;        // team stat sum * (1 + tier3Bonus)
    alternatives: Array<{ traitCategory: string; traitValue: string; effectivePower: number }>;
}

export type ScoringMode = 1 | 2;  // 1 = Current Best, 2 = Best Possible

const TEAM_SIZE = 7;
const CANDIDATE_POOL_SIZE = 500;

// Map trait category to its element pair for quick lookup
const ELEMENT_PAIRS_MAP: Record<string, ElementType[]> = {
    'eyeColor': ['darkness', 'fire'],
    'hairColor': ['light', 'nature'],
    'zodiac': ['stone', 'psychic'],
    'position': ['water', 'sun'],
};

// Default fallback trait when no good group is found
const FALLBACK_TRAIT_CATEGORY: TraitCategory = 'eyeColor';

export class TeamBuilderService {

    /**
     * Build the optimal team for the given mode.
     *
     * @param allGirls    - All available girls (from availableGirls)
     * @param mode        - 1 = Current Best, 2 = Best Possible
     * @param playerLevel - Player's current level (needed for mode 2)
     * @returns TeamResult with the selected 7 girls, or null if not enough girls
     */
    static buildTeam(
        allGirls: GirlData[],
        mode: ScoringMode,
        playerLevel: number
    ): TeamResult | null {
        // Phase 1: Filter to Mythic + Legendary only (both modes)
        const candidates = TeamScoringService.filterHighRarity(allGirls);

        if (candidates.length < TEAM_SIZE) {
            return null;
        }

        // Phase 2: Score all candidates
        const scoreMap = new Map<number, number>();
        for (const girl of candidates) {
            const score = mode === 1
                ? TeamScoringService.scoreCurrentBest(girl)
                : TeamScoringService.scoreBestPossible(girl, playerLevel);
            scoreMap.set(girl.id_girl, score);
        }

        // Pre-sort by score for pool selection
        const sorted = [...candidates].sort(
            (a, b) => (scoreMap.get(b.id_girl) || 0) - (scoreMap.get(a.id_girl) || 0)
        );
        const pool = sorted.slice(0, CANDIDATE_POOL_SIZE);

        const maxStat = scoreMap.get(pool[0].id_girl) || 1;

        // Phase 2b: Detect active blessings from BlessingService cache (reliable)
        // detectBlessedTraits() cannot work because blessingBonuses keys are 'pvp_v3', not trait names
        const cachedBlessingForTraits = BlessingService.getCached();
        let blessedCategories: Set<string>;
        let blessedGirlCount: number;
        if (cachedBlessingForTraits && cachedBlessingForTraits.blessedTraits && cachedBlessingForTraits.blessedTraits.length > 0) {
            blessedCategories = new Set(cachedBlessingForTraits.blessedTraits);
            // Count girls with any pvp_v3 bonus as blessed
            blessedGirlCount = candidates.filter(g => g.blessingBonuses?.pvp_v3?.carac1?.length > 0).length;
            logHHAuto('TeamBuilder: blessedCategories from cache = ' + JSON.stringify(Array.from(blessedCategories)) + ', blessedGirlCount = ' + blessedGirlCount);
        } else {
            // Fallback to detection (may not work but better than nothing)
            const detected = TeamScoringService.detectBlessedTraits(candidates);
            blessedCategories = detected.blessedCategories;
            blessedGirlCount = detected.blessedGirlCount;
            logHHAuto('TeamBuilder: blessedCategories from detection (fallback) = ' + JSON.stringify(Array.from(blessedCategories)));
        }

        // Phase 3: Build team based on blessing (simple logic)
        // The blessing determines which trait group to use. Period.
        // No multi-group evaluation needed - blessed girls have +25-40% stats.
        const cachedBlessing = BlessingService.getCached();
        const blessedNames: Record<string, string> = cachedBlessing?.blessedValues || {};
        const blessedValues: Record<string, string> = {};
        for (const [category, name] of Object.entries(blessedNames)) {
            const percent = cachedBlessing?.raw ? BlessingService.parseBlessingPercent(cachedBlessing.raw, category) : undefined;
            const hex = BlessingService.resolveHexForBlessing(
                candidates.map(g => ({ eye_color1: g.eyeColor, hair_color1: g.hairColor, position_img: g.position ? g.position + '.png' : undefined, blessing_bonuses: g.blessingBonuses })),
                category,
                percent
            );
            if (hex) {
                blessedValues[category] = category === 'position' ? hex.replace('.png', '') : hex;
            }
        }
        logHHAuto('TeamBuilder: blessedCategories = ' + JSON.stringify(Array.from(blessedCategories)));
        logHHAuto('TeamBuilder: blessedValues resolved = ' + JSON.stringify(blessedValues));
        if (sorted.length >= 5) {
            logHHAuto('TeamBuilder: top 5 by score: ' + sorted.slice(0, 5).map(g => g.name + '(' + Math.round(scoreMap.get(g.id_girl) || 0) + ', bls=' + (TeamScoringService.getBlessingMultiplier(g).toFixed(2)) + ')').join(', '));
        }

        // Determine which trait group to use: ALWAYS prefer the blessed group
        let chosenCategory: TraitCategory | null = null;
        let chosenValue: string | null = null;

        // Pick the first blessed category that has a resolved hex value
        for (const cat of Array.from(blessedCategories)) {
            const val = blessedValues[cat];
            if (val) {
                chosenCategory = cat as TraitCategory;
                chosenValue = val;
                logHHAuto('TeamBuilder: using blessed group: ' + cat + ' = ' + val);
                break;
            }
        }

        // Fallback: if no blessing resolved, use highest-stat group
        if (!chosenCategory || !chosenValue) {
            logHHAuto('TeamBuilder: no blessing resolved, falling back to stat-based group selection');
            const traitGroups = TeamScoringService.findTraitGroups(pool, blessedCategories as Set<TraitCategory>, blessedValues);
            if (traitGroups.length > 0) {
                chosenCategory = traitGroups[0].traitCategory;
                chosenValue = traitGroups[0].traitValue;
            } else {
                chosenCategory = 'eyeColor';
                chosenValue = pool[0]?.eyeColor || '';
            }
        }

        // Build the team for the chosen (blessed) group
        const builtTeam = TeamBuilderService._buildTeamForGroup(chosenCategory, chosenValue, pool, scoreMap);
        if (!builtTeam || builtTeam.length < TEAM_SIZE) return null;

        const statSum = builtTeam.reduce((s, g) => s + (scoreMap.get(g.id_girl) || 0), 0);
        const power = Math.round(statSum);

        const bestBuilt = { team: builtTeam, cat: chosenCategory, val: chosenValue, power };
        const alternatives: Array<{ traitCategory: string; traitValue: string; effectivePower: number }> = [];
        logHHAuto('TeamBuilder: chosen team power = ' + power + ' (' + chosenCategory + '=' + chosenValue + ')');

        const team = bestBuilt.team;
        const teamElements: ElementType[] = team.map(g => g.element);
        const leader = team[0];
        const traitCategory = bestBuilt.cat;
        const traitValue = bestBuilt.val;

        // Phase 6: Build result
        const statScores = team.map(g => scoreMap.get(g.id_girl) || 0);
        const synergyValue = TeamScoringService.calculateSynergyValue(teamElements);
        const leaderTier5 = TeamScoringService.getTier5Skill(leader.element);
        const tier3Bonus = TeamScoringService.calculateTier3TeamBonus(team);

        // Count how many girls match the chosen trait
        let traitMatchCount = 0;
        for (const girl of team) {
            const girlCategory = TeamScoringService.getTraitCategory(girl.element);
            if (girlCategory === traitCategory) {
                const girlValue = TeamScoringService.getTraitValue(girl);
                if (girlValue === traitValue) {
                    traitMatchCount++;
                }
            }
        }

        return {
            girls: team,
            statScores,
            synergyValue,
            leaderTier5,
            elements: teamElements,
            traitCategory,
            traitValue,
            tier3Bonus,
            traitMatchCount,
            blessedCategories: Array.from(blessedCategories),
            blessedGirlCount,
            effectivePower: bestBuilt.power,
            alternatives,
        };
    }

    /** Build a team for a specific trait group (blessing-aware). */
    private static _buildTeamForGroup(cat: TraitCategory, val: string, pool: GirlData[], scoreMap: Map<number, number>): GirlData[] | null {
        // For blessed teams: trait value is the PRIMARY filter, not element.
        // A girl with Position=Dolphin can be ANY element (fire, darkness, water, etc.)
        // So we pick girls that HAVE the blessed trait, sorted by stats.

        // Find all girls matching the blessed trait value (any element)
        const traitMatchers = pool.filter(g => {
            const gVal = TeamScoringService.getTraitValue(g);
            // getTraitValue uses the girl's OWN element to determine which trait to check.
            // But for blessing matching, we need to check the specific category directly.
            switch (cat) {
                case 'eyeColor': return g.eyeColor === val;
                case 'hairColor': return g.hairColor === val;
                case 'zodiac': return g.zodiac === val;
                case 'position': return g.position === val;
                default: return false;
            }
        }).sort((a, b) => (scoreMap.get(b.id_girl) || 0) - (scoreMap.get(a.id_girl) || 0));

        if (traitMatchers.length === 0) return null;

        // Leader: highest-stat mythic girl with the blessed trait
        const mythicMatchers = traitMatchers.filter(g => g.rarity === 'mythic');
        const leader = mythicMatchers.length > 0 ? mythicMatchers[0] : traitMatchers[0];

        const team: GirlData[] = [leader];
        const used = new Set<number>([leader.id_girl]);

        // Fill with trait-matching girls (they have the blessing bonus = highest stats)
        for (const g of traitMatchers) {
            if (team.length >= TEAM_SIZE) break;
            if (used.has(g.id_girl)) continue;
            team.push(g);
            used.add(g.id_girl);
        }

        // If still not full, fill with highest-stat girls from pool
        if (team.length < TEAM_SIZE) {
            const remaining = pool
                .filter(g => !used.has(g.id_girl))
                .sort((a, b) => (scoreMap.get(b.id_girl) || 0) - (scoreMap.get(a.id_girl) || 0));
            for (const g of remaining) {
                if (team.length >= TEAM_SIZE) break;
                team.push(g);
                used.add(g.id_girl);
            }
        }

        logHHAuto('TeamBuilder: _buildTeamForGroup(' + cat + '=' + val + '): ' + team.map(g => g.name + '(' + Math.round(scoreMap.get(g.id_girl) || 0) + ')').join(', '));
        return team.length >= TEAM_SIZE ? team : null;
    }

    /**
     * Get a summary of element distribution in the team.
     */
    static getElementDistribution(team: TeamResult): Array<{ element: ElementType; count: number }> {
        const counts = new Map<ElementType, number>();
        for (const el of team.elements) {
            counts.set(el, (counts.get(el) || 0) + 1);
        }
        return Array.from(counts.entries())
            .map(([element, count]) => ({ element, count }))
            .sort((a, b) => b.count - a.count);
    }
}
