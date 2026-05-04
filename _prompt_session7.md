# Session 7: HHAuto - Offene Punkte aus Session 6

## Projekt
- Ordner: `HHauto` (im Arbeitsplatz)
- Repo: `https://github.com/OldRon1977/HHauto.git`
- Branch: `main`
- Aktuelle Version: 7.35.18
- Git-Email: `oldron1977@gmail.com`

## Aufgabe 1: Hook erstellen - Feature-Popup Erinnerung bei Version-Bump

### Problem
Bei Version-Bumps (Aenderung der Version in `package.json`) wurde vergessen, das Feature-Popup (`src/Service/FeaturePopupService.ts`) zu aktualisieren. Es gibt keinen Hook der daran erinnert.

### Was zu tun ist
Erstelle einen Kiro-Hook (`.kiro/hooks/`) der bei jeder Dateiaenderung an `package.json` den Agenten erinnert:
- Pruefe ob `FEATURE_POPUP_VERSION` in `src/Service/FeaturePopupService.ts` zur neuen Version in `package.json` passt
- Falls nicht: Erinnere daran, `FEATURE_POPUP_VERSION` und `FEATURE_POPUP_CONTENT` zu aktualisieren

Hook-Typ: `fileEdited`, Pattern: `package.json`, Action: `askAgent`

### Relevante Dateien
- `src/Service/FeaturePopupService.ts` - Zeile ~50: `const FEATURE_POPUP_VERSION: string = "7.35.18";`
- `package.json` - `"version": "7.35.18"`

---

## Aufgabe 2: PROJEKTANWEISUNGEN.md ergaenzen

### Problem
Die Regel "Bei Version-Bump immer das Feature-Popup pruefen/aktualisieren" fehlt in der Dokumentation.

### Was zu tun ist
Ergaenze `PROJEKTANWEISUNGEN.md` um einen neuen Punkt "8. RELEASE-CHECKLISTE":

```
## 8. RELEASE-CHECKLISTE

Bei jedem Version-Bump:
1. Version in package.json aendern
2. FeaturePopupService.ts: FEATURE_POPUP_VERSION auf neue Version setzen
3. FeaturePopupService.ts: FEATURE_POPUP_CONTENT aktualisieren (What's New Text)
4. README.md: Release Notes ergaenzen
5. Build ausfuehren (npm run build)
6. Commit, Push, PR nach Roukys, Merge (Rebase)
```

---

## Aufgabe 3: Blessing-Value-Matching (Hex-Code Problem)

### Problem
Die Spiel-Daten in `availableGirls` verwenden Hex-Farbcodes fuer `eye_color1` (z.B. "00F", "A55") statt lesbarer Namen ("golden", "blue"). Die Blessings verwenden Namen ("Eye Color Golden"). Der Vergleich `traitValue === blessedValue` matcht daher nie.

### Aktueller Stand
- `BlessingService.parseBlessedValues()` extrahiert korrekt: `{eyeColor: "golden"}` aus der API
- `findTraitGroups()` hat einen 3x Boost wenn `traitValue.toLowerCase() === blessedVal.toLowerCase()`
- Aber `traitValue` ist "00F" (Hex) und `blessedVal` ist "golden" -> kein Match -> Boost greift nie
- Der Algorithmus waehlt trotzdem korrekt (ueber Effective Power Vergleich), aber der Blessing-Boost ist wirkungslos

### Loesung: Boost auf Kategorie-Ebene statt Wert-Ebene
Statt den exakten Wert zu vergleichen, booste ALLE Gruppen der geblesten Kategorie gleichmaessig. Die geblesten Girls haben ohnehin hoehere Stats (+25-40%) die sich im Score niederschlagen. Der Boost muss nur sicherstellen dass die richtige KATEGORIE gewaehlt wird.

### Aenderung in `src/Service/TeamScoringService.ts` findTraitGroups():
Ersetze:
```typescript
if (blessedVal && traitValue.toLowerCase() === blessedVal.toLowerCase()) {
    score *= 3.0; // Strong boost for exact blessed value match
} else if (blessedVal) {
    score *= 0.5; // Penalty for wrong value in blessed category
} else {
    score *= 1.5; // Generic boost if category known but not value
}
```
Mit:
```typescript
score *= 1.5; // Boost all groups in blessed category equally
// (blessed girls already have +25-40% higher stats from the game)
```

### Info-Box Anpassung in `src/Module/TeamModule.ts` updateTeamUI():
Die Zeile die `traitValue` anzeigt: Wenn Blessing-Kategorie matcht, zeige den Blessing-Wert (z.B. "golden"). Sonst zeige den Hex-Code mit "#" Prefix (z.B. "#A55"). Aktuell steht dort:
```
${blessedVals[teamResult.traitCategory] || teamResult.traitValue || '?'}
```
Das funktioniert bereits korrekt WENN die Kategorie matcht. Wenn nicht, zeige "#" + traitValue:
```
${blessedVals[teamResult.traitCategory] || ('#' + teamResult.traitValue) || '?'}
```

---

## Workflow
1. Alle 3 Aufgaben umsetzen
2. Build (`npx webpack --config webpack.config.js`)
3. Version NICHT bumpen (kein Release, nur Fix)
4. Commit auf main, Push
5. KEIN PR nach Roukys (kommt erst beim naechsten Release)

## Constraints
- Schreib-Tools (fsWrite, strReplace) funktionieren NICHT in diesem Workspace. Nutze Python via `executePwsh` mit PowerShell heredoc (`@'...'@`) zum Schreiben.
- Der preToolUse Hook feuert bei JEDEM executePwsh-Aufruf. Instruktion: "Falls kein Git-Befehl, ignorieren." Email ist `oldron1977@gmail.com`. Mit `ignoreWarning: true` fortfahren.
- Build: `npx webpack --config webpack.config.js` (manchmal haengt er, dann `Get-Process -Name node | Stop-Process -Force` vorher)
