// 临时自检：校验生成的 HTML 中内联数据可解析、布局逻辑无 NaN、节点顺序正确
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..');
const H = { 1: 46, 2: 36, 3: 52 };
const VGAP = 11;

let fail = 0;
const bad = (f, m) => { fail++; console.log(`  ✗ ${f}: ${m}`); };

for (const f of readdirSync(OUT_DIR).filter((x) => x.endsWith('.html'))) {
  const html = readFileSync(path.join(OUT_DIR, f), 'utf8');
  if (/__TITLE__|__SUBTITLE__|__DATA__/.test(html)) bad(f, '存在未替换占位符');

  const m = html.match(/const DATA = ([\s\S]*?);\n\(function\(\)\{/);
  if (!m) { bad(f, '找不到内联 DATA'); continue; }
  let data;
  try { data = JSON.parse(m[1].replace(/<\\\//g, '</')); }
  catch (e) { bad(f, 'DATA JSON 解析失败: ' + e.message); continue; }

  // 复刻布局
  const byId = new Map();
  const parentOf = new Map();
  (function idx(list, p, d) {
    list.forEach((n) => {
      n.depth = d; n.w = [0, 206, 218, 286][d]; n.x = [0, 232, 490, 796][d];
      byId.set(n.id, n); if (p) parentOf.set(n.id, p);
      if (n.c) idx(n.c, n, d + 1);
    });
  })(data.branches, null, 1);

  const expanded = new Set([...byId.values()].filter((n) => n.depth < data.expandLevel).map((n) => n.id));
  function measure(n) {
    const kids = expanded.has(n.id) ? (n.c || []) : [];
    if (!kids.length) { n.h = H[n.depth] + VGAP; n.kidsH = 0; return n.h; }
    let s = 0; kids.forEach((k) => { s += measure(k); });
    n.kidsH = s; n.h = Math.max(H[n.depth] + VGAP, s); return n.h;
  }
  const vis = [];
  function place(n, top) {
    n.y = top + n.h / 2; vis.push(n);
    const kids = expanded.has(n.id) ? (n.c || []) : [];
    if (kids.length) { let s = top + (n.h - n.kidsH) / 2; kids.forEach((k) => { place(k, s); s += k.h; }); }
  }
  let total = 0, top = 0;
  data.branches.forEach((n) => { total += measure(n); });
  data.branches.forEach((n) => { place(n, top); top += n.h; });

  // 断言
  for (const n of vis) {
    if (!Number.isFinite(n.y) || !Number.isFinite(n.x) || !Number.isFinite(n.w)) bad(f, `${n.id} 布局出现 NaN`);
    if (!['g', 'y', 'r'].includes(n.m)) bad(f, `${n.id} 掌握度非法: ${n.m}`);
    if (!n.t) bad(f, `${n.id} 缺少名称`);
    if (n.depth === 1 && !n.n) bad(f, `${n.id} 一级分支缺少一句话结论`);
  }
  // 同级顺序检查：父节点 y 必须落在子节点 y 区间内
  vis.forEach((n) => {
    const kids = expanded.has(n.id) ? (n.c || []) : [];
    if (!kids.length) return;
    const ys = kids.map((k) => k.y);
    if (n.y < Math.min(...ys) - 1 || n.y > Math.max(...ys) + 1) bad(f, `${n.id} 父节点 y 不在子节点区间内`);
    for (let i = 1; i < ys.length; i++) if (ys[i] <= ys[i - 1]) bad(f, `${n.id} 子节点 y 未严格递增`);
  });
  // 关联线两端必须存在
  data.links.forEach((l) => {
    if (!byId.has(l.a) || !byId.has(l.b)) bad(f, `关联线 ${l.a}→${l.b} 端点不存在`);
    if (!l.c || !l.l) bad(f, `关联线 ${l.a}→${l.b} 缺颜色或标签`);
  });

  console.log(`  ✓ ${f}  可见 ${vis.length}/${byId.size} 节点  totalH=${total}  关联线 ${data.links.length}  展开层级 ${data.expandLevel}`);
}
console.log(fail === 0 ? '\n全部自检通过' : `\n自检失败 ${fail} 项`);
process.exit(fail === 0 ? 0 : 1);
