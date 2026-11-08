const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const registry = new Map();
const context = vm.createContext({
  HTMLElement: class {}, window: {}, console, navigator: {language: 'en'},
  customElements: {get: n => registry.get(n), define: (n, c) => registry.set(n, c)},
  CustomEvent: class { constructor(type, options) { this.type = type; Object.assign(this, options); } },
});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../energy-graph-scheduler-card.js'), 'utf8'), context);
const Editor = [...registry.values()].find(c => c.name === 'EnergyGraphSchedulerCardEditor');

test('color validation accepts supported colors and rejects attribute/CSS injection', () => {
  for (const color of ['#abc', '#abcd', '#123456', '#12345678', 'red', 'rgb(1, 2, 3)', 'hsl(120 50% 50% / 0.5)', 'var(--primary-color)']) {
    assert.equal(context.egsNormalizeColor(color), color);
  }
  assert.equal(context.egsNormalizeColor('##123456'), '#123456');
  for (const color of ['red" onmouseover="alert(1)', 'red;opacity:0', 'url(https://example.test/image)', '<script>', '']) {
    assert.equal(context.egsNormalizeColor(color), null);
  }
});

test('overlapping brackets retain configured precedence and exclusive upper bound', () => {
  const severity = context.egsNormalizeSeverity([{from: 1, to: 3, color: 'red'}, {from: 0, to: 4, color: 'blue'}]);
  assert.equal(context.egsSeverityColor(2, severity), 'red');
  assert.equal(context.egsSeverityColor(3, severity), 'blue');
  assert.equal(context.egsSeverityColor(4, severity), null);
});

function makeEditor(values) {
  const editor = Object.create(Editor.prototype);
  editor._config = {severity: values};
  editor.dispatchEvent = () => {};
  const rows = values.map((s, index) => {
    const fields = {'.sev-from': {value: String(s.from)}, '.sev-to': {value: String(s.to)},
      '.sev-color-text': {value: s.color}, '.sev-color-input': {value: '#ffffff'},
      '[data-act="sev-del"]': {getAttribute: () => String(index)}};
    const row = {querySelector: sel => fields[sel] || null,
      getAttribute: () => String(index), remove: () => rows.splice(rows.indexOf(row), 1)};
    return row;
  });
  editor.shadowRoot = {querySelector: () => null, querySelectorAll: sel => sel === '.sev-row' ? rows : []};
  editor._render();
  // Keep the originally wired DOM for the simulated edit/click sequence.
  editor._render = () => {};
  return {editor, rows};
}

test('delete removes the visible edited row even after ranges change order', () => {
  const {editor, rows} = makeEditor([{from: 0, to: 1, color: 'red'}, {from: 1, to: 2, color: 'blue'}]);
  rows[0].querySelector('.sev-to').value = '4';
  rows[0].querySelector('.sev-from').value = '3';
  rows[0].querySelector('.sev-from').onchange();
  rows[0].querySelector('[data-act="sev-del"]').onclick();
  assert.equal(editor._config.severity.length, 1);
  assert.equal(editor._config.severity[0].color, 'blue');
});

test('delete uses visible rows when an earlier invalid range is filtered out', () => {
  const {editor, rows} = makeEditor([{from: 0, to: 1, color: 'red'}, {from: 1, to: 2, color: 'blue'}]);
  rows[0].querySelector('.sev-from').value = '3';
  rows[0].querySelector('.sev-from').onchange();
  rows[1].querySelector('[data-act="sev-del"]').onclick();
  assert.equal(editor._config.severity.length, 0);
});

test('external severity configuration refreshes an already mounted editor', () => {
  const editor = Object.create(Editor.prototype);
  editor._config = {severity: []}; editor._loaded = true;
  let renders = 0, updates = 0;
  editor._render = () => renders++;
  editor._applyConfigToUi = () => updates++;
  const config = {severity: [{from: 0, to: 1, color: 'red'}]};
  editor.setConfig(config);
  assert.equal(renders, 1);
  editor.setConfig(config);
  assert.equal(updates, 1);
});
