# Energy Graph Scheduler Card (Home Assistant)

<img width="501" height="411" alt="image" src="https://github.com/user-attachments/assets/1e1ebe96-2156-4ceb-814e-51c1751a7167" />

A simple Lovelace custom card that shows a horizontally scrollable hourly price graph (bar chart) for a selected electricity price sensor, and can suggest/highlight the cheapest contiguous hours for your own “sections” (for example *Dishwasher 3 hours*).

The card is designed to be loaded as a standard Home Assistant **JavaScript** resource (no ESM imports).

## Features

- **Hourly price graph** as color-coded bars (low/mid/high) based on price tiers.
- **Min / Now / Max** shown above the graph.
- **“Now” marker** (vertical line + label) at the nearest hour.
- **Tooltip** on hover (shows time range + value + unit).
- **Multi-day support**:
  - Typically combines *today + tomorrow* if the sensor provides both.
  - Shows a date label at midnight and a separator line.
- **“Cheapest times” sections**:
  - Create your own sections with a *name* and a *duration (hours)*.
  - The card finds the cheapest contiguous window (from “now” and forward) for each section.
  - Click a section to highlight its cheapest window on the chart.
- **Settings modal** inside the card to add/remove sections.
- **Stores sections per entity in browser localStorage** (fast and without extra HA helpers).
- **Editor with entity picker** (pick sensor) + optional title.

## Installation

### Option A: Install via HACS (Custom Repository)

[![Open your Home Assistant instance and add this repository to HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=qlerup&repository=energy-graph-scheduler-card&category=plugin)

If you have HACS installed, you can add this card directly from GitHub as a custom repository:

Tip: use the “My Home Assistant” button at the top of this README.

1. Open **HACS** in Home Assistant.
2. Click the **three dots** (top right) → **Custom repositories**.
3. Paste the GitHub repository URL.
4. Select **Category: Plugin** (Lovelace / Dashboard).
5. Click **Add**.
6. Find the newly added repository in HACS and click **Download**.

After downloading, add the card as a Lovelace resource:

- *Settings → Dashboards → Resources*
- Add:
  - URL: `/hacsfiles/energy-graph-scheduler-card/energy-graph-scheduler-card.js`
  - Type: `JavaScript Module` **or** `JavaScript`

Then refresh your browser.

### Option B: Manual install (copy to www)

1. Place the file here in your HA config:

- `www/energy-graph-scheduler-card.js`

2. Add it as a resource in Home Assistant:

**UI (recommended)**
- *Settings → Dashboards → Resources*
- Add:
  - URL: `/local/energy-graph-scheduler-card.js`
  - Type: `JavaScript Module` **or** `JavaScript` (depends on your HA version). The card is intended to work as a plain `javascript` resource.

3. Reload (refresh) your browser.

## Configuration

Minimal example:

```yaml
type: custom:energy-graph-scheduler-card
entity: sensor.your_electricity_price_sensor
```

With a title:

```yaml
type: custom:energy-graph-scheduler-card
title: Electricity price
entity: sensor.your_electricity_price_sensor
```

## Usage (sections / cheapest times)

1. Open the card and click **Settings**.
2. Under *Add time section*:
   - Enter a name (e.g. `Dishwasher`)
   - Choose `Duration` (1–24 hours)
   - Click **Add**
3. The card will now show a “Cheapest times” area with suggestions.
4. Click a section to highlight its cheapest time window on the chart.

### Important: storage

- Sections are stored in **browser localStorage** under a per-entity key.
- This usually means:
  - Sections are **per device/browser**, not automatically shared between phone/PC.
  - Clearing browser data may remove your sections.

## Expected data format (sensor attributes)

The card tries to be robust across different electricity price integrations.

It looks for an array/list in the entity attributes under common keys such as:
- `raw_today`, `today`, `prices`, `price`, `data`, `values`
- and (if available) `raw_tomorrow` or `tomorrow`

Each item in the list can be:
- a number (price), or
- an object with a value in one of these keys: `value`, `price`, `val`, `v`, `amount`, `y`

Timestamps are attempted from keys such as:
- `hour`, `start`, `start_time`, `startTime`, `from`, `time`, `date`, `datetime`, `begin`, `t`

If no timestamps exist, the data is treated as **sequential hourly values**.

The unit is displayed from `unit_of_measurement` (or `unit`).

## Known limitations

- “Cheapest times” is computed **from now and forward** (not historical hours).
- If some datapoints are missing (null/non-numeric), certain windows cannot be calculated.
- Sections are not synchronized via Home Assistant (localStorage only).

## Troubleshooting

- Open your browser Developer Tools → Console, and look for:
  - `ENERGY-GRAPH-SCHEDULER-CARD ...`
- If the card doesn’t show up:
  - Verify the resource URL is correct: `/local/energy-graph-scheduler-card.js`
  - Hard refresh (Ctrl+F5) after updating the file.

## Version

The version is logged in the console and is defined in the code as `EGS_CARD_VERSION`.
