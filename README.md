# Energy Graph Scheduler Card (Home Assistant)

<img width="497" height="409" alt="image" src="https://github.com/user-attachments/assets/933d55f4-b8cc-4717-a543-07cfb25b1758" />

Et simpelt Lovelace custom card, der viser en scrollbar pris-graf (time-bars) for en valgt strømpris-sensor og kan foreslå/markere de billigste sammenhængende timer for dine egne “sektioner” (fx *Opvasker 3 timer*).

Kortet er lavet til at kunne indlæses som en almindelig Home Assistant resource af typen **JavaScript** (ingen ESM imports).

## Funktioner

- **Prisgraf pr. time** som farvede søjler (lav/mid/høj) baseret på prisniveauer.
- **Min / Nu / Højeste** vises over grafen.
- **“Nu”-markør** (lodret linje + label) ved nærmeste timepunkt.
- **Tooltip** når du holder musen over en bar (viser tidsinterval + værdi + enhed).
- **Flere dage understøttes**:
  - Samler typisk *i dag + i morgen* hvis sensoren har begge dele.
  - Viser datolabel ved midnat og en separatorlinje.
- **“Billigste tider” sektioner**:
  - Opret dine egne sektioner med *navn* og *antal timer*.
  - Kortet finder den billigste sammenhængende periode (fra “nu” og frem) for hver sektion.
  - Klik på en sektion for at markere dens billigste vindue på grafen.
- **Settings modal** i kortet til at tilføje/slette sektioner.
- **Gemmer sektioner pr. entity i browserens localStorage** (hurtigt og uden ekstra HA-helpers).
- **Editor med entity-picker** (vælg sensor) + valgfri titel.

## Installation

1. Læg filen her i din HA config:

- `www/energy-graph-scheduler-card.js`

2. Tilføj den som resource i Home Assistant:

**UI (anbefalet)**
- *Indstillinger → Dashboards → Ressourcer*
- Tilføj:
  - URL: `/local/energy-graph-scheduler-card.js`
  - Type: `JavaScript Module` **eller** `JavaScript` (afhænger af din HA version). Kortet er lavet til at virke som almindelig `javascript` resource.

3. Genindlæs (refresh) din browser.

## Konfiguration

Minimal eksempel:

```yaml
type: custom:energy-graph-scheduler-card
entity: sensor.din_strompris_sensor
```

Med titel:

```yaml
type: custom:energy-graph-scheduler-card
title: Strømpris
entity: sensor.din_strompris_sensor
```

## Brug (sektioner / billigste tider)

1. Åbn kortet og klik **Settings**.
2. Under *Tilføj time-sektion*:
   - Skriv et navn (fx `Opvasker`)
   - Vælg `Timeinterval` (1–24 timer)
   - Klik **Tilføj**
3. Kortet viser nu et område “Billigste tider” med forslag.
4. Klik på en sektion for at markere dens billigste timevindue i grafen.

### Vigtigt om lagring

- Sektioner gemmes i **browserens localStorage** under en nøgle pr. entity.
- Det betyder typisk:
  - Sektioner er **per device/browser**, ikke nødvendigvis delt mellem telefon/PC.
  - Rydning af browserdata kan fjerne sektionerne.

## Forventet dataformat (sensor attributes)

Kortet forsøger at være robust over for forskellige strømpris-integrationer.

Det leder efter en liste i entity attributes under typiske nøgler som fx:
- `raw_today`, `today`, `prices`, `price`, `data`, `values`
- samt (hvis tilgængelig) `raw_tomorrow` eller `tomorrow`

Hvert element i listen kan være:
- et tal (pris), eller
- et objekt med en værdi i en af disse nøgler: `value`, `price`, `val`, `v`, `amount`, `y`

Tidsstempel forsøges læst fra nøgler som fx:
- `hour`, `start`, `start_time`, `startTime`, `from`, `time`, `date`, `datetime`, `begin`, `t`

Hvis der ikke findes timestamps, antages data at være **sekventielle timer**.

Enheden vises fra `unit_of_measurement` (eller `unit`).

## Kendte begrænsninger

- “Billigste tider” beregnes **fra nu og frem** (dvs. ikke historiske timer).
- Hvis datapunkter mangler (null/ikke numeriske), kan nogle vinduer ikke beregnes.
- Sektioner synkroniseres ikke via Home Assistant (kun localStorage).

## Fejlsøgning

- Åbn browserens Developer Tools → Console, og tjek efter:
  - `ENERGY-GRAPH-SCHEDULER-CARD ...`
- Hvis kortet ikke dukker op:
  - Kontrollér at resource-URL er korrekt: `/local/energy-graph-scheduler-card.js`
  - Hard refresh (Ctrl+F5) efter opdatering af filen.

## Version

Versionen logges i console og findes i koden som `EGS_CARD_VERSION`.

---

Hvis du vil, kan jeg også tilføje et lille eksempel til README’en baseret på din *konkrete* sensor (hvilke attribute keys den bruger), så afsnittet “Forventet dataformat” matcher din opsætning 1:1.
