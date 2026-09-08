# DSH 插件增强推荐清单

> 数据来源：DSH 官方插件市场 dshfind.com（9922+ 插件）与 deepseek1024.com（按安装量排序）
> 生成时间：2026-09-07
> 你当前已安装：`beauticode-dsh`、`dsh-better-sidebar`、`dsh-client-liang-intensity-skin`、`dsh-context`、`dsh-dream-skin`、`dsh-plugin-wallpaper-engine`

---

## 一、记忆与知识库（让 Agent 拥有长期记忆）

你的 DSH 目前没有跨会话记忆能力，这是最值得增强的方向。

| 插件 | 安装量 | npm 包名 / 安装命令 | 说明 |
|------|--------|---------------------|------|
| **dsh-memory-plugin** (OpenViking) | 284⭐ 安装 | `dsh plugin --profile web add @openviking/dsh-memory-plugin` | 火山引擎出品，统一长期记忆+知识检索+技能，自演进上下文数据库。35.8k stars |
| **hindsight** (vectorize-io) | 106 安装 | `dsh plugin --profile web add @vectorize-io/hindsight-coding-agents` | 可学习的 Agent 记忆：自动召回与沉淀、知识页、深度反思、按仓库隔离。23k stars |
| **dsh-memory-toolkit** | dshfind 收录 | `dsh plugin --profile web add dsh-memory-toolkit`（GitHub: 123caiji） | 跨会话知识图谱记忆 + 五层 token 节省编排 |
| **dsh-auto-memory** | dshfind 收录 | `dsh plugin --profile web add dsh-auto-memory`（GitHub: 1304836815） | 会话级记忆：收尾提醒 + MEMORY.md 索引 + 对话日志 + LLM 摘要压缩 |
| **dsh-project-memory** | dshfind 收录 | npm: `@yolk_vat-y/dsh-project-memory` | 读取时项目记忆插件 |
| **dsh-weknora** (Tencent) | 38 安装 | `dsh plugin --profile web add @wxg-prc-cpg/dsh-weknora` | 腾讯出品，把原始文档变成可查询 RAG + 自主推理 Agent + 自维护 Wiki。21.6k stars |
| **memos-local-plugin** (MemTensor) | 4 安装 | `dsh plugin --profile web add @memtensor/memos-local-plugin` | 持久化自进化记忆系统，混合检索+跨任务技能复用。11.2k stars |
| **dsh-knowledge** | 2 安装 | `dsh plugin --profile web add dsh-knowledge` | 知识库 & RAG：分块、本地嵌入、混合搜索、管理面板 |

---

## 二、视觉能力（给纯文本模型加上"眼睛")

你现在用的 glm-5.2 等模型可能不具备多模态能力，这些插件能补足看图能力。

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **modlens** (liustack) | 141 安装 | `dsh plugin --profile web add @liustack/modlens` | 纯文本模型的视觉桥梁：粘贴图片→结构化 JSON 证据（OCR/版面/语义）。3.9k stars |
| **dsh-vision-router** | 42 安装 | `dsh plugin --profile web add dsh-vision-router` | 内置免 Key 视觉链+像素级工具（看图问答/定位/裁剪/取色/OCR/矢量化/抠图/截图）。粘贴图片即可用 |
| **dsh-vision-toolkit** (Anionex) | 32 安装 | `dsh plugin --profile web add @anionex/dsh-vision-toolkit` | 一键安装免费使用：图片问答、多图比较、长图 OCR、截图转 UI 还原、元素定位、像素对比 |
| **dsh-llm-vision** | dshfind 收录 | npm: `dsh-llm-vision` | 可靠的视觉+OCR：describe_image + extract_text 工具，自动预处理+重试+答案缓存 |
| **dsh-mindsee** | dshfind 收录 | npm: `dsh-mindsee` | 通过 MindSee 把截图/本地图片转文字，让 DeepSeek 看图作答 |
| **dsh-video-lens** | 1 安装 | `dsh plugin --profile web add dsh-video-lens` | 视频镜头能力，处理会话中的视觉内容 |

---

## 三、浏览器与电脑控制（Agent 真正"动手"）

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **BrowserSkill** (Tencent) | 44 安装 | `dsh plugin --profile web add @wxg-prc-cpg/browser-skill-dsh-plugin` | 腾讯出品，通过 CLI+扩展让 Agent 操控真实登录的浏览器，无干扰自动化 |
| **dsh-browser** (wqty123) | 4 安装 | `dsh plugin --profile web add dsh-builtin-browser` | 共享真实浏览器控制 |
| **dsh-ego-browser** | 5 安装 | `dsh plugin --profile web add dsh-ego-browser` | 内置 ego-lite Chromium，13 个结构化 ego_* 工具（语义快照/语义点击/表单填充/截图/CDP 控制） |
| **dsh-playwright-browser** | 2 安装 | `dsh plugin --profile web add dsh-playwright-browser` | Playwright 浏览器自动化 |
| **dsh-computer-use-win** | 2 安装 | `dsh plugin --profile web add dsh-computer-use-win` | Windows 电脑控制：MCP stdio + PowerShell UIA，22 个桌面工具 |
| **dsh-mac-control** | dshfind 收录 | `dsh plugin --profile web add github:18126295767-cell/dsh-mac-control` | macOS 原生浏览器+桌面控制工具 |

---

## 四、用量与成本监控（管好你的 API 额度）

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-cost-meter** | 50 安装 | `dsh plugin --profile web add dsh-cost-meter` | 会话+当日 API 费用统计、预算图框（已用%）、官方余额、历史看板、峰谷计价、官方价格一键同步 |
| **dsh-token-stats** | dshfind 收录 | npm: `dsh-token-stats` | 全局 Token 用量统计：按模型/日期/会话，USD/CNY 费用估算，CSV/JSON 导出，可拖拽悬浮按钮 |
| **dsh-whale-meter** | 2 安装 | `dsh plugin --profile web add dsh-whale-meter` | 🐳 鲸鱼电表：用量与费用面板，人民币账单、错峰半价计价、可分享账单卡片 |
| **dsh-usage-footer** | dshfind 收录 | `dsh plugin --profile web add dsh-usage-footer`（GitHub: 1514100951） | 账户余额、峰谷时段、今日/本会话消费估算与 token 统计 |
| **dsh-usage-stats** | 2 安装 | `dsh plugin --profile web add dsh-usage-stats` | GitHub 风格用量热力图 + Token/缓存命中/余额看板 + 工作区别名管理 |
| **dsh-api-balance** | dshfind 收录 | `dsh plugin --profile web add github:02Muller25/dsh-api-balance` | 实时显示 API 余额，30 秒自动刷新 |
| **dsh-task-estimator** | dshfind 收录 | `dsh plugin --profile web add github:0x250-t/dsh-task-estimator` | 会话标题栏实时任务耗时、token 与花费估算，含 LLM PERT 估算 |

---

## 五、模型接入与路由（接入更多免费/低价模型）

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-llm-ollama** | dshfind 收录 | `dsh plugin --profile web add github:1035041186/dsh-llm-ollama` | 通过 Ollama 原生协议接入本地 Ollama 服务，即插即用，设置页自动出现 Ollama 页面 |
| **dsh-freeroute** | dshfind 收录 | npm: `dsh-freeroute` | 免费模型聚合：透明故障转移、多 Key 轮换、设置面板 |
| **dsh-opencode-zen** | 2 安装 | `dsh plugin --profile web add github:xiaozhe7772222/dsh-opencode-zen` | 0 元接入 6 个免费大模型，免注册免充值，多 Key 轮换与限流退避 |
| **dsh-agy** | 2 安装 | `dsh plugin --profile web add dsh-agy` | Google Antigravity OAuth 认证与模型访问，多账号池+429 轮换 |
| **dsh-better-api** | dshfind 收录 | `dsh plugin --profile web add github:131CDA1/dsh-better-api` | 为自定义模型添加"推理强度"编辑能力 |
| **dsh-reasoning-effort** | 4 安装 | `dsh plugin --profile web add dsh-reasoning-effort` | Codex 风格思考强度滑块（含大肥鱼跑步滑块） |
| **dsh-thinking-effort** | 2 安装 | `dsh plugin --profile web add @hytime/dsh-thinking-effort` | 调整模型回复的思考努力程度，控制推理深度 |

---

## 六、多智能体与工作流编排

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-agent-teams** (NanmiCoder) | 76 安装 | `dsh plugin --profile web add @nanmicoder/dsh-agent-teams` | AgentTeams 多智能体团队。1.4k stars |
| **dsh-trellis** | dshfind 收录 | npm: `@banana-peeljj12/dsh-trellis` | 自包含 Trellis 工作流触发器 |
| **dsh-crew** | 1 安装 | `dsh plugin --profile web add @zseven-w/dsh-crew` | 从 Claude Code/Codex 分发任务给 DSH Agent，含多模态视觉+图像生成桥接 |
| **DSH-taskboard** | 1 安装 | `dsh plugin --profile web add @shengsheng/dsh-taskboard` | 原生本地任务看板：SQLite、Agent 认领/审核、原生 Web UI |
| **dsh-handoff** | dshfind 收录 | `dsh plugin --profile web add github:0mn1si2i5/dsh-handoff` | 会话间保存/加载开发交接文档（/handoff save\|load，含脱敏+Git 状态捕获） |

---

## 七、安全、审批与防护（自动化审批 + 防失控）

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-codex-approval** | dshfind 收录 | npm: `dsh-codex-approval` | 仿 Codex 的 AI 自动审批：规则+AI 三级风险评估自动放行/拒绝，让沙箱审批自动化 |
| **dsh-tool-budget** | dshfind 收录 | `dsh plugin --profile web add github:173787247/dsh-tool-budget` | 每会话工具调用预算硬上限，超限即停 |
| **dsh-repeat-stop** | dshfind 收录 | `dsh plugin --profile web add github:173787247/dsh-repeat-stop` | 连续相同工具调用达到阈值后硬停（防死循环） |
| **dsh-plan-lattice** | dshfind 收录 | `dsh plugin --profile web add github:1052326311/dsh-plan-lattice` | 长时 Agent 执行漂移防火墙：实验中不安全陈旧变异 12/12→0/12 |
| **dsh-goal-quiescence** | dshfind 收录 | `dsh plugin --profile web add github:1052326311/dsh-goal-quiescence` | goal 模式子 Agent 的完成证据门控 |
| **hol-guard** | 1 安装 | `dsh plugin --profile web add github:hashgraph-online/hol-guard#path:tests/fixtures/deepseek-harness-good` | 运行时安全防护：阻止危险工具/密钥访问/恶意包 |

---

## 八、文档处理与办公

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-office** (omdsh-dev) | 5 安装 | `dsh plugin --profile web add @huiliyi37/dsh-office` | 办公三件套：生成/读取/编辑 .xlsx 电子表格、PDF、.pptx 演示文稿 |
| **dsh-docs** | 2 安装 | `dsh plugin --profile web add dsh-doc` | 全本地文档智能：解析 PDF/Office/图片/扫描件，支持离线 OCR |
| **dsh-plugin-text-translation** | dshfind 收录 | `dsh plugin --profile web add github:1738348785/dsh-plugin-text-translation` | 文本与文档本地化：标签保护抽取+批量分片+无损装配（游戏脚本+长文档） |
| **dsh-tool-hongtou** | 2 安装 | `dsh plugin --profile web add dsh-tool-hongtou` | 会话上下文→标准红头公文（Word 2003 XML），LLM 结构化提纲+确定性模板渲染 |
| **dsh-plugin-tavily** | dshfind 收录 | `dsh plugin --profile web add github:1624318455/dsh-plugin-tavily` | Tavily 网页搜索 Provider，在设置页注册卡片 |

---

## 九、设计、图表与创意产出

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **archify** (tt-a1i) | 162 安装 | `dsh plugin --profile web add @tt-a1i/archify-dsh` | 架构/流程/时序/数据流图表生成技能，输出带动效自包含 HTML。51.3k stars |
| **open-design** (nexu-io) | 73 安装 | `dsh plugin --profile web add github:nexu-io/open-design#path:packages/dsh-runtime` | 把 DSH 变成本地优先设计引擎：原型/落地页/仪表盘/幻灯片/图片/视频，导出 HTML/PDF/PPTX/MP4。94.5k stars |
| **dsh-mermaid** | 2 安装 | `dsh plugin --profile web add dsh-mermaid` | 在 DSH Web 会话中把 Mermaid 代码块渲染为 SVG 图表 |
| **dsh-design-skills** | 2 安装 | `dsh plugin --profile web add github:zhaiyateng/dsh-design-skills` | 6 种设计美学风格包：dark-saas/apple-minimal/neo-neumorphism/brutalism/glassmorphism/japanese-minimal |
| **dsh-blender** | 2 安装 | `dsh plugin --profile web add dsh-blender` | Blender 3D 生产：30 建模 Skill + 13 运行时工具 + 26 确定性 Helper |
| **reactive-resume** (amruthpillai) | 51 安装 | `dsh plugin --profile web add dsh-plugin-reactive-resume` | 隐私优先可定制简历构建器，安全编辑+导出。42.3k stars |

---

## 十、上下文管理与压缩（省 token、防膨胀）

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-context** ✅已装 | 41 安装 | — | 上下文洞察面板（你已安装，热门第 1） |
| **billion-context-dsh** | 4 安装 | `dsh plugin --profile web add billion-context-dsh` | 模型驱动主动上下文修剪（ACP），模型自行决定何时压缩什么，含 compress/decompress/search_context 工具 |
| **dsh-compaction-instant** | 2 安装 | `dsh plugin --profile web add dsh-compaction-instant` | 免 LLM 的无损对话压缩引擎，省 token 不丢内容 |
| **dsh-premise-guard-cn** | dshfind 收录 | `dsh plugin --profile web add github:111111AAA111111/dsh-premise-guard-cn` | 创作小说时防上下文压缩丢失关键锚点（中文引号/书名号/术语链），丢失时自动报警 |

---

## 十一、消息通知与 IM 集成（人不在电脑前也能协作）

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-im** (xmanrui) | 52 安装 | `dsh plugin --profile web add @xmanrui/dsh-im` | 扫码/凭据接入 8 大 IM：飞书/微信/钉钉/企业微信/QQ/Telegram/Discord/WhatsApp。1.2k stars |
| **dsh-dingtalk** | 2 安装 | `dsh plugin --profile web add @dingtalk-real-ai/dsh-dingtalk` | 官方钉钉连接器 |
| **dsh-feishu** | dshfind 收录 | `dsh plugin --profile web add github:0x0101010/dsh-feishu` | 飞书长连接频道插件，零 npm 依赖 |
| **dsh-discord-richpresence** | dshfind 收录 | `dsh plugin --profile web add github:0QwQ0/dsh-discord-richpresence` | 推送 DSH 交互状态到本地 Discord Rich Presence |
| **dsh-approval-assistant** | dshfind 收录 | `dsh plugin --profile web add github:0neKbyte/dsh-approval-assistant_0neKbyte` | 审批+问答+完成提醒：浏览器/系统通知/弹窗，可自拟音效 |

---

## 十二、UI 增强与交互体验

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-better-sidebar** ✅已装 | 93 安装 | — | 侧边栏完整工作台（你已安装，热门第 1） |
| **dsh-spotlight** | dshfind 收录 | `dsh plugin --profile web add github:0xsline/dsh-spotlight` | 键盘优先命令面板 |
| **dsh-esc-stop** | dshfind 收录 | `dsh plugin --profile web add github:142475/dsh-esc-stop` | 按 Esc 停止生成（等同停止按钮） |
| **dsh-web-restart** | dshfind 收录 | `dsh plugin --profile web add github:1123762794/dsh-web-restart` | 侧边栏一键重启 Web 进程按钮 |
| **dsh-workspace-menu** | dshfind 收录 | `dsh plugin --profile web add github:0imzero/dsh-workspace-menu` | 工作区/会话增强菜单：置顶/重命名/文件管理器打开/归档/fork/复制/新窗口 |
| **dsh-prompt-boost** | dshfind 收录 | `dsh plugin --profile web add github:060625dfy/dsh-prompt-boost` | 模型选择器旁 ✨ 按钮一键把想法改写为高质量提示词，↩ 撤销恢复原文 |
| **dsh-prompt-polish** | dshfind 收录 | `dsh plugin --profile web add github:1321928757/dsh-prompt-polish` | 6 策略×3 语言一键重写草稿，含确认弹窗+最近 5 次历史 |
| **dsh-question-composer** | dshfind 收录 | `dsh plugin --profile web add github:1479650473/dsh-question-composer` | 增强版 ask_user_question：批量标签页/数字键回答/确认摘要/计划审查决策卡 |
| **dsh-todo-panel** | dshfind 收录 | `dsh plugin --profile web add github:1479650473/dsh-todo-panel` | 持久化待办面板：头部开关打开浮窗任务面板（读取 todos 投影） |
| **dsh-composer-expand** | dshfind 收录 | npm: `dsh-composer-expand` | 输入框 ⬆/⬇ 按钮展开为 70vh 高写作视图 |
| **dsh-voice-input** | dshfind 收录 | `dsh plugin --profile web add github:0nt-one/dsh-voice-input` | 麦克风按钮语音转文字（Web Speech API），零依赖，支持语言切换+自动发送 |
| **dsh-plugin-tts** | dshfind 收录 | `dsh plugin --profile web add github:1624318455/dsh-plugin-tts` | Edge TTS 语音朗读助手回复，免费无 API Key |
| **dsh-strata** | 1 安装 | `dsh plugin --profile web add dsh-strata` | 滚动条变为按比例缩放、颜色编码的会话地图，支持点击定位 |
| **dsh-turn-delete** | 4 安装 | `dsh plugin --profile web add dsh-turn-delete` | 从会话中删除单个完整轮次而不删整个会话 |
| **dsh-EasyRewrite** | 5 安装 | `dsh plugin --profile web add dsh-easyrewrite` | 最无感的消息重编辑插件，原版体验，兼容性强 |
| **dsh-session-manager** | 5 安装 | `dsh plugin --profile web add dsh-session-manager` | 聊天会话管理：创建/切换/删除 |
| **dsh-gzip** | dshfind 收录 | `dsh plugin --profile web add github:040822/dsh-gzip` | 压缩 API 响应降带宽，解决低速网络历史加载失败 |

---

## 十三、Git 与代码理解

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-git-graph** | dshfind 收录 | `dsh plugin --profile web add github:1841220388zzzcccxxx-star/dsh-git-graph` | 嵌入式 Git 仓库图谱：提交历史图/分支过滤/文件 diff/未提交改动 |
| **dsh-better-edit** | 2 安装 | `dsh plugin --profile web add dsh-better-edit` | 哈希锚点文件 read/edit/batch_edit/undo_last_edit 工具 |
| **dsh-plugin-codegraph** | 2 安装 | `dsh plugin --profile web add dsh-plugin-codegraph` | 代码图工具：tree-sitter 索引定位符号声明/调用方/影响范围 |
| **dsh-scrape-webpage** | dshfind 收录 | npm: `dsh-scrape-webpage` | 网页读取插件 |

---

## 十四、配置管理与迁移

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-config-manager** | 4 安装 | `dsh plugin --profile web add dsh-config-manager` | 备份/导出/导入/迁移 DSH 配置，双面 Cordis 插件（Host+Web UI），任意机器一键恢复 |
| **dsh-plugin-manager** | 43 安装 | `dsh plugin --profile web add @linxin666/dsh-client-ui-plugin-manager` | 客户端插件管理：安装/启用/移除扩展 |
| **dsh-mcp-panel** | 4 安装 | `dsh plugin --profile web add dsh-mcp-panel` | 官方 MCP 客户端只读管理面板：连接状态/已注册工具/错误/重连计数 |
| **dsh-skills-mcp-manager** | 2 安装 | `dsh plugin --profile web add @zebbkira/dsh-skills-mcp-manager` | 设置页"技能与 MCP"卡片，浏览器里管理技能与 MCP 服务器 |
| **dsh-skill-mcp-panel** | 5 安装 | `dsh plugin --profile web add github:Fishquito7/dsh-skill-viewer` | 技能管理区：热启停/删除/新增技能 |

---

## 十五、远程访问与移动端

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-bridge** | 1 安装 | `dsh plugin --profile web add @wenbin_wb/dsh-bridge` | 多通道远程访问：局域网二维码/Cloudflare 隧道/自建 WebSocket 隧道 |
| **dsh-mobile** | 1 安装 | `dsh plugin --profile web add dsh-mobile` | 认证的 Android 和移动浏览器访问官方 Web UI |
| **dsh-remote-web-gateway** | 1 安装 | `dsh plugin --profile web add dsh-remote-web-gateway` | 移动设备二维码配对远程访问，安全登录+设备授权 |
| **dsh-tunnel-qr-plugin** | dshfind 收录 | `dsh plugin --profile web add github:13323232dong/dsh-tunnel-qr-plugin` | 免费公网隧道：一次性安全密钥二维码自动登录，支持定时刷新 |

---

## 十六、皮肤与趣味（你已装 dream-skin，可继续扩展）

| 插件 | 安装量 | 安装命令 | 说明 |
|------|--------|----------|------|
| **dsh-neo-skin** | dshfind 收录 | `dsh plugin --profile web add github:0nt-one/dsh-neo-skin` | Neo-brutalism 皮肤：硬边框、高对比，两套配色（Blue Command/Aged Newspaper） |
| **dsh-black-whale** | dshfind 收录 | `dsh plugin --profile web add github:147228/dsh-black-whale` | 黑鲸实验室主题 |
| **dsh-whale-widget** | 67 安装 | `dsh plugin --profile web add dsh-whale-widget` | 右下角小鲸鱼娘盯账户余额，QQ 弹弹，拖拽吸附+数字滚动动画 |
| **dsh-pet** | 5 安装 | `dsh plugin --profile web add dsh-pet` | 桌宠：25 组透明动画、屏幕漫游、点击互动与拖拽 |
| **dsh-gomoku** | 2 安装 | `dsh plugin --profile web add @yejiming/dsh-gomoku` | 和 AI 下五子棋，也可让 AI 对局比棋力 |
| **dsh-whale-galgame** | 2 安装 | `dsh plugin --profile web add dsh-whale-galgame` | 跨会话 Galgame 引擎，多角色模型娘 |

---

## 🎯 针对你的本地环境的首选推荐

基于你当前已装插件组合（侧边栏工作台 + 上下文洞察 + 皮肤壁纸 + 代码美化）和 settings.yaml 配置（soappig/sensenova 多模型），以下是**最值得优先安装的 8 个**：

### 必装（补齐核心能力缺口）
1. **`@openviking/dsh-memory-plugin`** — 跨会话长期记忆，你现在完全没有，火山引擎出品质量有保障
2. **`@liustack/modlens`** — 给纯文本模型视觉能力，你用的 glm-5.2 可借此看图
3. **`dsh-cost-meter`** — 你有多 provider 多模型，需要统一费用监控与峰谷计价
4. **`dsh-config-manager`** — 你配置复杂（多 provider/多模型/多插件），必须能备份迁移

### 强烈推荐
5. **`@wxg-prc-cpg/browser-skill-dsh-plugin`**（腾讯 BrowserSkill）— 让 Agent 操控真实浏览器，大幅扩展能力边界
6. **`@nanmicoder/dsh-agent-teams`** — 多智能体团队，复杂任务并行处理
7. **`dsh-llm-ollama`** — 接入本地 Ollama，离线也能用，零成本备用模型
8. **`dsh-codex-approval`** — 你当前 approval policy 是 ask，这个能自动化审批流程

### 一键批量安装命令

```powershell
dsh plugin --profile web add @openviking/dsh-memory-plugin
dsh plugin --profile web add @liustack/modlens
dsh plugin --profile web add dsh-cost-meter
dsh plugin --profile web add dsh-config-manager
dsh plugin --profile web add @wxg-prc-cpg/browser-skill-dsh-plugin
dsh plugin --profile web add @nanmicoder/dsh-agent-teams
dsh plugin --profile web add github:1035041186/dsh-llm-ollama
dsh plugin --profile web add dsh-codex-approval
```

---

## 📌 安装后须知

- 安装后需在 `~/.dsh/profiles/web/package.json` 或 `desktop/package.json` 的 `dsh.profile.bundles` 中确认插件已注册（`dsh plugin add` 会自动处理）
- 客户端插件（client inject 类）改动需要 `pnpm run dev:web` 热更新或刷新页面才生效
- Host 侧插件安装后可能需要重启 Web 进程（可用 `dsh-web-restart` 插件一键重启）
- 部分插件需要配置 API Key 或额外依赖（如 Ollama 需本地运行 Ollama 服务），详见各插件 README
