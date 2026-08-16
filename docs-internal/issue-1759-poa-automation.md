---
last-verified: 2026-07-14
status: reopened-for-reconsideration
---

# Issue #1759 — Auto „Path"-Events (PoA-Missionen automatisieren)

Vollständiges Handoff-/Wiederaufnahme-Dokument. Enthält die komplette Analyse,
alle Entscheidungen, den Branch-Stand, die Missionstyp-Matrix und die offenen
Punkte. Ziel: keine Info aus der Diskussion geht verloren, jederzeit fortsetzbar.

- **Issue:** https://github.com/OldRon1977/HHauto/issues/1759 (Autor: ZaryImortal)
- **Titel:** „Request : Auto Path Events"
- **Labels:** `new feature`, `won't do`
- **Verwandt:** [BACKLOG-ISSUES.md](../BACKLOG-ISSUES.md) (Abschnitt ISSUE-1759),
  Memory `backlog-session-2026-07-status.md`

---

## 0. Status in einem Absatz

Etappe A (Read-only-Parser) wurde umgesetzt (Branch `feat/issue-1759a-poa-parser`,
Commit `ec95666`, v8.4.0), dann wurde das ganze Ticket am 2026-07-13 auf **won't do**
gesetzt und der Branch gelöscht. Am **2026-07-14** wurde der Branch lokal
wiederhergestellt und die won't-do-Entscheidung wird **neu bewertet** — weil eine
Code-Analyse zeigt, dass die ursprüngliche Begründung („jeder Missionstyp = eigenes
Modul, zu große Policy-Fläche") technisch nicht mehr trägt: die Aktionen existieren
alle bereits und sind abgesichert. Offen ist nur noch **Orchestrierung + Toggles +
eine Wartungs-/Policy-Entscheidung**, nicht fehlende Technik.

---

## 1. Der Streitpunkt (Issue-Verlauf)

- **ZaryImortal (Reporter):** Kann man die „Path"-Missionen automatisieren
  („Sell X items", „Use Pachinko X times", „Fight Champions X times",
  „Spend X money" …)?
- **Franck-75 (Kernanforderung):** Es braucht eine **„automation until"-Grenze**
  (bis Tier X / bis Girl erreicht), weil er Kämpfe gezielt für **Raid-Events**
  aufsparen will, statt die ganze Tape leerzuräumen.
- **OldRon1977 (Maintainer, „won't do"-Begründung):** Reading ist einfach, aber
  aktives *Treiben* verberge pro Typ eine unsichere Entscheidung (welche Items
  verkaufen? wofür Geld/Energie? welcher Pachinko-Zug? wie viele Tokens?) →
  „effectively a module of its own" → won't do.
- **ZaryImortal (Gegenrede):** Das Skript mache das meiste ohnehin schon
  (verkauft alles außer Mythic, kauft Equipment, spielt Pachinko aus Missionen,
  kämpft gegen Champions).

---

## 2. Code-Analyse der vier genannten Typen (Beleglage)

Kernbefund: Für jeden der vier Typen existiert die Aktion **bereits im Code und
ist abgesichert**. Die „unsicheren Entscheidungen" aus der won't-do-Begründung
sind faktisch schon getroffen (Schwellen/Toggles/Reserven).

### Fight Champions — ✅ läuft bereits
- `handleChampionTicket` kauft Tickets mit Energie, respektiert `autoChampsUseEne`
  **und** die Quest-Energie-Schwelle.
- Datei: [Pipeline.config.ts:1366-1420](../src/Service/Pipeline.config.ts#L1366)
- Der einzige Typ, der praktisch geschenkt ist (passiv nebenbei erfüllt).

### Sell X items — Menge ablesbar + Item-Schutz vorhanden
- Verkauf ist heute **manuell/menügetrieben**, nicht autonom: verlangt Shop-Seite,
  geladene Items, eingegebene Stückzahl (`menuSellNumber`).
- Datei: [Shop.ts:608](../src/Module/Shop.ts#L608) `sellArmorItems()`.
- **Sicherheitsmodell existiert schon:** `itemsQuery` schließt Mythic + gesperrte
  Items aus; verkauft zuerst `:not(.legendary):not(.mythic)`, dann überzählige
  Legendaries mit „best-in-set behalten"-Heuristik.
  [Shop.ts:663-700](../src/Module/Shop.ts#L663).
- „Which number?"-Einwand fällt weg: das aktuelle Tier zeigt Fortschritt „3/10",
  Rest = Ziel − Fortschritt → genau die `menuSellNumber`-Eingabe.
- **Residualrisiko (Policy, nicht Technik):** unbeaufsichtigt + wiederholt
  verkaufen hat anderes Risikoprofil als der bewusste Klick des Nutzers.

### Play Pachinko X — ✅ Orb-Only-Sicherung existiert, 1745-gehärtet
- Zwei Pfade: (1) `getFreePachinko` = zeitgesteuerter **Gratiszug**
  (`data-free="true"`); (2) `pachinkoPlayXTimes` = **Orb-Run** (der relevante).
- Orbs auslesen: [Pachinko.ts:140](../src/Module/Pachinko.ts#L140)
  `getNumberOfOrbsLeft()` liest `span[total_orbs]`.
- „Keine Orbs → nicht spielen": [Pachinko.ts:282](../src/Module/Pachinko.ts#L282)
  `if (orbLeftOnAutoStart <= 0) { … return; }`.
- „Nie über die Orbs hinaus": [Pachinko.ts:288](../src/Module/Pachinko.ts#L288)
  begrenzt `orbsToGo > orbLeftOnAutoStart` → Abbruch. **Kann nicht in Koban laufen.**
- Zusätzlich `serverOrbsLeft`-Mechanismus (Issue **1745**) gegen Über-Verbrauch bei
  schnellen Läufen. Es gibt bereits `PachinkoFillOrbs`-Toggle + `PachinkoXTimes`.
- **Residual:** heute button-getriggert (nicht im Loop); Orbs sind selbst eine
  sparbare Ressource → eigener Toggle nötig.

### Spend money X — kauft heute schon mit Geld (nicht Koban)
- `Market.doShopping()` ist im Loop verdrahtet
  ([StartService.ts:590](../src/Service/StartService.ts#L590)).
- Markt-Auto-Buy fasst **drei** Sektionen an:
  - `shop[1]` = **Booster** (Koban `hc`), Toggle `autoBuyBoosters`, `kobanBank`-Reserve
    ([Market.ts:70](../src/Module/Market.ts#L70)).
  - `shop[2]` = **Geschenke** (Geld `sc`), Toggle `autoAffW`
    ([Market.ts:125](../src/Module/Market.ts#L125)).
  - `shop[3]` = **Bücher/Potions** (Geld `sc`), Toggle `autoExpW`
    ([Market.ts:200](../src/Module/Market.ts#L200)).
- **Equipment (`shop[0]`) rührt der Auto-Buy NICHT an** → kollisionsfreier Hebel.
- Geld-Reserve eingebaut: kauft nur bei `money >= Exp/Aff + Preis`
  ([Market.ts:229](../src/Module/Market.ts#L229)); `Exp`/`Aff` konfigurierbar
  ([Market.ts:50-51](../src/Module/Market.ts#L50)).

**Fazit der Analyse:** „total simpel" untertreibt den Integrationsaufwand leicht;
„eigenes Modul / won't do" überzeichnet ihn deutlich. Wahrheit = **begrenzte
Feature-Erweiterung, überwiegend Glue-Code über vorhandene, abgesicherte Funktionen.**
Der einzig wirklich neue Teil ist die **Orchestrierungsschicht** (Objective-Reader +
dünne Treiber + Stopp-bei-Tier/Girl) — genau Francks „automation until".

---

## 3. Missionstyp-Matrix (Stand 2026-07-14)

**Wichtige Einschränkung:** Das Spiel zeigt den Missionstext nur für das *aktuelle*
Tier — andere Tiers liefern `unknown`. Eine vollständige Typ-Liste ist deshalb
empirisch noch nicht erfasst. Belegbasis: **ein** Live-Capture (Maintainer,
2026-07-08, Event `path_event_105`, 26 Tiers) plus Issue-Screenshots.

Parser: [PoaMissionParser.ts](../src/Module/Events/PoaMissionParser.ts),
`MISSION_TYPE_KEYWORDS` — erkennt 6 Typen + 2 Sentinels.

### ✅ Klar (besprochen, Modul entschieden)

| Typ-Key | Ziel-Modul (Entscheidung) | Warum sicher |
|---|---|---|
| `fight_champions` | `Champion` (`handleChampionTicket`) | läuft ohnehin, schwellen-gated |
| `play_pachinko` | `Pachinko` (Orb-Run) | nie Koban, 1745-gehärtet |
| `sell_items` | `Shop.sellArmorItems` | Mythic/Legendary-Schutz vorhanden |
| `spend_money` | `Market` → **Equipment (`shop[0]`)** | *nicht* Bücher/Geschenke → keine Kollision mit `autoExpW`/`autoAffW`; Geld risikoarm |

### ⚠️ Unklar (Parser erkennt es, Zuordnung offen — zu verifizieren)

| Typ-Key | Vermutung (Entscheidung dieser Session) | Was fehlt |
|---|---|---|
| `fight_battles` | **Troll battles** (`Troll`) | Live-Capture zur Bestätigung des Kampfmodus |
| `kiss_girls` | **Season** | Live-Capture + Machbarkeit (kein offensichtliches „Kiss"-Modul) |

### ❓ Gänzlich offen (nicht im Parser, „langer Schwanz")

Nie als aktuelles Tier gesehen, daher unerfasst. Kandidaten aus dem Spiel:
**Spend energy**, **Spend kobans**, **Upgrade/Awaken girls**, **Win X battles**,
**Complete X missions**, **Great/Mythic Pachinko speziell**. Braucht weitere
Live-Captures über mehrere Events.

### Sentinels (kein echter Typ)

| Wert | Bedeutung |
|---|---|
| `other` | Text lesbar, aber kein Keyword-Treffer |
| `unknown` | kein Text lesbar — gilt für **alle** Tiers außer dem aktuellen |

### Vom Parser/Capture belegte echte Mission-Texte

- „Do Champion Performances (no matter win/lose)" → `fight_champions`
- „Sell items 0 / 30" → `sell_items` (Live-Capture, `path_event_105`, Tier mit
  10× combativity-Reward `slot_energy_fight`)
- Test-Texte (nicht zwingend live): „Use Pachinko 5 times", „Spend 100,000 Ymens",
  „Fight in the Troll battle", „Kiss 3 girls"

---

## 4. Entscheidungen dieser Session (2026-07-14)

1. **`spend_money` → Equipment (`shop[0]`)**, ausdrücklich **nicht** Bücher/Geschenke.
   Begründung: `shop[0]` wird vom bestehenden Auto-Buy nicht angefasst → keine
   Kollision mit `autoExpW`/`autoAffW`; Geld ist risikoarm/erneuerbar; gekauftes
   Billig-Equipment ist common/rare → fällt nicht unter den Verkaufsschutz und kann
   später sogar ein `sell_items`-Objective mitfüttern.
2. **`fight_battles` → vermutlich Troll battles** — noch zu verifizieren.
3. **`kiss_girls` → vermutlich Season** — noch zu verifizieren.
4. **Durchsatz-Erkenntnis:** markt-basierte Treiber (Sell/Spend) hängen am
   **Shop-Bestand + Refresh-Timer** (`nextShopTime`, `Shop.isTimeToCheckShop`) →
   Objectives werden über Refresh-Zyklen erfüllt, nicht sofort. Kein Sicherheits-,
   sondern ein Tempo-Thema (für „automation until" sogar erwünscht: ruhiges Mitgrinden).

---

## 5. Der wiederhergestellte Branch (Etappe A)

- **Branch:** `feat/issue-1759a-poa-parser`
- **Tip-Commit:** `ec95666` (2026-07-09 14:20), **ein** Commit über (altem) main
- **Version im Branch:** v8.4.0 (kollidiert mit heutigem main-Stand)
- **Wiederhergestellt am:** 2026-07-14 aus dem Reflog (Branch war gelöscht)
- **Aktueller main:** `08a8f43` (v8.5.1+) → **Branch ist stale**, braucht
  **Rebase + Version-Bump auf > 8.5.x** vor jedem Merge.

### Inhalt (read-only, keine Automatisierung, keine neuen Settings)
- [src/Module/Events/PoaMissionParser.ts](../src/Module/Events/PoaMissionParser.ts)
  (~237 Z.) — toleranter Parser: Reward-Tape + aktuelles Objective-Panel; Typ,
  Ziel, Fortschritt, Tier, Girl-Reward-Flag. RewardHelper-Klassifikator wird
  **injiziert** (Import-Zyklus-Vermeidung, ADR-002 / ARCH-001).
- [src/model/PoaMission.ts](../src/model/PoaMission.ts) (~64 Z.) — typisiertes
  Modell; trägt bewusst Tier-Nummer + `hasGirlReward` pro Mission, damit eine
  spätere „until Tier N / until Girl"-Stopp-Bedingung ohne Reshape draufpasst.
- [spec/Module/Events/PoaMissionParser.spec.ts](../spec/Module/Events/PoaMissionParser.spec.ts)
  (~255 Z.) + Fixtures [spec/fixtures/poa/](../spec/fixtures/poa/)
  (`poa-mid-event.html` 10 Tiers, `poa-completed-no-pass.html` Edge-Case, README).
- +15 Z. in [PathOfAttraction.ts](../src/Module/Events/PathOfAttraction.ts)
  (Log-Aufruf des Parse-Ergebnisses auf der Event-Seite).

### Offener Vorbehalt (aus Fixtures-README)
- Selektoren des Objective-Panels sind teils aus Screenshot/Capture rekonstruiert.
- Zu verifizieren an einer Live-Seite: ob jeder Missionstyp einen `data-href`-
  Actionbutton hat; ob `#poa-content .objective` bei vollständig geclaimten Tiers
  ganz verschwindet; ob je-Tier-Rewards wie angenommen aussehen.

---

## 6. Umsetzungsplan (Etappen — je einzeln branchen/freigeben)

- **Etappe A (M) — ERLEDIGT (Branch ec95666):** Parser + Fixtures + Log, keine
  Verhaltensänderung.
- **Etappe B (M):** Settings + Grenzen: `autoPoATasks` (off/on),
  Missionstyp-Whitelist (Multi-Select analog `CollectablesList`-Muster),
  „until"-Grenze (Tier-Nummer / „bis Girl-Reward").
- **Etappe C (L):** Ausführung der 4 besprochenen Typen — je Typ ein Adapter, der
  das bestehende Modul **einmalig** anstößt:
  - `play_pachinko` → `Pachinko` (Orb-Run)
  - `fight_champions` → `Champion`
  - `sell_items` → `Shop.sellArmorItems`
  - `spend_money` → `Market`-**Equipment** (`shop[0]`)
  - **Kein Koban-Einsatz ohne `spendKobans0`-Master-Switch.**
- **Nach Etappe C:** `fight_battles` (→ Troll?) und `kiss_girls` (→ Season?) erst
  nach Live-Verifikation; weiterer langer Schwanz nur nach Feldtest.

### Architektur-Hinweis
Eigenes Scheduler-Block-Thema: `handlePoACollect` existiert; ein `handlePoATasks`-
Block käme dazu — **Slot-Hold-Semantik von v8.1.6 beachten** (`applySlotHold` in
BlockPipeline.ts, siehe `docs-internal/`). Import-Zyklen vermeiden (ARCH-001 /
adr-002-import-cycle-reduction.md): Klassifikatoren injizieren, nicht importieren.

### Akzeptanzkriterien
- [ ] A: Parser + Fixtures + Log, keine Verhaltensänderung. **(erfüllt im Branch)**
- [ ] B: Settings wirksam, Grenzen greifen (kein Kampf-/Ressourcenverbrauch über
      die Grenze hinaus — Francks Fall).
- [ ] C: Whitelisted Missionen werden erfüllt; Nicht-Whitelisted nie angefasst;
      alle Gates grün.

---

## 7. Offene Punkte / To-Do bei Wiederaufnahme

1. **Entscheidung:** won't-do endgültig aufheben? (Issue-Label + ggf. Kommentar-Update)
2. **Branch:** `feat/issue-1759a-poa-parser` auf aktuellen main rebasen +
   Version-Bump > 8.5.x. (Erst nach ausdrücklicher Freigabe; Push per SSH-Remote.)
3. **Verifikation Live-Captures:** Troll (`fight_battles`) und Season (`kiss_girls`)
   bestätigen; langen Schwanz sammeln. Parser loggt bereits — Texte nur einsammeln.
4. **Der 30-Tier-Konsolen-Dump aus einem anderen Chat ist NICHT gesichert** und
   liegt nicht in meinem Kontext. Falls noch vorhanden: nochmal einfügen, dann als
   rohe Capture-Datei unter `spec/fixtures/poa/` sichern (diesmal dauerhaft).
5. **Etappe B danach starten** (Settings + „until"-Grenze).

---

## 8. Wichtige Datei-Referenzen (Kurzindex)

| Zweck | Datei |
|---|---|
| Parser (Etappe A) | `src/Module/Events/PoaMissionParser.ts` |
| Datenmodell | `src/model/PoaMission.ts` |
| PoA-Reward-Collection (bestehend) | `src/Module/Events/PathOfAttraction.ts` |
| Champions-Ticket-Handler | `src/Service/Pipeline.config.ts` (`handleChampionTicket`) |
| Pachinko Orb-Run + Guards | `src/Module/Pachinko.ts` (`pachinkoPlayXTimes`, Z. 282/288) |
| Verkauf + Schutz | `src/Module/Shop.ts` (`sellArmorItems`, Z. 663-700) |
| Markt-Kauf (Geld/Koban) | `src/Module/Market.ts` (`doShopping`, shop[0..3]) |
| Loop-Anbindung Markt | `src/Service/StartService.ts:590` |
| Fixtures + Capture-Notizen | `spec/fixtures/poa/` (README!) |
| Backlog-Plan | `BACKLOG-ISSUES.md` (Abschnitt ISSUE-1759) |
| Session-/Branch-Historie | Memory `backlog-session-2026-07-status.md` |

---

## 9. Chronologie / Entscheidungshistorie

- **2026-07-08:** Live-Capture `path_event_105` (26 Tiers) durch Maintainer.
- **2026-07-09:** Etappe A fertig (`ec95666`, v8.4.0), auf neuen main rebased,
  force-gepusht, Gates grün (1220 Tests) — wartete auf Maintainer-Test + Merge.
- **2026-07-13:** Ticket auf **won't do** gesetzt, Issue-Kommentar gepostet,
  Branch remote+lokal **gelöscht**, Etappen B/C entfielen.
- **2026-07-14:** Branch aus Reflog **wiederhergestellt**; Code-Analyse widerlegt
  die won't-do-Begründung Punkt für Punkt; Zuordnungs-Entscheidungen getroffen
  (spend→Equipment, fight→Troll?, kiss→Season?); Missionstyp-Matrix + dieses
  Handoff-Dokument angelegt. **Neubewertung offen.**
