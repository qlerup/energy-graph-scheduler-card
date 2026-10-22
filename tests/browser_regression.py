"""Browser regression. Install playwright + Chromium, then run this script.
Uses the real distributed card with synthetic HA states.
"""
import json
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start()
base=f'http://127.0.0.1:{server.server_port}'
with sync_playwright() as p:
    browser=p.chromium.launch()
    page=browser.new_page(viewport={'width':375,'height':812},has_touch=True,is_mobile=True,ignore_https_errors=True)
    page.on('pageerror',lambda e:print('PAGE ERROR:',e))
    page.goto(base)
    page.evaluate("document.head.insertAdjacentHTML('beforeend','<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">')")
    page.add_script_tag(url=base+'/energy-graph-scheduler-card.js')
    page.evaluate('''() => {
      const c=document.createElement('energy-graph-scheduler-card');
      c.setConfig({entity:'sensor.prices',sync:false});
      const start=new Date(); start.setHours(0,0,0,0);
      c.hass={states:{'sensor.prices':{state:'0.1',entity_id:'sensor.prices',attributes:{unit_of_measurement:'EUR/kWh',
        prices:Array.from({length:24},(_,i)=>({time:new Date(+start+i*3600000).toISOString(),price:i===0?0.001:0.1+i/100}))}}},language:'en',locale:{language:'en'}};
      document.body.replaceChildren(c);
    }''')
    targets=page.locator('energy-graph-scheduler-card rect[data-hit="1"]')
    targets.first.wait_for(state='attached')
    # Tap well above a low price bar, in its full-height target.
    targets.nth(0).scroll_into_view_if_needed()
    box=targets.nth(0).bounding_box()
    page.touchscreen.tap(box['x']+box['width']/2,box['y']+20)
    page.wait_for_timeout(500)
    tip=page.locator('energy-graph-scheduler-card .tooltip')
    assert tip.is_visible(), 'touch tooltip disappeared immediately after release'
    assert '0.001' in tip.inner_text(),tip.inner_text()
    page.screenshot(path=str(ROOT/'tests/energy-touch.png'))
    print('PASS: full-height mobile tap target; tooltip persists after release')
    browser.close()
server.shutdown()
