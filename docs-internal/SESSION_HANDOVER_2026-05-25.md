# Session-Handover -- HHAuto Refactor

**Datum letzter Stand:** 2026-05-25 (Ende Schritt 3.2 main-Squash)
**Aktueller Branch:** `main` (Version 7.35.56)
**Refactor-Branch:** `refactor/v7.36.0-staging` (synchron mit `main` nach Schritt-3.2-Reset)

## Was abgeschlossen ist

### Schritt 3.2 -- 33-Handler-Migration in Scheduler-Pipeline (auf main)

Architektur-Refactor: alle 33 klassischen AutoLoop-Action-Handler aus `AutoLoopActions.ts` sind in die deklarative Scheduler-Pipeline (`Pipeline.config.ts`) gewandert. Der `autoLoop()`-Body besteht jetzt nur noch aus ctx-Aufbau und `scheduler.tick(ctx)`-Aufruf. **Kein Verhaltens-Change**: Trigger, Cool-downs, Polling-Delays, Navigation, Paranoia-Gates, lastActionPerformed-Continuation und Handler-Reihenfolge sind 1:1 erhalten.

`handleMythicWave` ist als deprecated no-op stub belassen (sein Tick-internes Slot-Reservation-Pattern hat im Pipeline-Modell keine Funktion). Geplante Entfernung mit v7.37.0.

Cluster-Verlauf auf staging:

- **3.2.G.0** (`02c80cd1`) -- Scheduler-Erweiterung: ctx-Argument an precondition/step.fn/onFailure, Pipeline-Order ueber Array-Position (priority-Feld weg), `fromDescriptor`-Helper.
- **3.2.G.a** (`23d7dbf2`) -- Pilot: handleShop, handleAutoEquipBoosters.
- **3.2.G.a-fix1** (`56ab35cf`) -- handleShop precondition-Vollstaendigkeit (Lesson `pipeline-inner-trigger-in-precondition`); Shop.ts autoLoop-Import gedroppt fuer Cycle-Break.
- **3.2.G.b** (`9ffa3ae3`) -- Massen-Migration via `fromDescriptor`: 11 Handler (LoveRaid, Contest, Missions, Champion, ClubChampion, SeasonalFreeCard, SeasonalRankCollect, FreeBundles, DailyGoals, Labyrinth).
- **3.2.G.b-fix1** (`d98f85a4`) -- HandlerConfig.name als technischer Bezeichner getrennt vom User-Log-Text (vermeidet Spaces/Punkte in Storage-Keys); Cycle-Baseline refresh.
- **3.2.G.complete** (`235098df`) -- 19 verbleibende Handler (HaremSize, PlaceOfPower, GenericBattle, TrollBattle, Pachinko, Quest, Season, PentaDrill, Pantheon, ChampionTicket, +5 Collect, Salary, +2 BossBang, GoHome). HeroHelper/getHero ersetzt durch getHHVars/unsafeWindow.shared.Hero (Cycle-Break).
- **3.2.G.complete-tune** (`580bd9ea`) -- handleTrollBattle minIntervalMs 2_000 -> 4_000 nach PH-Live-Test (75:28 Trigger:Fight-Ratio, 47 legitime Skip-Cycles).

Squash auf main: PR #1737, Commit `f461e6a3`, Version 7.35.56. Issue-Kommentar: `issuecomment-4535681843`.

### Side-Effekte auf main seit Schritt 3

- Cycle-Baseline auf main: 377 (war 381 nach Schritt 3, net -4 durch Pipeline-Path-Konsolidierung).
- Lint-Last: unveraendert (60 errors / 820 warnings -- Repo-Baseline).
- Bundle: 1.45 MiB.
- Tests: 60 Suites / 830 Tests (war 60/811 nach Schritt 3).

### Lessons aus Schritt 3.2

- **`pipeline-inner-trigger-in-precondition.md`** (Workspace, neu in dieser Session): Bei jeder Pipeline-Migration eines Legacy-Handlers gehoert die KOMPLETTE Trigger-Logik (alle if-Stufen) in die `precondition`. Kein silent-skip-`return { ok: true }` in step.fn -- das produziert Scheduler-Spam mit `Starting chain`/`completed`-Pairs ohne reale Arbeit. Triggered durch handleShop-38-Starts:2-Trigger-Bug in der Pilot-Migration.

### Hotfixes auf main waehrend Schritt 3.2

Keine. Alle Bugs (handleShop-Spam, HandlerConfig.name-Map-Keys, TrollBattle-Polling-Rate) wurden auf der Refactor-Linie gefixt und kamen mit dem Schritt-3.2-Squash mit.

## Was als naechstes ansteht

### Schritt 4 -- Code-Review `Helper/StorageHelper.ts`

Aus der Roadmap. Aufgaben:

- 4.1 `docs-internal/REVIEW_StorageHelper.md` erstellen (5 Achsen, Severity-Schema). Hot-Spot aus `REVIEW_PHASE0.md`.
- 4.2 Findings in Cluster auf der Refactor-Linie umsetzen.

Inkludiert N7 aus Schritt 2 (Storage-Key-Tippfehler `unkownPagesList`), das dort nach 4 verschoben wurde.

### Roadmap-Reihenfolge (verbleibend)

1. **Schritt 4** (StorageHelper-Review)
2. **Schritt 5** (Loop-Modul-Cluster: Quest, Contest, DailyGoals, Champion, PlaceOfPower)
3. weiter laut `REVIEW_ROADMAP.md`

Folge-Release **v7.37.0** als Pipeline-Architektur-Schritt geplant -- Detail-Plan in `docs-internal/REVIEW_v7.37.0_Pipeline_Architecture.md` (gitignored). Ersetzt das `lastActionPerformed`-Continuation-Token durch ein scheduler-internes Multi-Step-Modell mit Reload-Persistenz. Nach 7.36.0-Release.

## Wichtige Files fuer den Wiedereinstieg

| Datei | Zweck |
|---|---|
| `docs-internal/REVIEW_ROADMAP.md` | Steuerungsdatei, Schritt-Status (gitignored) |
| `docs-internal/REVIEW_BACKLOG.md` | Backlog-Eintraege (handleGoHome, Forbidden-Frequenz auf Schluss-Navigationen) |
| `docs-internal/REVIEW_PHASE0.md` | Hot-Spot-Ranking, Coverage-Baseline |
| `docs-internal/REVIEW_HANDOVER.md` | Phase-2-Methodik (5-Achsen-Review, Severity-Schema) |
| `docs-internal/REVIEW_v7.37.0_Pipeline_Architecture.md` | Folge-Release-Plan fuer Pipeline-Multi-Step |
| `src/Helper/StorageHelper.ts` | Naechstes Review-Target |
| `src/config/HHStoredVars.ts` | Storage-Schluessel-Definitionen (2551 LoC, in Schritt 10 separat reviewed) |
| `docs-internal/storage-keys.md` | Storage-Inventory-Doku |

## Branch-Modell

Aus `REVIEW_ROADMAP.md` Sektion **Refactor-Branch-Modell** (unveraendert):

- Sammel-Branch: `refactor/v7.36.0-staging`. Nach Schritt-3.2-Reset 2026-05-25 synchron mit main (`f461e6a3`).
- Pro Cluster ein Sub-Branch (`refactor/<modul>-<aspect>`), Direkt-FF-Merge auf staging via fast-forward.
- Versionierung auf staging: patch-bumpen, weiter ab letzter staging-Version. Nach dem Schritt-3.2-Reset ist staging auf 7.35.56 (= aktuelle main-Version). **Naechster Bump auf staging: 7.35.57** (frisch ab main).
- Cherry-Pick / Squash nach main bei stabilem Stand (siehe Squash-Workflow im REVIEW_ROADMAP.md).
- Hotfixes auf main: 9-von-10-Faellen direkt auf der Refactor-Linie bauen, mit naechstem stabilen Stand nach main.

## Workflow je Cluster (auf staging)

1. Pre-Phase Re-Verify (Pflicht, alle Befunde einzeln pruefen).
2. Branch von staging anlegen (`git checkout refactor/v7.36.0-staging; git checkout -b refactor/<sub-cluster>`).
3. Code-Aenderung + Spec-Erweiterung.
4. Verifikation: `npm run typecheck`, `npm run build`, `npx jest --runInBand --no-coverage`, `npm run lint`, `npm run deps:circular:check`.
5. Versions-Bump in `package.json` + `src/Service/FeaturePopupService.ts`, Build erneut, kein CHANGELOG.
6. Commit auf Cluster-Branch. **Dann FF-Merge + Push + Verify**:
   ```powershell
   git checkout refactor/v7.36.0-staging
   git merge --ff-only refactor/<cluster>
   git push origin refactor/v7.36.0-staging
   git ls-remote origin refactor/v7.36.0-staging
   git rev-parse refactor/v7.36.0-staging
   ```
   Stimmen die SHAs nicht ueberein: Push fehlgeschlagen, Cluster nicht weiterbauen. Lesson `_lessons/ff-merge-push-staging-pitfall.md`.
7. User-Test in Tampermonkey.
8. Roadmap mit Cluster-Status [x] aktualisieren.

## Squash-via-Diff: staging -> main (Schritt-Abschluss)

Wenn ein Schritt aus der Roadmap komplett auf staging stabil ist und nach main soll, **nicht** rebasen oder cherry-picken pro Cluster. Stattdessen Squash-via-Diff (vollstaendig dokumentiert in `REVIEW_ROADMAP.md`).

## Bekannte Pitfalls

### FF-Merge ohne Push-Verifikation verliert Stand

Lesson `_lessons/ff-merge-push-staging-pitfall.md`. Nach `git push origin refactor/v7.36.0-staging` IMMER `git ls-remote` plus `git rev-parse` vergleichen.

### TDZ-Crash durch zirkulaeren Import

Lesson `_lessons/zirkulaerer-import-tdz-crash.md`. Bei Refactors Module-Imports gegen `npm run deps:circular:check` halten. Bei neuen Cycles erst strukturell pruefen (Setter-Pattern, Konstanten-Extraktion, Storage-Reads statt Helper-Calls), erst dann Baseline refreshen.

### Pipeline-Inner-Trigger gehoert in precondition

Lesson `_lessons/pipeline-inner-trigger-in-precondition.md` (neu 2026-05-25). Bei Pipeline-Migration die KOMPLETTE Trigger-Logik in `precondition` zusammenfuehren, kein silent-skip in step.fn.

### `wouldFightWithPower` synchron zu `handleTrollBattle` halten

Lesson `_lessons/mapping-fix-vollstaendig-pruefen.md`. Bei Aenderungen an handleTrollBattle-Aktivierungs-Pfaden die `wouldFightWithPower`-Helper mit-aktualisieren.

### Pipeline-Handler-Cool-Down ueber Page-Reload

ADR-002 (`docs/decisions/ADR-002-pipeline-cooldown-persistence.md`). `Scheduler.lastRunAt`-Map wird in sessionStorage unter `TK.pipelineLastRunAt` persistiert.

### Issue-Refs nur in Commit/PR-Body

Nicht in CHANGELOG, README, Issue-Kommentaren oder Doku.

### Refactor-Stille bis 7.36.0

Auf der Refactor-Linie kein CHANGELOG-Eintrag. Erst beim main-Squash kommt der CHANGELOG-Block (User-Sicht). Hotfix-PRs auf main duerfen einen Eintrag haben.

## Aufraeumen am Ende dieser Session

- Squash-Branch `refactor/step-3.2-pipeline-migration` gepusht, gemerged, lokal + remote geloescht.
- 7 Cluster-Branches geloescht (3.2.G.0/a/a-fix1/b/b-fix1/complete/complete-tune).
- PR #1737 gemerged auf main als Commit `f461e6a3`.
- Issue #1722 hat den Step-3.2-Status-Kommentar.
- Staging auf neues main resetted, Push verifiziert.
- Lesson `pipeline-inner-trigger-in-precondition.md` neu im Workspace, dokumentiert.
- Backlog-Eintrag #2 (Forbidden-Frequenz auf Schluss-Navigationen) ergaenzt.
- Roadmap mit Step-3.2-Squash-Eintrag aktualisiert.

## Prompt fuer naechste Session

```
Refactor an HHAuto fortsetzen.

Lies zuerst:
1. docs-internal/REVIEW_ROADMAP.md (Steuerungsdatei, Status der Schritte)
2. docs-internal/SESSION_HANDOVER_2026-05-25.md (dieser Handover)
3. docs-internal/REVIEW_PHASE0.md (Hot-Spot-Ranking als Kontext fuer StorageHelper)
4. docs-internal/REVIEW_BACKLOG.md (offene Backlog-Eintraege, falls Modul-Review-Cross-Refs)

Naechster Schritt: Schritt 4 -- Code-Review Helper/StorageHelper.ts.

Aufgaben:
- 4.1 docs-internal/REVIEW_StorageHelper.md erstellen (5 Achsen
  Severity-Schema wie REVIEW_PageHelper.md / REVIEW_AutoLoop_Findings.md).
- 4.2 Findings in Cluster auf der Refactor-Linie umsetzen.

Inkludiert N7 aus Schritt 2 (Storage-Key-Tippfehler unkownPagesList,
nach 4 verschoben).

Branch-Modell unveraendert: Sub-Cluster auf eigenem Branch von
refactor/v7.36.0-staging, FF-Merge auf staging, Versions-Bump
fortlaufend ab 7.35.57. Bei stabilem Stand nach Schritt 4.2
Squash-via-Diff nach main.

Beachte:
- KEINE ABKUERZUNGEN beim Re-Verify, jeder Befund einzeln gegen
  Code geprueft.
- Pause nach jedem Sub-Cluster, Test-Freigabe vom User abwarten.
- Refactor-Stille: kein CHANGELOG-Eintrag bis 7.36.0 (ausser bei
  Hotfix-PRs auf main).
- Issue-Refs nur in Commit-/PR-Body (Refs #1722), nicht in
  CHANGELOG/README/Issue-Kommentaren.
- Versions-Bumps auf staging fortlaufend ab 7.35.57.
- FF-Merge/Push-Verify-Pflicht (Lesson ff-merge-push-staging-pitfall).
- Cycle-Check vor jedem Push (Lesson zirkulaerer-import-tdz-crash).
- Pipeline-Migration-Lesson beachten falls StorageHelper-Findings
  Helper-Calls in precondition/step.fn beruehren
  (Lesson pipeline-inner-trigger-in-precondition).
```

## Status-Kompakt

| Metrik | Wert |
|---|---|
| main HEAD | `f461e6a3` |
| main Version | 7.35.56 |
| staging HEAD | `f461e6a3` (= main) |
| staging Version | 7.35.56 (naechster Bump: 7.35.57) |
| Tests | 60 Suites, 830 Specs, alle gruen |
| Cycle-Baseline | 377 |
| Bundle | 1.45 MiB |
| Lint (full) | 60 errors / 820 warnings (Repo-Baseline) |
| Lint (touched files Schritt 3.2) | 0 errors / 0 warnings |
| Pipeline-Handler | 33 in Pipeline.config.ts (handleMythicWave als no-op stub) |
