---
tags:
  - projekt/HHAuto
  - scope/arbeitsplatz
  - session
---

# Session-Handover -- HHAuto Refactor

**Datum letzter Stand:** 2026-05-26 (Ende Schritt 4 main-Squash + Hotfix 4.2.X / 4.2.Y live)
**Aktueller Branch:** `main` (Version 7.35.57)
**Refactor-Branch:** `refactor/v7.36.0-staging` (synchron mit `main` nach Schritt-4-Reset)

## Was abgeschlossen ist

### Schritt 4 -- StorageHelper-Review (auf main)

Der gesamte StorageHelper-Cluster ist live in v7.35.57 (PR #1739, Commit `76e4eca7`). Sechs Refactor-Cluster plus zwei Hotfixes wurden via Squash-via-Diff aus staging in einem Commit auf main konsolidiert. Squash-Workflow lief sauber: kein Merge-Konflikt, alle 3 CI-Jobs SUCCESS, FF-Merge via `gh pr merge --rebase`.

Cluster-Verlauf auf staging:

- **4.2.A** (`85988129`, v7.35.57 staging) -- C1 (setStoredValue catch-Robustheit gegen primitive/plain-object Throws), I1 (kobanUsing-Recursion-Break ohne Stack-Overflow-Risiko), I2-Variante-A (cleanLogsInStorage ohne Re-Write, verhindert Quota-Amplifikation). Plus neue `spec/Helper/StorageHelper.spec.ts` mit 13 Cases (Quota-Retry, kobanUsing-Master-Switch, Catch-Robustheit). User-Test gruen.
- **4.2.X Hotfix** (`d77f2f40`, v7.35.59 staging) -- handleLeague refresh timer when fight not possible. precondition lockerte um `checkTimer('nextLeaguesTime')` ergaenzt; lastActionPerformed-Skip aus step.fn in precondition gezogen (lesson pipeline-inner-trigger-in-precondition); step.fn macht Battle ODER setTimer mit `Hero.energies.challenge.next_refresh_ts`. Behebt pInfo "No timer"-Anzeige bei Energie=0. User-Test gruen (zwei Runs: mit Energie -> Battle+Timer; ohne Energie -> Default-Timer).
- **4.2.B** (`eb4ea60b`, v7.35.60 staging) -- I8 (8 Direkt-Storage-Bypaesse migriert auf `deleteStoredValue`): PlaceOfPower 3x, ParanoiaService 4x, Pipeline.config 1x. ForbiddenBackoff/StartService/Utils.sort_by bleiben legitime Ausnahmen.
- **4.2.C** (`56828bd4`, v7.35.61 staging) -- Lint-Cleanup (StorageHelper.ts 4E/12W -> 0E/0W) plus I3 (migrateHHVars empty-string-Bug), I4 (setHHStoredVarToDefault null-Reihenfolge), I5 (debugDeleteTempVars Storage-Toggle-Edge-Case via setStoredValue), I9 (debugDeleteAllVars Registry-Iteration), N5 (Magic-Number-Comment).
- **4.2.D** (`39b90f4a`, v7.35.62 staging) -- N4/N7 (Storage-Key-Tippfehler `unkownPagesList` -> `unknownPagesList`). 4 Code-Files + Spec, ohne Migrations-Step (Telemetrie-Daten verlierbar).
- **4.2.F** (`6df7c9e4`, v7.35.63 staging) -- Doku: I7 (settPerTab-Toggle migriert keine Settings, gewollt aber bisher unsichtbar), N7 (migrateHHVars Dormancy + Keep-Rationale).
- **4.2.Y Hotfix** (`c2a31c5b`, v7.35.64 staging) -- Issue #1738: handleEventParsing-Loop bei abgelaufenen Events. `pruneExpiredEvents()` droppt Eintraege mit `seconds_before_end <= now` aus eventList vor `getStaleEventIDs()`. Defensiv-Wall in `EventModule.parseEventPage` else-Branch fuer Direct-Caller. 6 neue Spec-Cases. User-Test gruen (Console-Reproduce mit fake_expired_event).

Squash auf main: PR #1739, Commit `76e4eca7`, Version 7.35.57 (Bump 56 -> 57 obwohl staging auf 64; main-Versionsnummer ist die User-Sicht-Referenz, der Sprung in staging wurde bewusst zu 57 zurueckgenommen).

Issues:
- #1722 Status-Kommentar fuer Step 4 (`issuecomment-4545427723`).
- #1738 Live-Kommentar (`issuecomment-4545417113`).
- #1718 Live-Kommentar fuer Pipeline-Reorder (`issuecomment-4545420954`).

CHANGELOG.md hat Eintrag v7.35.57 mit User-sichtbaren Verhaltens-Aenderungen (League-Timer-Refresh, Event-Loop-Fix, Pipeline-Reorder als Top-3).

### Side-Effekte auf main seit Schritt 3.2

- Cycle-Baseline auf main: 377 unveraendert.
- Lint-Last touched files: 0E/0W (StorageHelper.ts, Pipeline.config.ts, Spec).
- Bundle: 1.45 MiB unveraendert.
- Tests: 61 Suites / 849 Specs (war 60/811 vor Step 3.2, +19 durch Pipeline-Integration, +13 durch StorageHelper.spec.ts, +6 durch expired-event Cases).

### Lessons aus Schritt 4

- **`pipeline-handler-idle-pfad-fuer-ui-timer.md`** (neu): Pipeline-Handler, die einen UI-relevanten Timer pflegen, brauchen einen Idle-Pfad. precondition `(canDoWork() || cooldownExpired())`, step.fn `if (canDoWork()) Battle else setTimer(default)`. Triggered durch Hotfix 4.2.X.
- **`stale-storage-cleanup-im-reader.md`** (neu): SessionStorage-Eintraege ueberleben Wochen, wenn der Tab nicht geschlossen wird. Pipeline-Trigger auf Storage-Daten brauchen zwei Filter-Stufen ("wann handeln" + "kann ueberhaupt noch gehandelt werden") plus aktiven Cleanup im Reader. Triggered durch Hotfix 4.2.Y / Issue #1738.

### Hotfixes auf main waehrend Schritt 4

Beide Hotfixes (4.2.X League-Timer, 4.2.Y Event-Loop) wurden auf der Refactor-Linie gebaut und kamen mit dem Step-4-Squash live, nicht als separate Hotfix-PRs auf main. Begruendung: Step-4-Squash war zeitnah, der User wollte alles zusammen in v7.35.57 ausliefern (Option 1 statt Option 2 aus dem Workflow-Dialog).

## Was als naechstes ansteht

### Schritt 5 -- Loop-Modul-Cluster

Aus der Roadmap. Module: `Quest.ts`, `Contest.ts`, `DailyGoals.ts`, `Champion.ts`, `PlaceOfPower.ts`. Workflow-Specs vorhanden (`REVIEW_Quest_Missions_DailyGoals.md`, `REVIEW_BattleLoops.md`).

- 5.1 Code-Review je Modul (5-Achsen, Severity-Schema wie REVIEW_StorageHelper.md / REVIEW_PageHelper.md / REVIEW_AutoLoop_Findings.md).
- 5.2 Findings in Cluster auf der Refactor-Linie umsetzen.

Reihenfolge der Modul-Reviews: Phase-0-Hot-Spot-Ranking war Quest > Contest > DailyGoals > Champion > PlaceOfPower. Quest und PlaceOfPower sind die Hot-Spots (PlaceOfPower wegen #1598-Issue mit AJAX-Race + Mutex-Architektur, Quest wegen 8 questRequirement-Pfade); Contest und DailyGoals sind kleiner und enger; Champion ist mittelgross.

### Roadmap-Reihenfolge (verbleibend)

1. **Schritt 5** (Loop-Modul-Cluster: Quest, Contest, DailyGoals, Champion, PlaceOfPower)
2. **Schritt 6** (Team-Cluster: TeamModule + TeamBuilderService + TeamScoringService)
3. **Schritt 7** (Harem-Cluster: HaremGirl, Harem)
4. **Schritt 8** (Events-Cluster: EventModule, Season, Seasonal, LoveRaidManager)
5. **Schritt 9** (Restliche Battle-Module: Troll, Shop, Pachinko, Labyrinth, PentaDrill)
6. **Schritt 10** (HHStoredVars Slice-Reviews)
7. **Schritt 11** (Coverage-Push, parallel ab Schritt 5)
8. **Schritt 12** (Strict-TS-Aktivierung, parallel)
9. **Schritt 13-15** (Bundle-Audit, unsafeWindow-Audit, Karma-Stack)
10. **Schritt 16** (v7.36.0 Final)

Folge-Release **v7.37.0** (Pipeline-Multi-Step) bleibt nach v7.36.0 Plan, Detail-Plan in `docs-internal/REVIEW_v7.37.0_Pipeline_Architecture.md`.

## Wichtige Files fuer den Wiedereinstieg

| Datei | Zweck |
|---|---|
| `docs-internal/REVIEW_ROADMAP.md` | Steuerungsdatei, Schritt-Status (gitignored) |
| `docs-internal/REVIEW_BACKLOG.md` | Backlog-Eintraege (handleGoHome, Forbidden-Frequenz auf Schluss-Navigationen) |
| `docs-internal/REVIEW_PHASE0.md` | Hot-Spot-Ranking, Coverage-Baseline |
| `docs-internal/REVIEW_HANDOVER.md` | Phase-2-Methodik (5-Achsen-Review, Severity-Schema) |
| `docs-internal/REVIEW_v7.37.0_Pipeline_Architecture.md` | Folge-Release-Plan fuer Pipeline-Multi-Step |
| `docs-internal/REVIEW_Quest_Missions_DailyGoals.md` | Workflow-Spec, Vorbild fuer Schritt-5-Code-Reviews |
| `docs-internal/REVIEW_BattleLoops.md` | Workflow-Spec fuer Champion etc. |
| `src/Module/Quest.ts` / `Contest.ts` / `DailyGoals.ts` / `Champion.ts` / `PlaceOfPower.ts` | Naechste Review-Targets |

## Branch-Modell

Aus `REVIEW_ROADMAP.md` Sektion **Refactor-Branch-Modell** (unveraendert):

- Sammel-Branch: `refactor/v7.36.0-staging`. Nach Schritt-4-Reset 2026-05-26 synchron mit main (`76e4eca7`, v7.35.57).
- Pro Cluster ein Sub-Branch (`refactor/<modul>-<aspect>`), Direkt-FF-Merge auf staging via fast-forward.
- Versionierung auf staging: patch-bumpen, weiter ab letzter staging-Version. Nach dem Squash-Reset ist staging auf 7.35.57 (= main). **Naechster Bump auf staging: 7.35.58**.
- main hat Spruenge in der Versionsnummer; staging-bumps sind feiner. Beim Squash setzt der User die main-Version.
- Squash-via-Diff nach main bei stabilem Stand am Ende eines Schritts (siehe Squash-Workflow im REVIEW_ROADMAP.md). Hotfixes im Refactor-Stand kommen mit dem naechsten Squash mit, ausser der User fordert einen separaten Hotfix-PR.

## Workflow je Cluster (auf staging)

1. Pre-Phase Re-Verify (Pflicht, alle Befunde einzeln pruefen, keine Stichprobe).
2. Branch von staging anlegen.
3. Code-Aenderung + Spec-Erweiterung.
4. Verifikation: `npm run typecheck`, `npm run build`, `npx jest --runInBand --no-coverage`, `npm run lint` (touched files), `npm run deps:circular:check`.
5. Versions-Bump in `package.json` + `src/Service/FeaturePopupService.ts`, Build erneut, kein CHANGELOG.
6. Commit auf Cluster-Branch. Dann FF-Merge + Push + Verify (Lesson `_lessons/ff-merge-push-staging-pitfall.md`):
   ```powershell
   git checkout refactor/v7.36.0-staging
   git merge --ff-only refactor/<cluster>
   git push origin refactor/v7.36.0-staging
   $remote = (git ls-remote origin refactor/v7.36.0-staging).Substring(0,40)
   $local = git rev-parse refactor/v7.36.0-staging
   if ($remote -ne $local) { 'PUSH MISMATCH'; exit 1 }
   ```
7. User-Test in Tampermonkey -- bei Cluster mit User-Sicht-Aenderung. Reine Cleanup-Cluster werden mit dem naechsten Squash mit-getestet.
8. Roadmap mit Cluster-Status [x] aktualisieren.

## Squash-via-Diff: staging -> main (Schritt-Abschluss)

Der Squash-Workflow ist erprobt. Konkret bei Step 4:

1. Branch `chore/step-N-<thema>-squash` von **main** (nicht staging).
2. `git checkout origin/refactor/v7.36.0-staging -- .` -- staging-Tree komplett ueber main-Branch holen.
3. Versions-Bump auf main-Versionsnummer (nicht die staging-Spitze!). Step 4: 7.35.56 -> 7.35.57. Beide Files: package.json + FeaturePopupService.ts.
4. CHANGELOG.md-Eintrag mit User-sichtbaren Aenderungen, Format wie bestehend (`### vX.Y.Z - <thema>`, dann `#### Fixed` / `#### Changed` Bullets).
5. Pflicht-Sweep: `Select-String -Path "README.md","CHANGELOG.md" -Pattern '#\d{3,5}'` und `'(Refs|Closes|Fixes|Resolves|Addresses) #'` -- beides muss leer sein.
6. Build, Tests, Cycles-Check.
7. `git add -A`, Commit mit `Refs #<issues>`-Body, Push mit `-u origin chore/...`.
8. `gh pr create --base main --head <branch> --title ... --body-file ...`.
9. CI abwarten (3 Jobs: build-and-test, quality, eslint).
10. `gh pr merge <num> --rebase --delete-branch`.
11. `git checkout refactor/v7.36.0-staging; git reset --hard origin/main; git push --force-with-lease`.
12. Issue-Kommentare nach freigegebenem Wortlaut.

## Bekannte Pitfalls

### FF-Merge ohne Push-Verifikation verliert Stand

Lesson `_lessons/ff-merge-push-staging-pitfall.md`. Nach `git push origin refactor/v7.36.0-staging` IMMER `git ls-remote` plus `git rev-parse` vergleichen.

### TDZ-Crash durch zirkulaeren Import

Lesson `_lessons/zirkulaerer-import-tdz-crash.md`. Bei Refactors Module-Imports gegen `npm run deps:circular:check` halten.

### Pipeline-Inner-Trigger gehoert in precondition

Lesson `_lessons/pipeline-inner-trigger-in-precondition.md`.

### UI-Timer-pflegende Pipeline-Handler brauchen Idle-Pfad (NEU 2026-05-26)

Lesson `_lessons/pipeline-handler-idle-pfad-fuer-ui-timer.md`. Wenn ein Handler einen pInfo-Timer pflegt, muss precondition + step.fn beide Pfade behandeln (Battle ODER Timer-Refresh aus next_refresh_ts).

### Stale Storage-Entries auf langlebigen Tabs (NEU 2026-05-26)

Lesson `_lessons/stale-storage-cleanup-im-reader.md`. SessionStorage-Eintraege ueberleben Wochen. Pipeline-Trigger auf Storage-Daten brauchen zwei Filter-Stufen plus Cleanup im Reader, sonst Endlosschleife auf abgelaufenen Daten. Reproduce mit Console-Snippet ohne 8 Tage Wartezeit moeglich.

### `wouldFightWithPower` synchron zu `handleTrollBattle` halten

Lesson `_lessons/mapping-fix-vollstaendig-pruefen.md`.

### Pipeline-Handler-Cool-Down ueber Page-Reload

ADR-002 (`docs/decisions/ADR-002-pipeline-cooldown-persistence.md`). `Scheduler.lastRunAt`-Map wird in sessionStorage unter `TK.pipelineLastRunAt` persistiert.

### Issue-Refs nur in Commit/PR-Body

Nicht in CHANGELOG, README, Issue-Kommentaren oder Doku.

### Refactor-Stille bis 7.36.0

Auf der Refactor-Linie kein CHANGELOG-Eintrag. Erst beim main-Squash kommt der CHANGELOG-Block (User-Sicht). Hotfix-PRs auf main duerfen einen Eintrag haben.

## Aufraeumen am Ende dieser Session

- Squash-Branch `chore/step-4-storagehelper-squash` gepusht, gemerged, lokal + remote geloescht.
- 7 Cluster-Branches geloescht (4.2.A/X/B/C/D/F/Y).
- PR #1739 gemerged auf main als Commit `76e4eca7`.
- Issues #1738, #1718, #1722 haben Live-Kommentare.
- Staging auf neues main resetted, Push verifiziert.
- Zwei neue Lessons im Workspace dokumentiert.
- Backlog-Status (`REVIEW_BACKLOG.md`) unveraendert.
- Roadmap mit Step-4-Squash-Eintrag finalisiert.

## Status-Kompakt

| Metrik | Wert |
|---|---|
| main HEAD | `76e4eca7` |
| main Version | 7.35.57 |
| staging HEAD | `76e4eca7` (= main) |
| staging Version | 7.35.57 (naechster Bump: 7.35.58) |
| Tests | 61 Suites, 849 Specs, alle gruen |
| Cycle-Baseline | 377 |
| Bundle | 1.45 MiB |
| Lint StorageHelper.ts | 0/0 (war 4/12 vor Cluster C) |
| Pipeline-Handler | 33 in Pipeline.config.ts (handleMythicWave als no-op stub) |

## Prompt fuer naechste Session

```
Refactor an HHAuto fortsetzen.

Lies zuerst:
1. docs-internal/REVIEW_ROADMAP.md (Steuerungsdatei, Status der Schritte)
2. docs-internal/SESSION_HANDOVER_2026-05-26.md (dieser Handover)
3. docs-internal/REVIEW_PHASE0.md (Hot-Spot-Ranking als Kontext fuer
   die naechste Modul-Auswahl)
4. docs-internal/REVIEW_BACKLOG.md (offene Backlog-Eintraege:
   handleGoHome-Equality-Bug, Forbidden-Frequenz auf Schluss-Navi)
5. docs-internal/REVIEW_Quest_Missions_DailyGoals.md (Workflow-Spec,
   Eingangs-Material fuer den Quest-Code-Review)

Naechster Schritt: Schritt 5 -- Loop-Modul-Cluster.
Module: Quest.ts, Contest.ts, DailyGoals.ts, Champion.ts,
PlaceOfPower.ts. Reihenfolge nach Hot-Spot-Ranking.

Vorschlag fuer den Einstieg:
- 5.1.A docs-internal/REVIEW_Quest.md erstellen (5 Achsen, Severity-
  Schema wie REVIEW_StorageHelper.md / REVIEW_PageHelper.md /
  REVIEW_AutoLoop_Findings.md). Quest ist der erste Hot-Spot, weil
  questRequirement 8 Pfade hat und handleQuest mit dem Backlog-
  Eintrag #1 (handleGoHome-Equality-Bug) verzahnt ist.

Branch-Modell unveraendert: Sub-Cluster auf eigenem Branch von
refactor/v7.36.0-staging, FF-Merge auf staging, Versions-Bump
fortlaufend ab 7.35.58. Bei stabilem Stand nach Schritt 5
Squash-via-Diff nach main.

Beachte:
- KEINE ABKUERZUNGEN beim Re-Verify, jeder Befund einzeln gegen
  Code geprueft.
- Pause nach jedem Sub-Cluster, Test-Freigabe vom User abwarten.
- Refactor-Stille: kein CHANGELOG-Eintrag bis 7.36.0 (ausser bei
  Hotfix-PRs auf main).
- Issue-Refs nur in Commit-/PR-Body (Refs #1722), nicht in
  CHANGELOG/README/Issue-Kommentaren.
- Versions-Bumps auf staging fortlaufend ab 7.35.58.
- FF-Merge/Push-Verify-Pflicht (Lesson ff-merge-push-staging-
  pitfall).
- Cycle-Check vor jedem Push (Lesson zirkulaerer-import-tdz-crash).
- Pipeline-Migration-Lessons beachten falls Findings Pipeline-
  Handler beruehren (pipeline-inner-trigger-in-precondition,
  pipeline-handler-idle-pfad-fuer-ui-timer).
- Bei Storage-getriebenen Findings: Lesson stale-storage-cleanup-
  im-reader.md beachten -- abgelaufene Eintraege brauchen einen
  Cleanup im Reader, nicht nur einen Filter im Trigger.
- Bei Mapping-aenderungen: Lesson mapping-fix-vollstaendig-pruefen.
- handleGoHome-Equality-Bug ist im Backlog #1, nicht Teil von
  Schritt 5; eigener Modul-Review (REVIEW_handleGoHome.md) wenn
  Schritt 5 vorbei.
```
