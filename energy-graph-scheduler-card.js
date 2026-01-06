// Energy Graph Scheduler Card
// Note: avoid ESM imports so the card works when loaded as "javascript" resource in HA.

const EGS_CARD_TAG = "energy-graph-scheduler-card";
const EGS_EDITOR_TAG = "energy-graph-scheduler-card-editor";
const EGS_CARD_VERSION = "0.1.0";

/* ----------------- LIGHTWEIGHT PICKER (tt-entity-picker) -----------------
 * Use the same custom entity picker concept as used in other cards in this repo.
 */
if (!customElements.get("tt-entity-picker")) {
  class TTEntityPicker extends HTMLElement {
    static get observedAttributes() {
      return ["include-domains", "label", "disabled"];
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._hass = null;
      this._value = "";
      this._domains = [];
      this._disabled = false;
    }
    set hass(h) {
      this._hass = h;
      this._render();
    }
    get hass() {
      return this._hass;
    }
    set value(v) {
      this._value = v || "";
      this._render();
    }
    get value() {
      return this._value || "";
    }
    set disabled(v) {
      this._disabled = !!v;
      this._render();
    }
    get disabled() {
      return !!this._disabled;
    }
    attributeChangedCallback(name, _old, val) {
      if (name === "disabled") this._disabled = val !== null;
      this._render();
    }
    connectedCallback() {
      this._render();
    }
    _parseDomains() {
      try {
        const a = this.getAttribute("include-domains");
        if (!a) return [];
        const v = typeof a === "string" ? JSON.parse(a) : a;
        return Array.isArray(v) ? v.map((x) => String(x)) : [];
      } catch {
        return [];
      }
    }
    _render() {
      const label = this.getAttribute("label") || "";
      this._domains = this._parseDomains();

      const opts = [];
      try {
        const states = this._hass?.states || {};
        for (const id of Object.keys(states)) {
          const dom = id.split(".")[0];
          if (this._domains.length && !this._domains.includes(dom)) continue;
          const st = states[id];
          const name = st?.attributes?.friendly_name || id;
          opts.push({ id, name });
        }
      } catch {
        // ignore
      }
      opts.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

      const current = this._value || "";
      const hasCurrent = current && opts.some((o) => o.id === current);
      const extraCurrentOpt =
        current && !hasCurrent ? [`<option value="${current}">${current} (valgt)</option>`] : [];

      const selOpts = [
        `<option value="">${label || "Select"}</option>`,
        ...extraCurrentOpt,
        ...opts.map((o) => `<option value="${o.id}">${o.name} (${o.id})</option>`),
      ];

      const css = `
        :host{ display:block; }
        .wrap{ width:100%; min-width:250px; }
        .sel{ position: relative; }
        select{ width:100%; height:36px; min-height:36px; appearance:none; -webkit-appearance:none; -moz-appearance:none; padding:6px 34px 6px 10px; border:1px solid var(--divider-color); border-radius:8px; background: var(--card-background-color); color: var(--primary-text-color); box-sizing: border-box; }
        select:focus{ outline:none; border-color: var(--primary-color); box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary-color) 35%, transparent); }
        select:hover{ border-color: color-mix(in oklab, var(--primary-text-color) 20%, var(--divider-color)); }
        select:disabled{ opacity:.6; cursor: not-allowed; }
        .dd-arrow{ position:absolute; right:12px; top:50%; transform: translateY(-50%); width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent; border-top:6px solid var(--secondary-text-color); pointer-events:none; }
        select:disabled + .dd-arrow{ opacity:.6; }
      `;

      this.shadowRoot.innerHTML = `<style>${css}</style><div class="wrap"><div class="sel"><select aria-label="${label}">${selOpts.join(
        ""
      )}</select><span class="dd-arrow" aria-hidden="true"></span></div></div>`;

      const select = this.shadowRoot.querySelector("select");
      if (!select) return;
      try {
        select.value = current;
      } catch {
        // ignore
      }
      try {
        select.disabled = !!this._disabled;
      } catch {
        // ignore
      }

      // Signal picker open early (helps pause editor re-render while dropdown is open)
      try {
        select.addEventListener(
          "pointerdown",
          () => this.dispatchEvent(new CustomEvent("picker-opened", { bubbles: true, composed: true })),
          { passive: true }
        );
        select.addEventListener(
          "focus",
          () => this.dispatchEvent(new CustomEvent("picker-opened", { bubbles: true, composed: true })),
          { passive: true }
        );
      } catch {
        // ignore
      }

      select.onchange = (e) => {
        this._value = e.target.value || "";
        this.dispatchEvent(
          new CustomEvent("value-changed", {
            detail: { value: this._value },
            bubbles: true,
            composed: true,
          })
        );

        // Signal picker closed after a selection is made
        try {
          this.dispatchEvent(new CustomEvent("picker-closed", { bubbles: true, composed: true }));
        } catch {
          // ignore
        }
      };

      // Also signal closed on blur (if user clicks away without changing)
      try {
        select.addEventListener("blur", () => {
          this.dispatchEvent(new CustomEvent("picker-closed", { bubbles: true, composed: true }));
        });
      } catch {
        // ignore
      }
    }
  }

  // Avoid hard failures if another resource already defined the picker.
  try {
    if (!customElements.get("tt-entity-picker")) {
      customElements.define("tt-entity-picker", TTEntityPicker);
    }
  } catch {
    // ignore
  }
}

function egsSafeText(v) {
  return (v ?? "").toString();
}

function egsClamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function egsAsNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function egsParseDate(v) {
  const s = egsSafeText(v);
  if (!s) return null;
  const d = new Date(s);
  return Number.isFinite(d.getTime()) ? d : null;
}

function egsGet(obj, keys) {
  for (const k of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, k)) return obj[k];
  }
  return undefined;
}

function egsExtractSeries(stateObj) {
  const attrs = stateObj?.attributes || {};

  // Prefer combining today + tomorrow when available (common for electricity price sensors).
  const todayKeys = ["raw_today", "today", "prices", "price", "data", "values"];
  const tomorrowKeys = ["raw_tomorrow", "tomorrow"];

  let todayRaw = null;
  for (const key of todayKeys) {
    const v = attrs[key];
    if (Array.isArray(v) && v.length) {
      todayRaw = v;
      break;
    }
  }

  let tomorrowRaw = null;
  for (const key of tomorrowKeys) {
    const v = attrs[key];
    if (Array.isArray(v) && v.length) {
      tomorrowRaw = v;
      break;
    }
  }

  let raw = null;
  if (Array.isArray(todayRaw) && todayRaw.length) {
    raw = Array.isArray(tomorrowRaw) && tomorrowRaw.length ? [...todayRaw, ...tomorrowRaw] : todayRaw;
  } else {
    raw = tomorrowRaw;
  }

  if (!Array.isArray(raw) || !raw.length) return { points: [], unit: attrs.unit_of_measurement || "" };

  const points = [];
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];

    if (typeof item === "number") {
      points.push({ ts: null, value: item, idx: i });
      continue;
    }

    if (item && typeof item === "object") {
      let rawVal = egsGet(item, ["value", "price", "val", "v", "amount", "y"]);
      if (typeof rawVal === "string") rawVal = rawVal.replace(",", ".");
      const value = egsAsNumber(rawVal);
      if (value == null) continue;

      // Common timestamp keys across different electricity price sensors.
      // Energi Data Service exposes objects like: { hour: '2026-01-05T00:00:00+01:00', price: 1.2 }
      const start = egsGet(item, [
        "hour",
        "start",
        "start_time",
        "startTime",
        "from",
        "time",
        "date",
        "datetime",
        "begin",
        "t",
      ]);
      const d = egsParseDate(start);
      points.push({ ts: d ? d.getTime() : null, value, idx: i });
      continue;
    }
  }

  return { points, unit: attrs.unit_of_measurement || attrs.unit || "" };
}

function egsStartOfLocalDay(ts) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function egsStartOfLocalHour(ts) {
  const d = new Date(ts);
  d.setMinutes(0, 0, 0);
  return d.getTime();
}

function egsBuildTimeline(points, nowTs) {
  const src = Array.isArray(points) ? points : [];
  const hasTs = src.some((p) => p && p.ts != null);

  if (!hasTs) {
    return src.map((p, i) => ({ ts: null, value: p?.value ?? null, idx: i }));
  }

  const map = new Map();
  let minTs = null;
  let maxTs = null;
  for (const p of src) {
    if (!p || p.ts == null) continue;
    const t = egsStartOfLocalHour(p.ts);
    map.set(t, p.value);
    if (minTs == null || t < minTs) minTs = t;
    if (maxTs == null || t > maxTs) maxTs = t;
  }
  if (minTs == null || maxTs == null) return [];

  const out = [];
  for (let t = minTs; t <= maxTs; t += 3600 * 1000) {
    out.push({ ts: t, value: map.has(t) ? map.get(t) : null, idx: out.length });
  }

  // Ensure the current hour exists in the view (helps show the "Nu" marker even if the feed is lagging).
  try {
    const nowHour = egsStartOfLocalHour(nowTs);
    if (nowHour > maxTs) {
      for (let t = maxTs + 3600 * 1000; t <= nowHour; t += 3600 * 1000) {
        out.push({ ts: t, value: map.has(t) ? map.get(t) : null, idx: out.length });
      }
    }
  } catch {
    // ignore
  }

  return out;
}

function egsNormalizeTo24(points, nowTs) {
  const out = [];
  const hasTs = points?.some?.((p) => p && p.ts != null);

  if (hasTs) {
    // Pick day based on first valid timestamp (fallback: today).
    const first = points.find((p) => p && p.ts != null);
    const dayStart = egsStartOfLocalDay(first?.ts ?? nowTs);
    const hours = new Array(24).fill(null);

    for (const p of points) {
      if (!p || p.ts == null) continue;
      const pDay = egsStartOfLocalDay(p.ts);
      if (pDay !== dayStart) continue;
      const h = new Date(p.ts).getHours();
      if (h < 0 || h > 23) continue;
      hours[h] = p.value;
    }

    for (let h = 0; h < 24; h++) {
      out.push({ ts: dayStart + h * 3600 * 1000, value: hours[h], idx: h });
    }
    return out;
  }

  // No timestamps: assume sequential hourly values.
  for (let h = 0; h < 24; h++) {
    const p = points[h];
    out.push({ ts: null, value: p ? p.value : null, idx: h });
  }
  return out;
}

function egsComputeTiers(values) {
  const nums = (values || []).filter((v) => Number.isFinite(v)).slice().sort((a, b) => a - b);
  const n = nums.length;
  if (!n) return { t1: null, t2: null };
  const i1 = Math.max(0, Math.min(n - 1, Math.floor((n - 1) * 0.33)));
  const i2 = Math.max(0, Math.min(n - 1, Math.floor((n - 1) * 0.66)));
  return { t1: nums[i1], t2: nums[i2] };
}

function egsTierClass(value, tiers) {
  if (!Number.isFinite(value)) return "bar-missing";
  const t1 = tiers?.t1;
  const t2 = tiers?.t2;
  if (!Number.isFinite(t1) || !Number.isFinite(t2)) return "bar-mid";
  if (value <= t1) return "bar-low";
  if (value <= t2) return "bar-mid";
  return "bar-high";
}

function egsPad2(n) {
  const v = Number(n);
  return v < 10 ? `0${v}` : `${v}`;
}

function egsFormatHourRange(startHour, hours) {
  const s = egsClamp(Number(startHour) || 0, 0, 23);
  const h = egsClamp(Number(hours) || 0, 1, 24);

  const startMin = s * 60;
  const endMinRaw = (s + h) * 60 - 1; // inclusive end (minus 1 minute)
  const endMin = egsClamp(endMinRaw, 0, 24 * 60 - 1);
  const endH = Math.floor(endMin / 60);
  const endM = endMin % 60;

  return `${egsPad2(s)}:00 - ${egsPad2(endH)}:${egsPad2(endM)}`;
}

function egsFormatDate(d) {
  try {
    return d.toLocaleDateString("da-DK", { day: "2-digit", month: "2-digit" });
  } catch {
    const mm = egsPad2(d.getMonth() + 1);
    const dd = egsPad2(d.getDate());
    return `${dd}/${mm}`;
  }
}

function egsFormatRangeByTs(startTs, hours, nowTs) {
  if (startTs == null) return null;
  const h = egsClamp(Number(hours) || 0, 1, 240);
  const start = new Date(startTs);
  const end = new Date(startTs + h * 3600 * 1000 - 60 * 1000);

  const startH = egsPad2(start.getHours());
  const endH = egsPad2(end.getHours());
  const endM = egsPad2(end.getMinutes());

  const nowDay = nowTs != null ? egsStartOfLocalDay(nowTs) : null;
  const startDay = egsStartOfLocalDay(start.getTime());
  const endDay = egsStartOfLocalDay(end.getTime());

  if (nowDay != null && startDay === nowDay && endDay === nowDay) {
    return `${startH}:00 - ${endH}:${endM}`;
  }

  if (startDay === endDay) {
    return `${egsFormatDate(start)} ${startH}:00 - ${endH}:${endM}`;
  }

  return `${egsFormatDate(start)} ${startH}:00 - ${egsFormatDate(end)} ${endH}:${endM}`;
}

function egsFindCheapestWindow(hourValues, hours) {
  const h = egsClamp(Number(hours) || 0, 1, 240);
  const vals = Array.isArray(hourValues) ? hourValues : [];
  if (vals.length < h) return null;

  let best = null;
  for (let start = 0; start <= vals.length - h; start++) {
    let sum = 0;
    let ok = true;
    for (let i = 0; i < h; i++) {
      const v = vals[start + i];
      if (!Number.isFinite(v)) {
        ok = false;
        break;
      }
      sum += v;
    }
    if (!ok) continue;
    if (!best || sum < best.sum) best = { start, hours: h, sum, avg: sum / h };
  }
  return best;
}

function egsFindCheapestWindowFrom(hourValues, hours, startIndex) {
  const h = egsClamp(Number(hours) || 0, 1, 240);
  const vals = Array.isArray(hourValues) ? hourValues : [];
  const start = egsClamp(Number(startIndex) || 0, 0, vals.length);
  if (vals.length - start < h) return null;

  let best = null;
  for (let s = start; s <= vals.length - h; s++) {
    let sum = 0;
    let ok = true;
    for (let i = 0; i < h; i++) {
      const v = vals[s + i];
      if (!Number.isFinite(v)) {
        ok = false;
        break;
      }
      sum += v;
    }
    if (!ok) continue;
    if (!best || sum < best.sum) best = { start: s, hours: h, sum, avg: sum / h };
  }
  return best;
}

function egsStorageKey(entityId) {
  return `egs.sections.v1.${egsSafeText(entityId)}`;
}

function egsLoadSections(entityId) {
  try {
    const raw = localStorage.getItem(egsStorageKey(entityId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((s) => ({
        name: egsSafeText(s?.name).trim(),
        hours: egsClamp(Number(s?.hours) || 0, 1, 24),
      }))
      .filter((s) => s.name);
  } catch {
    return [];
  }
}

function egsSaveSections(entityId, sections) {
  try {
    localStorage.setItem(egsStorageKey(entityId), JSON.stringify(sections || []));
  } catch {
    // ignore
  }
}

function egsComputeBars(points, w, h, pad) {
  const innerW = Math.max(1, w - pad.left - pad.right);
  const innerH = Math.max(1, h - pad.top - pad.bottom);

  const values = points.map((p) => p.value).filter((v) => Number.isFinite(v));
  if (!values.length) return null;

  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const range = max - min;
  const yPad = range * 0.08;
  min -= yPad;
  max += yPad;

  const n = points.length;
  const toY = (v) => pad.top + (1 - (v - min) / (max - min)) * innerH;

  const baselineY = min < 0 && max > 0 ? toY(0) : max <= 0 ? pad.top : pad.top + innerH;

  const step = innerW / Math.max(1, n);
  const barW = Math.max(1, step * 0.72);
  const barOffset = (step - barW) / 2;

  const pts = points.map((p, i) => {
    const v = Number.isFinite(p.value) ? p.value : null;
    const x = pad.left + i * step + barOffset;
    const xCenter = x + barW / 2;
    const yVal = toY(v ?? 0);
    const yTop = Math.min(yVal, baselineY);
    const yBottom = Math.max(yVal, baselineY);
    const heightPx = v == null ? 0 : Math.max(0, yBottom - yTop);
    return {
      i,
      ts: p.ts,
      value: v,
      x,
      xCenter,
      y: yTop,
      h: heightPx,
      w: barW,
    };
  });

  return { min, max, baselineY, pts };
}

function egsNearestIndexByTime(pts, nowTs) {
  if (!pts?.length || nowTs == null) return null;

  // If the series has timestamps, choose closest.
  const hasTs = pts.some((p) => p.ts != null);
  if (hasTs) {
    let bestI = 0;
    let bestDist = Infinity;
    for (let i = 0; i < pts.length; i++) {
      const t = pts[i].ts;
      if (t == null) continue;
      const dist = Math.abs(t - nowTs);
      if (dist < bestDist) {
        bestDist = dist;
        bestI = i;
      }
    }
    return bestI;
  }

  // Otherwise: assume hourly values for current day.
  const d = new Date(nowTs);
  const i = egsClamp(d.getHours(), 0, pts.length - 1);
  return i;
}

class EnergyGraphSchedulerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = null;
    this._settingsOpen = false;
    this._sections = [];
    this._selectedSectionIdx = null;
    this._graphScrollLeft = 0;
    this._graphScrollRatio = null;
    this._lastEntityId = "";
    this._lastEntityRenderKey = null;
  }

  static getStubConfig() {
    return {
      type: `custom:${EGS_CARD_TAG}`,
      title: "Energy Graph Scheduler",
      entity: "",
    };
  }

  setConfig(config) {
    if (!config || typeof config !== "object") throw new Error("Invalid configuration");
    const stub = EnergyGraphSchedulerCard.getStubConfig();
    const prevEntity = this._config?.entity || "";
    this._config = {
      ...stub,
      ...(config || {}),
      // Ensure entity/title defaults are always strings
      title: config.title ?? stub.title,
      entity: config.entity || "",
      // Never lose type
      type: config.type || stub.type,
    };

    // If entity changed, allow re-render even if hass is spamming updates.
    const nextEntity = this._config?.entity || "";
    if (prevEntity !== nextEntity) {
      this._lastEntityId = "";
      this._lastEntityRenderKey = null;
    }
    this._render();
  }

  set hass(hass) {
    this._hass = hass;

    // Home Assistant updates `hass` very frequently. While the Settings modal is open,
    // a full re-render would recreate the inputs and steal focus/selection.
    if (this._settingsOpen) return;

    // Avoid full re-render on every hass tick; only re-render when the selected
    // entity actually updates (this also prevents scroll from snapping back).
    try {
      const entityId = egsSafeText(this._config?.entity || "");
      if (!entityId) {
        this._render();
        return;
      }

      const st = hass?.states?.[entityId] || null;
      const key = st
        ? `${egsSafeText(st.state)}|${egsSafeText(st.last_updated)}|${egsSafeText(st.last_changed)}`
        : "__missing__";

      if (this._lastEntityId !== entityId) {
        this._lastEntityId = entityId;
        this._lastEntityRenderKey = key;
        this._sections = egsLoadSections(entityId);
        this._render();
        return;
      }

      if (this._lastEntityRenderKey !== key) {
        this._lastEntityRenderKey = key;
        this._render();
      }
    } catch {
      this._render();
    }
  }

  getCardSize() {
    return 3;
  }

  connectedCallback() {
    // Ensure sections are loaded at least once.
    try {
      const ent = this._config?.entity;
      if (ent) this._sections = egsLoadSections(ent);
    } catch {
      // ignore
    }
    this._render();
  }

  _openSettings() {
    this._settingsOpen = true;
    this._render();
  }

  _closeSettings() {
    this._settingsOpen = false;
    this._render();
  }

  _addSection(entityId, name, hours) {
    const nm = egsSafeText(name).trim();
    const h = egsClamp(Number(hours) || 0, 1, 24);
    if (!nm) return;
    const next = [...(this._sections || [])];
    next.push({ name: nm, hours: h });
    this._sections = next;
    egsSaveSections(entityId, next);
    this._render();
  }

  _removeSection(entityId, idx) {
    const next = [...(this._sections || [])].filter((_, i) => i !== idx);
    this._sections = next;
    egsSaveSections(entityId, next);
    this._render();
  }

  _render() {
    if (!this.shadowRoot) return;

    // Preserve horizontal scroll position across frequent re-renders.
    try {
      const prevGraph = this.shadowRoot.querySelector(".graph");
      if (prevGraph) {
        const maxPrev = Math.max(0, (prevGraph.scrollWidth || 0) - (prevGraph.clientWidth || 0));
        const left = prevGraph.scrollLeft || 0;
        this._graphScrollLeft = left;
        this._graphScrollRatio = maxPrev > 0 ? left / maxPrev : null;
      }
    } catch {
      // ignore
    }

    const hass = this._hass;
    const config = this._config || { title: "Energy Graph Scheduler", entity: "" };

    // Used only to adapt label density for small cards (does not affect layout sizing).
    let hostW = 0;
    try {
      hostW = Math.round(this.getBoundingClientRect()?.width || 0);
    } catch {
      hostW = 0;
    }

    const entityId = egsSafeText(config.entity);
    const stateObj = entityId ? hass?.states?.[entityId] : null;

    const title = egsSafeText(config.title || "Energy Graph Scheduler");

    const unit = stateObj?.attributes?.unit_of_measurement || "";
    const friendly = stateObj?.attributes?.friendly_name || entityId;

    // Scrollable chart: width is derived from how many hours we can show.
    const height = 160; // SVG coordinate height
    // Extra top padding so we can show hour labels + (when multi-day) date labels.
    const pad = { left: 10, right: 10, top: 44, bottom: 18 };

    let bodyHtml = "";

    if (!entityId) {
      bodyHtml = `<div class="hint">Vælg en strømpris-entity i editoren.</div>`;
    } else if (!stateObj) {
      bodyHtml = `<div class="hint">Entity ikke fundet: <span class="mono">${entityId}</span></div>`;
    } else {
      const { points } = egsExtractSeries(stateObj);

      if (!points.length) {
        bodyHtml = `<div class="hint">Ingen pris-data fundet i <span class="mono">${entityId}</span> attributes.</div>`;
      } else {
        const nowTs = Date.now();
        const timeline = egsBuildTimeline(points, nowTs);
        const hourValues = timeline.map((p) => (Number.isFinite(p.value) ? p.value : null));

        // Only consider hours from "now" and forward when suggesting cheapest times.
        let futureStartIdx = 0;
        try {
          const hasTs = timeline?.some?.((p) => p && p.ts != null);
          if (hasTs) {
            const nowHour = egsStartOfLocalHour(nowTs);
            const idx = timeline.findIndex((p) => p && p.ts != null && p.ts >= nowHour);
            futureStartIdx = idx >= 0 ? idx : timeline.length;
          }
        } catch {
          futureStartIdx = 0;
        }

        const stepPx = 34;
        const width = pad.left + pad.right + timeline.length * stepPx;
        const bars = egsComputeBars(timeline, width, height, pad);
        if (!bars) {
          bodyHtml = `<div class="hint">Kunne ikke opbygge graf fra data.</div>`;
        } else {
          const nowIndex = egsNearestIndexByTime(bars.pts, nowTs);
          const nowPoint = nowIndex != null ? bars.pts[nowIndex] : null;

          const minTxt = Number.isFinite(bars.min) ? bars.min.toFixed(3) : "";
          const maxTxt = Number.isFinite(bars.max) ? bars.max.toFixed(3) : "";
          const nowTxt = nowPoint && Number.isFinite(nowPoint.value) ? nowPoint.value.toFixed(3) : "";

          // Grid lines
          const gridLines = [];
          for (let i = 0; i <= 3; i++) {
            const y = pad.top + (i / 3) * (height - pad.top - pad.bottom);
            gridLines.push(`<line x1="${pad.left}" y1="${y.toFixed(2)}" x2="${(width - pad.right).toFixed(
              2
            )}" y2="${y.toFixed(2)}" class="grid" />`);
          }

          const baseline = `<line x1="${pad.left}" y1="${bars.baselineY.toFixed(2)}" x2="${(width - pad.right).toFixed(
            2
          )}" y2="${bars.baselineY.toFixed(2)}" class="baseline" />`;

          const dayLabels = bars.pts
            .map((p) => {
              if (p.ts == null) return "";
              const d = new Date(p.ts);
              const isMidnight = d.getHours() === 0;
              if (!isMidnight) return "";
              const x = p.xCenter;
              // Date row sits above the repeating 00–23 hour labels.
              const yDate = 14;
              const ySepTop = 22;
              return `
                <line x1="${x.toFixed(2)}" y1="${ySepTop.toFixed(2)}" x2="${x.toFixed(
                2
              )}" y2="${(height - pad.bottom).toFixed(2)}" class="daysep" />
                <text x="${x.toFixed(2)}" y="${yDate.toFixed(
                2
              )}" text-anchor="middle" class="daylab">${egsSafeText(egsFormatDate(d))}</text>
              `;
            })
            .join("");

          const hourLabels = bars.pts
            .map((p, i) => {
              const d = p.ts != null ? new Date(p.ts) : null;
              const hh = d ? `${d.getHours()}`.padStart(2, "0") : `${i % 24}`.padStart(2, "0");
              return `<text x="${p.xCenter.toFixed(2)}" y="${(pad.top - 8).toFixed(
                2
              )}" text-anchor="middle" class="xlab">${hh}</text>`;
            })
            .join("");

          const tiers = egsComputeTiers(bars.pts.map((p) => p.value));

          const secsForSel = Array.isArray(this._sections) ? this._sections : [];
          const selIdxRaw = this._selectedSectionIdx;
          const selIdx = Number.isFinite(selIdxRaw) ? selIdxRaw : null;
          const selectedSection =
            selIdx != null && selIdx >= 0 && selIdx < secsForSel.length ? secsForSel[selIdx] : null;
          const selectedWindow = selectedSection
            ? egsFindCheapestWindowFrom(hourValues, selectedSection.hours, futureStartIdx)
            : null;

          const marks = (() => {
            if (!selectedWindow) return "";
            const start = egsClamp(Number(selectedWindow?.start) || 0, 0, bars.pts.length - 1);
            const hrs = egsClamp(Number(selectedWindow?.hours) || 0, 1, bars.pts.length);
            const end = egsClamp(start + hrs, 1, bars.pts.length);
            const p0 = bars.pts[start];
            const p1 = bars.pts[end - 1];
            if (!p0 || !p1) return "";

            const x0 = p0.x;
            const x1 = p1.x + p1.w;
            const y0 = pad.top + 4;
            const y1 = bars.baselineY + 6;
            const w = Math.max(0, x1 - x0);
            const h = Math.max(0, y1 - y0);
            const rx = 10;
            const labelX = x0 + w / 2;
            const labelY = Math.min(y0 + h - 10, y0 + 18);
            return `
              <g class="mark" pointer-events="none">
                <rect class="mark-box" x="${x0.toFixed(2)}" y="${y0.toFixed(
              2
            )}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" rx="${rx}" ry="${rx}" />
                <text class="mark-label" x="${labelX.toFixed(2)}" y="${labelY.toFixed(
              2
            )}" text-anchor="middle">${egsSafeText(selectedSection?.name || "")}</text>
              </g>
            `;
          })();

          const nowMarker = (() => {
            if (!nowPoint) return "";
            const x = nowPoint.xCenter;
            const yTop = pad.top + 2;
            const yBottom = bars.baselineY + 8;
            const valTxt = Number.isFinite(nowPoint.value) ? nowPoint.value.toFixed(3) : "";
            const label = Number.isFinite(nowPoint.value)
              ? `Nu: ${egsSafeText(valTxt)} ${egsSafeText(unit)}`
              : `Nu: Ingen data`;
            const lx = egsClamp(x, pad.left + 70, width - pad.right - 70);
            const ly = yTop + 14;
            return `
              <g class="nowmark" pointer-events="none">
                <line x1="${x.toFixed(2)}" y1="${yTop.toFixed(2)}" x2="${x.toFixed(
              2
            )}" y2="${yBottom.toFixed(2)}" class="nowline" />
                <g transform="translate(${lx.toFixed(2)}, ${ly.toFixed(2)})">
                  <rect x="-70" y="-14" width="140" height="20" rx="10" ry="10" class="nowpill" />
                  <text x="0" y="0" text-anchor="middle" dominant-baseline="middle" class="nowtext">${egsSafeText(
                    label
                  )}</text>
                </g>
              </g>
            `;
          })();

          const rects = bars.pts
            .map((p, i) => {
              const isNow = nowIndex != null && i === nowIndex;
              const tier = egsTierClass(p.value, tiers);
              const inSel =
                selectedWindow &&
                Number.isFinite(selectedWindow.start) &&
                Number.isFinite(selectedWindow.hours) &&
                i >= selectedWindow.start &&
                i < selectedWindow.start + selectedWindow.hours;
              const cls = `bar ${tier}${isNow ? " bar-now" : ""}${inSel ? " bar-mark" : ""}`;
              const r = Math.min(6, Math.max(0, p.w / 2 - 1), Math.max(0, p.h / 2));
              const valTxt = Number.isFinite(p.value) ? p.value.toFixed(3) : "";
              const tsAttr = p.ts != null ? ` data-ts="${Number(p.ts)}"` : "";
              return `<rect x="${p.x.toFixed(2)}" y="${p.y.toFixed(2)}" width="${p.w.toFixed(2)}" height="${p.h.toFixed(
                2
              )}" rx="${r.toFixed(2)}" ry="${r.toFixed(2)}" class="${cls}" data-idx="${i}" data-val="${valTxt}"${tsAttr} />`;
            })
            .join("");

          bodyHtml = `
            <div class="meta">
              <div class="name">${egsSafeText(friendly)}</div>
              <div class="stats">
                <span>Min: <b>${minTxt}</b> ${egsSafeText(unit)}</span>
                <span>Nu: <b>${nowTxt}</b> ${egsSafeText(unit)}</span>
                <span>Højeste: <b>${maxTxt}</b> ${egsSafeText(unit)}</span>
              </div>
            </div>
            <div class="graph">
              <div class="tooltip" hidden></div>
              <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Price graph" style="width:${width}px; height:160px;">
                <defs>
                  <linearGradient id="egsFillLow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--success-color)" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="var(--success-color)" stop-opacity="0.25" />
                  </linearGradient>
                  <linearGradient id="egsFillMid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--warning-color)" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="var(--warning-color)" stop-opacity="0.25" />
                  </linearGradient>
                  <linearGradient id="egsFillHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--error-color)" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="var(--error-color)" stop-opacity="0.25" />
                  </linearGradient>
                </defs>
                ${dayLabels}
                ${hourLabels}
                ${gridLines.join("")}
                ${baseline}
                ${rects}
                ${marks}
                ${nowMarker}
              </svg>
            </div>
            ${(() => {
              const secs = Array.isArray(this._sections) ? this._sections : [];
              if (!secs.length) return "";
              const items = secs
                .map((s, si) => {
                  const best = egsFindCheapestWindowFrom(hourValues, s.hours, futureStartIdx);
                  const active = this._selectedSectionIdx === si;
                  if (!best) {
                    return `<div class="sec-card${active ? " active" : ""}" data-sec-idx="${si}"><div class="sec-name">${egsSafeText(
                      s.name
                    )}</div><div class="sec-when muted">Ingen data</div></div>`;
                  }
                  const startTs = timeline?.[best.start]?.ts ?? null;
                  const txt =
                    startTs != null
                      ? egsFormatRangeByTs(startTs, best.hours, nowTs)
                      : egsFormatHourRange(best.start % 24, best.hours);
                  return `<div class="sec-card${active ? " active" : ""}" data-sec-idx="${si}"><div class="sec-name">${egsSafeText(
                    s.name
                  )}</div><div class="sec-when">${egsSafeText(txt)}</div></div>`;
                })
                .join("");
              return `<div class="sections"><div class="sec-title">Billigste tider</div><div class="sec-grid">${items}</div></div>`;
            })()}
          `;
        }
      }
    }

    const css = `
      :host{ display:block; }
      ha-card{ overflow:hidden; }
      .wrap{ padding: 12px; }
      .hdr{ display:flex; align-items:center; justify-content:space-between; gap:10px; padding: 12px 12px 0 12px; }
      .hdr-title{ color: var(--primary-text-color); font-size: 20px; font-weight: 600; line-height: 1.2; }
      .hdr-btn{ appearance:none; border: 1px solid var(--divider-color); background: transparent; color: var(--primary-text-color); border-radius: 10px; padding: 6px 10px; font-size: 12px; cursor: pointer; }
      .hdr-btn:hover{ border-color: color-mix(in oklab, var(--primary-text-color) 20%, var(--divider-color)); }
      .hdr-btn:focus{ outline:none; border-color: var(--primary-color); box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary-color) 35%, transparent); }
      .hint{ color: var(--secondary-text-color); padding: 10px 2px; }
      .mono{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      .meta{ display:flex; flex-direction:column; gap:6px; margin-bottom: 8px; }
      .name{ color: var(--primary-text-color); font-weight: 600; line-height: 1.2; }
      .stats{ display:flex; gap: 14px; flex-wrap: wrap; color: var(--secondary-text-color); font-size: 12px; }
      .stats b{ color: var(--primary-text-color); font-weight: 600; }
      .graph{ display:block; width:100%; position:relative; overflow-x:auto; overflow-y:hidden; -webkit-overflow-scrolling: touch; }
      /* Fixed height keeps labels readable on small cards */
      .graph svg{ height:160px; display:block; }
      .grid{ stroke: var(--divider-color); stroke-width: 1; opacity: 0.35; }
      .baseline{ stroke: var(--divider-color); stroke-width: 1; opacity: 0.55; }
      .daysep{ stroke: var(--divider-color); stroke-width: 1; opacity: 0.8; stroke-dasharray: 2 4; }
      .daylab{ fill: var(--secondary-text-color); font-size: 11px; font-weight: 700; opacity: 0.9; user-select:none; }
      .bar{ opacity: 0.78; cursor: default; }
      .bar-mark{ opacity: 1; }
      .bar-low{ fill: url(#egsFillLow); }
      .bar-mid{ fill: url(#egsFillMid); }
      .bar-high{ fill: url(#egsFillHigh); }
      .bar-now{ opacity: 1; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25)); }
      .bar-missing{ opacity: 0; pointer-events:none; }
      .xlab{ fill: var(--secondary-text-color); font-size: 11px; opacity: 0.8; user-select:none; }

      .mark-box{ fill: color-mix(in oklab, var(--primary-color) 10%, transparent); stroke: var(--primary-color); stroke-width: 2; vector-effect: non-scaling-stroke; }
      .mark-label{ fill: var(--primary-text-color); font-size: 12px; font-weight: 800; opacity: 0.95; user-select:none; paint-order: stroke; stroke: var(--card-background-color); stroke-width: 4; }

      .nowline{ stroke: var(--primary-color); stroke-width: 2; opacity: 0.9; vector-effect: non-scaling-stroke; }
      .nowpill{ fill: color-mix(in oklab, var(--card-background-color) 86%, black); stroke: var(--divider-color); stroke-width: 1; vector-effect: non-scaling-stroke; }
      .nowtext{ fill: var(--primary-text-color); font-size: 11px; font-weight: 800; paint-order: stroke; stroke: var(--card-background-color); stroke-width: 4; }

      .tooltip{ position:absolute; z-index: 5; pointer-events:none; background: color-mix(in oklab, var(--card-background-color) 88%, black); border: 1px solid var(--divider-color); border-radius: 10px; padding: 8px 10px; box-shadow: 0 10px 22px rgba(0,0,0,0.35); }
      .tooltip .t-time{ color: var(--secondary-text-color); font-size: 11px; line-height: 1.1; margin-bottom: 4px; }
      .tooltip .t-val{ color: var(--primary-text-color); font-weight: 700; font-size: 13px; line-height: 1.2; white-space: nowrap; }
      .tooltip .t-unit{ color: var(--secondary-text-color); font-weight: 600; margin-left: 4px; }

      .sections{ margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--divider-color); }
      .sec-title{ color: var(--secondary-text-color); font-size: 12px; margin-bottom: 8px; }
      .sec-grid{ display:flex; flex-wrap:wrap; gap: 10px; }
      .sec-card{ border: 1px solid var(--divider-color); border-radius: 12px; padding: 10px 12px; min-width: 150px; max-width: 240px; flex: 0 1 auto; cursor: pointer; user-select:none; }
      .sec-card:hover{ border-color: color-mix(in oklab, var(--primary-text-color) 20%, var(--divider-color)); }
      .sec-card.active{ border-color: var(--primary-color); box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary-color) 35%, transparent); }
      .sec-name{ color: var(--primary-text-color); font-weight: 700; font-size: 13px; line-height: 1.1; margin-bottom: 6px; }
      .sec-when{ color: var(--primary-text-color); font-size: 13px; }
      .muted{ color: var(--secondary-text-color); }

      .modal-backdrop{ position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 50; display:flex; align-items:center; justify-content:center; padding: 16px; }
      .modal{ width: min(520px, 100%); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); }
      .modal-hdr{ display:flex; align-items:center; justify-content:space-between; padding: 12px 14px; border-bottom: 1px solid var(--divider-color); }
      .modal-title{ color: var(--primary-text-color); font-weight: 700; }
      .iconbtn{ appearance:none; border: none; background: transparent; color: var(--primary-text-color); font-size: 18px; cursor:pointer; padding: 6px 8px; border-radius: 10px; }
      .iconbtn:hover{ background: color-mix(in oklab, var(--primary-text-color) 7%, transparent); }
      .modal-body{ padding: 12px 14px 14px; display:flex; flex-direction:column; gap: 12px; }
      .formrow{ display:flex; gap: 10px; }
      .field{ display:flex; flex-direction:column; gap: 6px; flex: 1; }
      .lab{ color: var(--secondary-text-color); font-size: 12px; }
      .inp{ width:100%; height:36px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:10px; padding:6px 10px; background: var(--card-background-color); color: var(--primary-text-color); }
      .inp:focus{ outline:none; border-color: var(--primary-color); box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary-color) 35%, transparent); }
      .btn{ appearance:none; border: 1px solid var(--divider-color); background: transparent; color: var(--primary-text-color); border-radius: 10px; padding: 8px 10px; cursor:pointer; }
      .btn:hover{ border-color: color-mix(in oklab, var(--primary-text-color) 20%, var(--divider-color)); }
      .list{ display:flex; flex-direction:column; gap: 8px; }
      .item{ display:flex; align-items:center; justify-content:space-between; gap: 10px; border:1px solid var(--divider-color); border-radius: 12px; padding: 10px; }
      .item strong{ color: var(--primary-text-color); }
      .item span{ color: var(--secondary-text-color); font-size: 12px; }
    `;

    const modalHtml = (() => {
      if (!this._settingsOpen) return "";
      const secs = Array.isArray(this._sections) ? this._sections : [];
      const list = secs
        .map(
          (s, i) =>
            `<div class="item"><div><strong>${egsSafeText(s.name)}</strong><div><span>Timeinterval: ${egsClamp(
              s.hours,
              1,
              24
            )} timer</span></div></div><button class="btn" data-act="remove" data-idx="${i}">Slet</button></div>`
        )
        .join("");
      return `
        <div class="modal-backdrop" data-act="close">
          <div class="modal" role="dialog" aria-label="Settings">
            <div class="modal-hdr">
              <div class="modal-title">Settings</div>
              <button class="iconbtn" data-act="close" aria-label="Close">✕</button>
            </div>
            <div class="modal-body">
              <div>
                <div class="lab">Tilføj time-sektion</div>
                <div class="formrow">
                  <div class="field">
                    <div class="lab">Navn</div>
                    <input class="inp" data-field="name" placeholder="Opvasker" />
                  </div>
                  <div class="field" style="max-width:160px">
                    <div class="lab">Timeinterval</div>
                    <input class="inp" data-field="hours" type="number" min="1" max="24" step="1" value="3" />
                  </div>
                  <div class="field" style="max-width:140px; align-self:flex-end">
                    <button class="btn" data-act="add">Tilføj</button>
                  </div>
                </div>
              </div>
              <div>
                <div class="lab">Sektioner</div>
                <div class="list">${list || `<div class="muted">Ingen sektioner endnu.</div>`}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    })();

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <ha-card>
        <div class="hdr">
          <div class="hdr-title">${title}</div>
          <button class="hdr-btn" data-act="open-settings">Settings</button>
        </div>
        <div class="wrap">${bodyHtml}</div>
      </ha-card>
      ${modalHtml}
    `;

    // Restore scroll position and keep tracking it.
    try {
      const graph = this.shadowRoot.querySelector(".graph");
      if (graph) {
        const restore = () => {
          try {
            const max = Math.max(0, (graph.scrollWidth || 0) - (graph.clientWidth || 0));
            const desired =
              this._graphScrollRatio != null && Number.isFinite(this._graphScrollRatio)
                ? this._graphScrollRatio * max
                : this._graphScrollLeft || 0;
            graph.scrollLeft = egsClamp(desired, 0, max);
          } catch {
            // ignore
          }
        };

        // Restore after layout so scrollWidth/clientWidth are correct.
        requestAnimationFrame(() => {
          restore();
          requestAnimationFrame(restore);
        });

        graph.onscroll = () => {
          try {
            this._graphScrollLeft = graph.scrollLeft || 0;
            const max = Math.max(0, (graph.scrollWidth || 0) - (graph.clientWidth || 0));
            this._graphScrollRatio = max > 0 ? (graph.scrollLeft || 0) / max : null;
          } catch {
            // ignore
          }
        };
      }
    } catch {
      // ignore
    }

    // Tooltip for bars (custom, theme-friendly)
    try {
      const graph = this.shadowRoot.querySelector(".graph");
      const svg = graph?.querySelector("svg");
      const tip = graph?.querySelector(".tooltip");
      if (graph && svg && tip) {
        const setTip = (clientX, clientY, idx, valStr, tsStr) => {
          const i = Math.max(0, Number(idx) || 0);
          const hasVal = !!valStr;
          const ts = tsStr != null && tsStr !== "" ? Number(tsStr) : null;
          const time =
            Number.isFinite(ts) && ts != null
              ? egsFormatRangeByTs(ts, 1, Date.now())
              : egsFormatHourRange(i % 24, 1);
          tip.innerHTML = hasVal
            ? `<div class="t-time">${egsSafeText(time)}</div><div class="t-val">${egsSafeText(
                valStr
              )}<span class="t-unit">${egsSafeText(unit)}</span></div>`
            : `<div class="t-time">${egsSafeText(time)}</div><div class="t-val muted">Ingen data</div>`;

          const r = graph.getBoundingClientRect();
          const x = clientX - r.left;
          const y = clientY - r.top;

          // Keep it inside the graph area.
          const cx = egsClamp(x, 12, r.width - 12);
          const cy = egsClamp(y, 12, r.height - 12);
          tip.style.left = `${cx}px`;
          tip.style.top = `${cy}px`;
          tip.style.transform = cy < 42 ? "translate(-50%, 16px)" : "translate(-50%, -120%)";
          tip.hidden = false;
        };

        const hideTip = () => {
          tip.hidden = true;
        };

        // Bind to bars directly so the tooltip doesn't flicker when the pointer
        // briefly hits the SVG background/labels.
        const bars = svg.querySelectorAll('rect[data-idx]');
        bars.forEach((bar) => {
          bar.onpointerenter = (ev) => {
            const idx = bar.getAttribute("data-idx");
            const valStr = bar.getAttribute("data-val") || "";
            const tsStr = bar.getAttribute("data-ts") || "";
            setTip(ev.clientX, ev.clientY, idx, valStr, tsStr);
          };
          bar.onpointermove = (ev) => {
            const idx = bar.getAttribute("data-idx");
            const valStr = bar.getAttribute("data-val") || "";
            const tsStr = bar.getAttribute("data-ts") || "";
            setTip(ev.clientX, ev.clientY, idx, valStr, tsStr);
          };
          bar.onpointerleave = hideTip;
          bar.onpointerdown = hideTip;
        });

        svg.onpointerleave = hideTip;
      }
    } catch {
      // ignore
    }

    // Click a section tile to highlight its cheapest window on the chart.
    try {
      this.shadowRoot.querySelectorAll('[data-sec-idx]').forEach((el) => {
        el.onclick = () => {
          const idx = Number(el.getAttribute('data-sec-idx'));
          if (!Number.isFinite(idx)) return;
          this._selectedSectionIdx = this._selectedSectionIdx === idx ? null : idx;
          this._render();
        };
      });
    } catch {
      // ignore
    }

    const openBtn = this.shadowRoot.querySelector('[data-act="open-settings"]');
    if (openBtn) {
      openBtn.onclick = () => this._openSettings();
    }

    // Modal event wiring (best-effort)
    if (this._settingsOpen) {
      const root = this.shadowRoot;
      root.querySelectorAll('[data-act="close"]').forEach((el) => {
        el.onclick = (ev) => {
          // If backdrop clicked, only close when clicking outside dialog.
          const act = ev?.currentTarget?.getAttribute?.('data-act');
          if (act === 'close') {
            if (ev?.currentTarget?.classList?.contains('modal-backdrop') && ev?.target !== ev?.currentTarget) return;
          }
          this._closeSettings();
        };
      });

      const addBtn = root.querySelector('[data-act="add"]');
      if (addBtn) {
        addBtn.onclick = () => {
          const nameEl = root.querySelector('[data-field="name"]');
          const hoursEl = root.querySelector('[data-field="hours"]');
          const nm = nameEl ? nameEl.value : '';
          const hrs = hoursEl ? hoursEl.value : '3';
          this._addSection(entityId, nm, hrs);
        };
      }

      root.querySelectorAll('[data-act="remove"]').forEach((btn) => {
        btn.onclick = () => {
          const idx = Number(btn.getAttribute('data-idx'));
          if (!Number.isFinite(idx)) return;
          this._removeSection(entityId, idx);
        };
      });
    }
  }

  static getConfigElement() {
    return document.createElement(EGS_EDITOR_TAG);
  }
}

class EnergyGraphSchedulerCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = EnergyGraphSchedulerCard.getStubConfig();
    this._loaded = false;
    this._pickerOpen = false;
    this._els = null;
  }

  set hass(hass) {
    this._hass = hass;
    // HA updates `hass` very frequently; re-rendering while a dropdown is open will close it.
    if (this._loaded && !this._pickerOpen) this._applyHassToPickers();
  }

  setConfig(config) {
    const stub = EnergyGraphSchedulerCard.getStubConfig();
    this._config = {
      ...stub,
      ...(config || {}),
      // Normalize
      type: (config && config.type) || stub.type,
      title: (config && config.title) != null ? config.title : stub.title,
      entity: (config && config.entity) || "",
    };
    if (this._loaded) this._applyConfigToUi();
    else this._render();
  }

  get value() {
    return this._config;
  }

  _valueChanged(newConfig) {
    const stub = EnergyGraphSchedulerCard.getStubConfig();
    this._config = {
      ...stub,
      ...(this._config || {}),
      ...(newConfig || {}),
      type: (this._config && this._config.type) || stub.type,
    };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
    // Do not re-render here: it can close dropdowns and steal focus while typing.
  }

  connectedCallback() {
    this._render();
  }

  _applyHassToPickers() {
    if (!this.shadowRoot) return;
    const picker = this.shadowRoot.querySelector("tt-entity-picker.picker");
    if (!picker) return;
    try {
      picker.hass = this._hass;
    } catch {
      // ignore
    }
  }

  _applyConfigToUi() {
    if (!this.shadowRoot) return;
    const title = egsSafeText(this._config?.title ?? "Energy Graph Scheduler");
    const entity = egsSafeText(this._config?.entity ?? "");

    const titleEl = this.shadowRoot.querySelector("input.title");
    if (titleEl && titleEl.value !== title) titleEl.value = title;

    const picker = this.shadowRoot.querySelector("tt-entity-picker.picker");
    if (picker) {
      try {
        picker.value = entity;
      } catch {
        // ignore
      }
    }
  }

  _render() {
    if (!this.shadowRoot) return;

    const hass = this._hass;
    const entity = egsSafeText(this._config?.entity);
    const title = egsSafeText(this._config?.title ?? "Energy Graph Scheduler");

    const css = `
      :host{ display:block; padding: 8px 0; }
      .grid{ display:grid; grid-template-columns: 1fr; gap: 12px; }
      .label{ color: var(--secondary-text-color); font-size: 12px; margin: 2px 0 6px; }
      input{ width:100%; height:36px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:8px; padding:6px 10px; background: var(--card-background-color); color: var(--primary-text-color); }
      input:focus{ outline:none; border-color: var(--primary-color); box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary-color) 35%, transparent); }
    `;

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <div class="grid">
        <div>
          <div class="label">Titel (valgfri)</div>
          <input class="title" type="text" value="${title}" placeholder="Energy Graph Scheduler" />
        </div>
        <div>
          <div class="label">Strømpris entity</div>
          <tt-entity-picker class="picker" label="Vælg entity" include-domains='["sensor"]'></tt-entity-picker>
        </div>
      </div>
    `;

    const titleEl = this.shadowRoot.querySelector("input.title");
    if (titleEl) {
      titleEl.onchange = (e) => this._valueChanged({ title: e.target.value || "" });
    }

    const picker = this.shadowRoot.querySelector(".picker");
    if (picker) {
      // Track whether the dropdown is open; prevents hass updates from killing it.
      try {
        picker.addEventListener(
          "picker-opened",
          () => {
            this._pickerOpen = true;
          },
          { passive: true }
        );
        picker.addEventListener(
          "picker-closed",
          () => {
            setTimeout(() => {
              this._pickerOpen = false;
              this._applyHassToPickers();
            }, 200);
          },
          { passive: true }
        );
      } catch {
        // ignore
      }

      try {
        picker.hass = hass;
      } catch {
        // ignore
      }

      try {
        // ha-entity-picker uses .value; fallback picker uses .value too.
        picker.value = entity;
      } catch {
        // ignore
      }

      // tt-entity-picker fires "value-changed" with detail.value
      picker.addEventListener("value-changed", (ev) => {
        const v = ev?.detail?.value ?? ev?.target?.value;
        this._valueChanged({ entity: v || "" });
      });
    }

    this._loaded = true;
  }
}

if (!customElements.get(EGS_CARD_TAG)) {
  customElements.define(EGS_CARD_TAG, EnergyGraphSchedulerCard);
}
if (!customElements.get(EGS_EDITOR_TAG)) {
  customElements.define(EGS_EDITOR_TAG, EnergyGraphSchedulerCardEditor);
}

// Register in the Lovelace UI card picker (best-effort)
try {
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: EGS_CARD_TAG,
    name: "Energy Graph Scheduler",
    description: "Graf over valgt strømpris-entity (med editor entity picker)",
  });
} catch {
  // ignore
}

console.info(`%cENERGY-GRAPH-SCHEDULER-CARD ${EGS_CARD_VERSION}`, "color: #03a9f4; font-weight: 700");
