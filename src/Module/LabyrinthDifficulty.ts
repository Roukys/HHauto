// Labyrinth difficulty option values shared between the menu (difficulty
// select) and LabyrinthAuto. Kept in a dependency-free leaf module so the
// menu does not have to import LabyrinthAuto (and its transitive module
// graph) for three constants (ARCH-001).
export const LABY_DIFFICULTY = {
    EASY: "0",
    NORMAL: "1",
    HARD: "2",
} as const;
