// 构建脚本：把 data.mjs（唯一内容源）+ engine.html（渲染引擎）生成多份 HTML 思维导图
// 用法：node src/build.mjs
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { BRANCHES, LINKS, VIEWS } from './data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..');
const ENGINE = readFileSync(path.join(__dirname, 'engine.html'), 'utf8');

const clone = (o) => JSON.parse(JSON.stringify(o));

function collectIds(list, set = new Set()) {
  list.forEach((n) => { set.add(n.id); if (n.c) collectIds(n.c, set); });
  return set;
}

function buildOne(view) {
  const branches = clone(BRANCHES.filter((b) => view.branches.includes(b.id)));
  const ids = collectIds(branches);
  const links = LINKS.filter((l) => ids.has(l.a) && ids.has(l.b));

  const payload = { expandLevel: view.expandLevel, branches, links };
  // 防止数据里出现 </script> 提前闭合标签
  const json = JSON.stringify(payload).replace(/<\//g, '<\\/');

  const html = ENGINE
    .replace(/__TITLE__/g, view.title)
    .replace(/__SUBTITLE__/g, view.subtitle)
    .replace('/*__DATA__*/', json);

  const outPath = path.join(OUT_DIR, view.file);
  writeFileSync(outPath, html, 'utf8');

  const nodeCount = countNodes(branches);
  const kb = (statSync(outPath).size / 1024).toFixed(0);
  return { file: view.file, nodes: nodeCount, links: links.length, kb };
}

function countNodes(list) {
  let n = 0;
  list.forEach((x) => { n += 1; if (x.c) n += countNodes(x.c); });
  return n;
}

const results = VIEWS.map(buildOne);
console.log('生成完成 →', OUT_DIR);
for (const r of results) {
  console.log(`  ${r.file.padEnd(42)} 节点 ${String(r.nodes).padStart(3)}  关联线 ${r.links}  ${r.kb} KB`);
}
