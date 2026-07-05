// League opponent-list sort mode values shared between the menu (sort-mode
// select) and LeagueHelper. Kept in a dependency-free leaf module so the
// menu does not have to import the League module (and its transitive module
// graph) for three constants (ARCH-001).
export const LEAGUE_SORT = {
    DISPLAYED: '0',
    POWER: '1',
    POWERCALC: '2',
} as const;
