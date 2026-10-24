// 临时自检：用最小 DOM shim 在 Node 里真实执行生成的页面脚本，验证不会白屏
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..');

class El {
  constructor(id) {
    this.id = id; this.attrs = {}; this._html = ''; this.listeners = {};
    this.value = ''; this.scrollTop = 0;
    this.clientWidth = 1400; this.clientHeight = 820;
    this._cls = new Set();
    this.classList = {
      toggle: (c, on) => { if (on === undefined) { this._cls.has(c) ? this._cls.delete(c) : this._cls.add(c); } else { on ? this._cls.add(c) : this._cls.delete(c); } },
      add: (c) => this._cls.add(c), remove: (c) => this._cls.delete(c),
    };
  }
  setAttribute(k, v) { this.attrs[k] = v; }
  getAttribute(k) { return this.attrs[k]; }
  addEventListener(t, f) { (this.listeners[t] = this.listeners[t] || []).push(f); }
  set innerHTML(v) { this._html = v; }
  get innerHTML() { return this._html; }
  querySelectorAll() { return []; }
  fire(type, ev) { (this.listeners[type] || []).forEach((f) => f(ev)); }
}

let fail = 0;
const bad = (m) => { fail++; console.log('  ✗ ' + m); };

for (const f of readdirSync(OUT_DIR).filter((x) => x.endsWith('.html'))) {
  const html = readFileSync(path.join(OUT_DIR, f), 'utf8');
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (scripts.length !== 1) { bad(`${f}: 期望 1 个内联脚本，实际 ${scripts.length}`); continue; }
  const code = scripts[0];

  const els = {};
  const ids = ['view', 'svg', 'stage', 'panel', 'q', 'btn-all', 'btn-l2', 'btn-link', 'btn-out', 'btn-in', 'btn-reset'];
  ids.forEach((id) => { els[id] = new El(id); });

  const timers = [];
  const sandbox = {
    document: {
      getElementById: (id) => els[id] || null,
      addEventListener: () => {},
    },
    window: { innerWidth: 1400 },
    setTimeout: (fn) => { timers.push(fn); return 0; },
    clearTimeout: () => {},
    console: { log() {}, warn() {}, error() {} },
  };
  sandbox.globalThis = sandbox;

  try {
    vm.runInNewContext(code, sandbox, { timeout: 15000 });
  } catch (e) {
    bad(`${f}: 脚本执行抛错 → ${e.message}`);
    continue;
  }
  timers.forEach((t) => { try { t(); } catch (e) { bad(`${f}: 延迟任务抛错 → ${e.message}`); } });

  const svgHTML = els.view.innerHTML || '';
  const rects = (svgHTML.match(/<rect /g) || []).length;
  const texts = (svgHTML.match(/<text /g) || []).length;
  const paths = (svgHTML.match(/<path /g) || []).length;
  const panelHTML = els.panel.innerHTML || '';

  if (svgHTML.length < 500) bad(`${f}: SVG 内容为空或过少 (${svgHTML.length})`);
  if (rects < 8) bad(`${f}: 节点矩形数量异常 (${rects})`);
  if (!panelHTML.includes('掌握程度')) bad(`${f}: 右侧面板未渲染`);
  if (/undefined|NaN/.test(svgHTML) || /undefined|NaN/.test(panelHTML)) bad(`${f}: 输出中出现 undefined / NaN`);
  const w = Number(els.svg.attrs.width), h = Number(els.svg.attrs.height);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) bad(`${f}: svg 尺寸非法 ${w}×${h}`);

  // 交互冒烟：折叠到二级 → 全部展开 → 搜索 → 关联线开关 → 缩放
  try {
    els['btn-l2'].fire('click', { currentTarget: els['btn-l2'] });
    const collapsed = (els.view.innerHTML.match(/<rect /g) || []).length;
    els['btn-all'].fire('click', { currentTarget: els['btn-all'] });
    const opened = (els.view.innerHTML.match(/<rect /g) || []).length;
    if (opened <= collapsed) bad(`${f}: 全部展开未生效 (${collapsed} → ${opened})`);

    els['btn-link'].fire('click', { currentTarget: els['btn-link'] });
    els['btn-link'].fire('click', { currentTarget: els['btn-link'] });

    const sample = 'e';
    els.q.fire('input', { target: { value: sample } });
    timers.splice(0).forEach((t) => t());
    const hitHTML = els.view.innerHTML;
    if (!hitHTML.includes('#fffbeb') && !hitHTML.includes('#f59e0b')) bad(`${f}: 搜索「${sample}」未高亮`);

    els['btn-in'].fire('click', { currentTarget: els['btn-in'] });
    els['btn-out'].fire('click', { currentTarget: els['btn-out'] });
    els['btn-reset'].fire('click', { currentTarget: els['btn-reset'] });
  } catch (e) {
    bad(`${f}: 交互冒烟抛错 → ${e.message}`);
  }

  // 交互冒烟：点击节点选中
  try {
    const firstId = (svgHTML.match(/data-id="([^"]+)"/) || [])[1];
    if (firstId) {
      const fake = { target: { closest: (sel) => (sel === '[data-id]' ? { getAttribute: () => firstId } : null) } };
      els.view.fire('click', fake);
      if (!(els.panel.innerHTML || '').includes('一句话结论')) bad(`${f}: 点击节点后右侧面板未显示结论`);
    }
  } catch (e) {
    bad(`${f}: 节点点击抛错 → ${e.message}`);
  }

  console.log(`  ✓ ${f}  rect=${rects} text=${texts} path=${paths} svg=${w}×${h}`);
}

console.log(fail === 0 ? '\n渲染冒烟全部通过（无白屏风险）' : `\n冒烟失败 ${fail} 项`);
process.exit(fail === 0 ? 0 : 1);
