const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const context=vm.createContext({HTMLElement:class {},customElements:{get(){},define(){}},window:{},console});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../energy-graph-scheduler-card.js'),'utf8'),context);
const extract=state=>context.egsExtractSeries(state);
test('ENTSO-e average sensor combines prices_today and prices_tomorrow',()=>{
  const result=extract({attributes:{unit_of_measurement:'EUR/kWh',
    prices_today:[{time:'2026-10-22T00:00:00+02:00',price:0.1}],
    prices_tomorrow:[{time:'2026-10-23T00:00:00+02:00',price:0.2}]}});
  assert.equal(result.points.length,2);assert.equal(result.points[1].value,0.2);
  assert.equal(result.unit,'EUR/kWh');
});
test('ENTSO-e combined price list and decimal strings remain supported',()=>{
  const result=extract({attributes:{prices:[{time:'2026-10-22T00:00:00Z',price:'-0,1'}]}});
  assert.equal(result.points[0].value,-0.1);assert.equal(result.points[0].ts,Date.parse('2026-10-22T00:00:00Z'));
});
test('current-price-only entity cannot fabricate a future curve',()=>{
  assert.equal(extract({state:'0.1',attributes:{unit_of_measurement:'EUR/kWh'}}).points.length,0);
});
test('existing Nordpool format still combines both days',()=>{
  assert.equal(extract({attributes:{raw_today:[{start:'2026-10-22T00:00:00Z',value:1}],
    raw_tomorrow:[{start:'2026-10-23T00:00:00Z',value:2}]}}).points.length,2);
});
