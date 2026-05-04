// TeamBuilderService.ts -- Builds optimal 7-girl teams.
//
// Simple logic:
//   1. Score all girls (base stats * blessing multiplier - equipment)
//   2. Take top 7 by score
//   3. Tiebreaker: prefer element clusters (Tier-3 bonus)
//   4. Leader: highest-score Mythic girl

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
    effectivePower: number;        // team total power
    alternatives: Array<{ traitCategory: string; traitValue: string; effectivePower: number }>;
}

export type ScoringMode = 1 | 2;  // 1 = Current Best, 2 = Best Possible

const TEAM_SIZE = 7;
const SAME_STAT_THRESHOLD = 100; // Girls within 100 points are considered equal

export class TeamBuilderService {

    /**
     * Build the optimal team: simply the 7 strongest girls.
     * At equal stats, prefer element clusters for Tier-3 bonus.
     */
    static buildTeam(
        allGirls: GirlData[],
        mode: ScoringMode,
        playerLevel: number
    ): TeamResult | null {
        // Phase 1: Filter to Mythic + Legendary only
        const candidates = TeamScoringService.filterHighRarity(allGirls);
        if (candidates.length < TEAM_SIZE) return null;

        // Phase 2: Score all candidates (stats * blessing multiplier - equipment)
        const scoreMap = new Map<number, number>();
        for (const girl of candidates) {
            const score = mode === 1
                ? TeamScoringService.scoreCurrentBest(girl)
                : TeamScoringService.scoreBestPossible(girl, playerLevel);
            scoreMap.set(girl.id_girl, score);
        }

        // Sort by score descending
        const sorted = [...candidates].sort(
            (a, b) => (scoreMap.get(b.id_girl) || 0) - (scoreMap.get(a.id_girl) || 0)
        );

        // Log top girls
        if (sorted.length >= 10) {
            logHHAuto('TeamBuilder: top 10 by score: ' + sorted.slice(0, 10).map(g =>
                g.name + '(' + Math.round(scoreMap.get(g.id_girl) || 0) + ',' + g.element + ',bls=' + TeamScoringService.getBlessingMultiplier(g).toFixed(2) + ')'
            ).join(', '));
        }

        // Phase 3: Select top 7 with element-cluster tiebreaker
        const team = TeamBuilderService._selectWithCluster(sorted, scoreMap);
        if (team.length < TEAM_SIZE) return null;

        // Phase 4: Choose leader (highest-score Mythic in team)
        const leaderIdx = TeamBuilderService._pickLeader(team, scoreMap);
        if (leaderIdx > 0) {
            // Move leader to position 0
            const leader = team.splice(leaderIdx, 1)[0];
            team.unshift(leader);
        }

        // Phase 5: Build result
        const teamElements: ElementType[] = team.map(g => g.element);
        const statScores = team.map(g => scoreMap.get(g.id_girl) || 0);
        const power = Math.round(statScores.reduce((s, v) => s + v, 0));
        const synergyValue = TeamScoringService.calculateSynergyValue(teamElements);
        const leaderTier5 = TeamScoringService.getTier5Skill(team[0].element);
        const tier3Bonus = TeamScoringService.calculateTier3TeamBonus(team);

        // Detect blessed info for display
        const cachedBlessing = BlessingService.getCached();
        const blessedTraits = cachedBlessing?.blessedTraits || [];
        const blessedGirlCount = candidates.filter(g =>
            g.blessingBonuses?.pvp_v3?.carac1?.length > 0
        ).length;

        // Find dominant trait in team for display
        const { traitCategory, traitValue, traitMatchCount } = TeamBuilderService._findDominantTrait(team);

        logHHAuto('TeamBuilder: team power = ' + power + ', leader = ' + team[0].name +
            ' (' + team[0].element + '), elements: ' + teamElements.join(',') +
            ', tier3 = ' + (tier3Bonus * 100).toFixed(1) + '%');
        logHHAuto('TeamBuilder: team: ' + team.map(g => g.name + '(' + Math.round(scoreMap.get(g.id_girl) || 0) + ',' + g.element + ')').join(', '));

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
            blessedCategories: blessedTraits,
            blessedGirlCount,
            effectivePower: power,
            alternatives: [],
        };
    }

    /**
     * Select top 7 girls with element-cluster optimization at equal stats.
     * Girls with clearly higher stats always win. Among equal-stat girls,
     * prefer those that form the largest element cluster.
     */
    private static _selectWithCluster(sorted: GirlData[], scoreMap: Map<number, number>): GirlData[] {
        if (sorted.length <= TEAM_SIZE) return sorted.slice(0, TEAM_SIZE);

        const topScore = scoreMap.get(sorted[0].id_girl) || 0;
        const team: GirlData[] = [];

        // Separate into tiers: girls clearly above others go in first
        let i = 0;
        while (i < sorted.length && team.length < TEAM_SIZE) {
            // Find the end of this stat tier (all girls within SAME_STAT_THRESHOLD)
            const tierScore = scoreMap.get(sorted[i].id_girl) || 0;
            let tierEnd = i;
            while (tierEnd < sorted.length &&
                   Math.abs((scoreMap.get(sorted[tierEnd].id_girl) || 0) - tierScore) < SAME_STAT_THRESHOLD) {
                tierEnd++;
            }

            const tierGirls = sorted.slice(i, tierEnd);
            const slotsLeft = TEAM_SIZE - team.length;

            if (tierGirls.length <= slotsLeft) {
                // All girls in this tier fit, take them all
                team.push(...tierGirls);
            } else {
                // More girls than slots: pick by element cluster
                const picked = TeamBuilderService._pickByCluster(tierGirls, slotsLeft, team);
                team.push(...picked);
            }
            i = tierEnd;
        }

        return team;
    }

    /**
     * From a group of equal-stat girls, pick the ones that maximize element clusters.
     * Consider already-selected team members for cluster building.
     */
    private static _pickByCluster(candidates: GirlData[], slots: number, currentTeam: GirlData[]): GirlData[] {
        // Count elements already in team
        const elementCounts = new Map<ElementType, number>();
        for (const g of currentTeam) {
            elementCounts.set(g.element, (elementCounts.get(g.element) || 0) + 1);
        }

        // Count elements available in candidates
        const candidateElements = new Map<ElementType, GirlData[]>();
        for (const g of candidates) {
            if (!candidateElements.has(g.element)) candidateElements.set(g.element, []);
            candidateElements.get(g.element)!.push(g);
        }

        // Score each candidate by how much they contribute to a cluster
        const scored = candidates.map(g => {
            const currentCount = elementCounts.get(g.element) || 0;
            // Prefer elements that already have members (builds cluster)
            // or elements with many candidates available (can build new cluster)
            const availableCount = candidateElements.get(g.element)?.length || 0;
            const clusterScore = currentCount * 10 + availableCount;
            // Mythic tiebreaker
            const rarityBonus = g.rarity === 'mythic' ? 1000 : 0;
            return { girl: g, score: clusterScore + rarityBonus };
        });

        // Sort by cluster score descending, pick top N
        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, slots).map(s => s.girl);
    }

    /**
     * Pick the leader: highest-score Mythic girl in the team.
     * Among equal Mythics, prefer the one in the largest element cluster.
     */
    private static _pickLeader(team: GirlData[], scoreMap: Map<number, number>): number {
        let bestIdx = 0;
        let bestScore = -1;
        const elementCounts = new Map<ElementType, number>();
        for (const g of team) {
            elementCounts.set(g.element, (elementCounts.get(g.element) || 0) + 1);
        }

        for (let i = 0; i < team.length; i++) {
            const g = team[i];
            if (g.rarity !== 'mythic') continue;
            const score = scoreMap.get(g.id_girl) || 0;
            const clusterSize = elementCounts.get(g.element) || 0;
            // Compare: higher stats win, then larger cluster
            const composite = score * 1000 + clusterSize;
            if (composite > bestScore) {
                bestScore = composite;
                bestIdx = i;
            }
        }
        return bestIdx;
    }

    /**
     * Find the dominant trait in the team for display purposes.
     */
    private static _findDominantTrait(team: GirlData[]): { traitCategory: TraitCategory; traitValue: string; traitMatchCount: number } {
        // Count element occurrences to find dominant element pair
        const elementCounts = new Map<ElementType, number>();
        for (const g of team) {
            elementCounts.set(g.element, (elementCounts.get(g.element) || 0) + 1);
        }

        // Find most common element
        let bestElement: ElementType = team[0].element;
        let bestCount = 0;
        for (const [el, count] of elementCounts) {
            if (count > bestCount) { bestCount = count; bestElement = el; }
        }

        const traitCategory = TeamScoringService.getTraitCategory(bestElement);
        // Find most common trait value among team members of that category
        const traitValues = new Map<string, number>();
        for (const g of team) {
            if (TeamScoringService.getTraitCategory(g.element) === traitCategory) {
                const val = TeamScoringService.getTraitValue(g);
                if (val) traitValues.set(val, (traitValues.get(val) || 0) + 1);
            }
        }

        let traitValue = '';
        let traitMatchCount = 0;
        for (const [val, count] of traitValues) {
            if (count > traitMatchCount) { traitMatchCount = count; traitValue = val; }
        }

        return { traitCategory, traitValue, traitMatchCount };
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
