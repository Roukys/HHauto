---
last-verified: 2026-04-29
status: in-progress (Phase 1 — Prototyp Scheduler, Session 5 complete)
target-version: 7.36.0
---

# HHauto Refactor v7.36.0 — Steuerungsdatei

**Diese Datei ist immer der Einstiegspunkt.** Bei jeder neuen Session zuerst diese Datei lesen, dann den Session-Start-Workflow ausführen.

---

## Aktueller Stand

| Feld | Wert |
|------|------|
| Phase | 1 — Prototyp Scheduler (Session 5 complete) |
| Letzte Aktualisierung | 2026-04-29 |
| Branch | `refactor/v7.36.0` (lokal + auf `origin/refactor/v7.36.0` gepusht für Multi-Laptop-Sync) |
| Code-Basis | rebased auf v7.35.15 (origin/main Stand 2026-04-29) |
| Nächster Schritt | Phase 1 Session 6 (Cross-Game-Validation HH/CH/PH) |
| Blocker | keiner |
| Doku-Stand | `docs-internal/*.md` auf v7.35.14 verifiziert (deep-verify gegen v7.35.10, Delta minimal — siehe Frontmatter-Notizen) |

---

## Session-Start-Workflow (PFLICHT bei jeder neuen Session)

Bevor irgendetwas am Refactor weitergearbeitet wird:

### Schritt 1 — Diese Datei lesen
INDEX.md komplett. Aktueller Stand klären, nächsten Schritt identifizieren.

### Schritt 2 — Upstream-Sync prüfen
```bash
git fetch origin    # OldRon1977/HHauto
git log refactor/v7.36.0..origin/main --oneline
```

### Schritt 3 — Wenn neue Commits in origin/main
Diese Commits MÜSSEN auf den Refactor-Branch übernommen werden:
```bash
git checkout refactor/v7.36.0
git rebase origin/main
```
- Konflikte sauber lösen
- Bei Konflikt in einer schon refactored Datei: prüfen ob das Refactor-Design noch valide ist
- Falls ein Bugfix einen vom Refactor betroffenen Bereich ändert: in `07-lessons-learned.md` notieren

### Schritt 4 — Progress-Log lesen
`06-progress-log.md` lesen für Detail-Stand seit letzter Session.

### Schritt 5 — Erst dann mit der Arbeit beginnen

**Wenn der User explizit sagt „mach weiter am Refactor": IMMER zuerst Schritte 1-4 ausführen, NIEMALS überspringen.**

---

## Verbindliche Regeln

### Doku-Pflicht nach jedem Schritt
- `06-progress-log.md` aktualisieren (was gemacht, wann, mit welchem Ergebnis)
- `07-lessons-learned.md` aktualisieren wenn Erkenntnis (positiv ODER negativ)
- Frontmatter `last-verified: YYYY-MM-DD` in geänderten Files updaten
- INDEX.md `Aktueller Stand` Tabelle updaten

### Oberstes Credo: „KEINE FUNKTION DARF FEHLEN"
Vor Phase 1 (Prototyp) wird in Phase 0 ein vollständiges Functional Inventory in `10-functional-inventory.md` erstellt. Am Ende des Refactors muss JEDER Eintrag der Liste als „migriert" oder „bewusst entfernt" markiert sein. Wenn etwas fehlt: Refactor ist NICHT fertig.

### Modell-Wahl bei Sub-Agents
Memory-File `feedback_subagent_model_selection.md` ist verbindlich. Kurz:
- **Opus 4.7** — Architektur, Design, kritische Reviews, Scheduler-Runtime
- **Sonnet 4.6** — Routine-Migration, Tests, Doku, Functional-Inventory
- **Haiku 4.5** — Triviale Aufgaben (Doku-Korrekturen, kleine String-Ersetzungen)

Bei jedem `Agent`-Tool-Call den `model`-Param explizit setzen. Im Zweifel: Sonnet 4.6.

### Branch-Strategie
- Long-running Branch in OldRon1977/HHauto: `refactor/v7.36.0` (lokal angelegt 2026-04-27, auf `origin` gepusht 2026-04-29)
- Mindestens wöchentlich gegen `origin/main` rebasen
- **PUSH-POLICY während Refactor:**
  - **Erlaubt:** `git push origin refactor/v7.36.0` — der Branch wird auf `origin` (OldRon1977/HHauto) synchronisiert für Multi-Laptop-Arbeit.
  - **VERBOTEN:** Push in `origin/main` — der Refactor-Branch bleibt strikt getrennt von `main` bis er final mergebereit ist.
- Wenn Refactor fertig: Merge nach origin/main
- Falls Refactor scheitert: Branch behalten oder taggen, NICHT löschen

### Anti-Drift
- Jede Plan-Datei hat Frontmatter `last-verified: YYYY-MM-DD`
- Wenn beim Lesen festgestellt: Datei mehr als 7 Tage alt → vor Verwendung gegen aktuellen Code-Stand prüfen
- Bei Drift: korrigieren UND in `07-lessons-learned.md` notieren

### Cross-Game-Validation
Jeder Refactor-Schritt muss auf allen drei Spielen verifiziert werden bevor er als „done" gilt:
- HH (Hentai Heroes) — Haupt-Test-Bed
- CH (Comix Harem)
- PH (Pornstar Harem)

Mechanik identisch, Design unterscheidet sich, einzelne Bezeichnungen weichen ab.

### Versionierung
- Aktuelle Version: 7.35.14 (Stand 2026-04-29)
- Ziel: 7.36.0 (Major-Bump trotz fehlender User-Features wegen Größe des internen Umbaus)
- HHauto hat **keine** `app.json`. Globale `VERSION_SYNC`-Regel ist hier irrelevant — nur `package.json` führt die Version. Versionsfluss: `package.json` → `build/BannerBuilder.js` → `webpack BannerPlugin` → `HHAuto.user.js` Userscript-Header. Siehe Memory-File `project_no_app_json.md`.

---

## Phasen-Übersicht

| Phase | Name | Status | Detail-Datei |
|-------|------|--------|--------------|
| 0 | Functional Inventory | complete | `10-functional-inventory.md` (wird in Phase 0 erstellt) |
| 1 | Prototyp Scheduler | in-progress (Session 5 complete) | `03-prototype-spec.md` |
| 2 | Pipeline-Migration aller Handler | offen | `02-roadmap.md` (TBD nach Phase 1) |
| 3 | Getypter State-Store | offen | `02-roadmap.md` |
| 4 | Event-Bus-Erweiterung | offen | `02-roadmap.md` |
| 5 | DOM-Adapter | offen | `02-roadmap.md` |
| 6 | Game-API-Layer | offen | `02-roadmap.md` |
| 7 | Settings-Migration mit Pop-Up | offen | `02-roadmap.md` |
| 8 | Cross-Game-Validation HH/CH/PH | offen | `02-roadmap.md` |
| 9 | Cleanup + Doku-Ablösung | offen | `02-roadmap.md` |

Phase 2-9 werden detailliert in `02-roadmap.md` ausgearbeitet, sobald Phase 1 (Prototyp) erfolgreich abgeschlossen ist.

---

## Sub-Files

### Bestehend (initial)
- [00-vision.md](00-vision.md) — Warum, Was, Non-Goals, Erfolgskriterien
- [01-target-architecture.md](01-target-architecture.md) — Detail-Design aller Bausteine
- [03-prototype-spec.md](03-prototype-spec.md) — Phase 1 Spezifikation mit harten Erfolgskriterien

### Wird in Phase 0 erstellt
- `10-functional-inventory.md` — Vollständige Liste aller existierenden Funktionen (Handler, UI-Features, Settings, Storage-Keys)

### Wird nach Phase 1 erstellt (wenn Prototyp grünes Licht bekommt)
- `02-roadmap.md` — Phasen 2-9 detailliert
- `04-migration-strategy.md` — Cookbook: Wie migriert man einen Handler
- `05-risks.md` — Risiko-Register mit Mitigationen
- `08-glossary.md` — Begriffsdefinitionen (Atomic, Pipeline, SOFT/HARD, Steps)

### Werden laufend gepflegt
- [06-progress-log.md](06-progress-log.md) — Chronologisches Arbeitsprotokoll (erster Eintrag: 2026-04-27, Doku-IST-Stand-Verifikation)
- `07-lessons-learned.md` — Positive und negative Erkenntnisse (entsteht bei erster Erkenntnis)

---

## Bei Abbruch des Refactors

Wenn der Refactor abgebrochen werden muss (Prototyp-Erfolgskriterien verfehlt, externe Gründe):
1. `refactor/v7.36.0` Branch behalten oder taggen, NICHT löschen
2. `07-lessons-learned.md` final ausfüllen
3. INDEX.md `Aktueller Stand → Phase` auf `Aborted` setzen
4. Klare Begründung in `06-progress-log.md` dokumentieren
5. User informieren

---

## Bei Fertigstellung des Refactors

1. Komplettheits-Check: jeder Eintrag in `10-functional-inventory.md` muss als „migriert" oder „bewusst entfernt" markiert sein
2. Cross-Game-Validation auf HH, CH, PH
3. Versionsbump 7.35.x → 7.36.0 in `package.json` UND `app.json`
4. Pop-Up-Sequenz vorbereiten (Vor-Update-Warnung + Nach-Update-Info via FeaturePopupService)
5. `docs-internal/architecture.md` und `page-mapping.md` durch neue Versionen ablösen, alte Versionen archivieren
6. INDEX.md `Status` auf `Completed` setzen
7. Merge refactor/v7.36.0 nach origin/main
