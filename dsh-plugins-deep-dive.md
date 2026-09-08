# DSH 插件深度推荐 — 记忆/知识库 · 视觉能力 · 浏览器/电脑控制

> 数据来源：dshfind.com（9922+ 插件）与 deepseek1024.com（按安装量排序）两大官方市场 API
> GitHub README 实读。生成时间：2026-09-07

---

## 一、记忆与知识库（让 Agent 拥有跨会话长期记忆）

你现在 DSH 没有任何跨会话记忆能力——每次开新会话，Agent 都是"失忆"的。这是最值得增强的方向。

---

### 1.1 OpenViking（火山引擎）— 上下文数据库，Agent 的"虚拟文件系统"

| 维度 | 数据 |
|------|------|
| GitHub stars | **35,836** ⭐ |
| DSH 安装量 | 284（30天内，增长 7322） |
| npm 包名 | `@openviking/dsh-memory-plugin` |
| 安装命令 | `dsh plugin --profile web add @openviking/dsh-memory-plugin` |
| 许可证 | AGPLv3（开源版功能完整不阉割） |
| 仓库 | https://github.com/volcengine/OpenViking |

**它是什么**

OpenViking 是火山引擎开源的 AI Agent 上下文数据库。它把记忆、资源和技能统一存储在一个 `viking://` 虚拟文件系统下，Agent 像浏览文件系统一样用 `ls`、`tree`、`find` 浏览自己的上下文，而不是查一个黑盒向量库。

**核心机制**

- **三层加载省 token**：每条内容写入时自动处理为 L0（一句摘要，~100 token）、L1（概览，~2k token）、L2（完整原文）。按需加载，只在任务需要时才读深层 → [架构](https://docs.openviking.ai/en/concepts/03-context-layers)
- **目录递归检索**：向量搜索先定位最高分目录，再逐层下钻，结果自带周围上下文 → [检索](https://docs.openviking.ai/en/concepts/07-retrieval)
- **可观测检索**：每次查询保留目录浏览轨迹，结果出错时能追溯到是哪条路径导致的
- **会话即记忆**：会话提交后，异步提取用户偏好和 Agent 经验为长期记忆

**效果验证（官方 benchmark）**

- 用户记忆（LoCoMo）：接入 OpenViking 后三个 Agent 准确率都到 80–83%，原生只有 24–57%；输入 token 降 34.3–91.0%，查询延迟降 58.45–66.10%
- Agent 经验（tau2-bench）：经验记忆让任务成功率 +6.87pp（零售）/ +11.87pp（航空）

**快速启动**

```bash
pip install openviking --upgrade
openviking-server init      # 交互式配置向导：provider、model、ov.conf
openviking-server doctor    # 验证配置
openviking-server           # 启动服务
```

支持火山引擎、OpenAI、Codex OAuth、Kimi、GLM、本地 Ollama 作为 provider。安装即含 `ov` CLI 客户端。

**DSH 集成**：通过 `@openviking/dsh-memory-plugin` 注入，Agent 会话中自动召回相关记忆并提交会话记忆。

**适合你的理由**：你有多个 provider（soappig/sensenova），OpenViking init 向导能直接配置这些 provider；你做 JavaScript30 练习项目，项目级记忆能让 Agent 跨会话记住你的代码风格和进度。

---

### 1.2 Hindsight（vectorize.io）— 可学习的 Agent 记忆

| 维度 | 数据 |
|------|------|
| GitHub stars | **23,003** ⭐ |
| DSH 安装量 | 106 |
| npm 包名 | `@vectorize-io/hindsight-coding-agents` |
| 安装命令 | `dsh plugin --profile web add @vectorize-io/hindsight-coding-agents` |
| 许可证 | MIT |
| 仓库 | https://github.com/vectorize-io/hindsight |

**它是什么**

Hindsight 不是简单的对话历史回忆——它专注于让 Agent **学习**而非仅**记忆**。在 LongMemEval benchmark 上达到 state-of-the-art 性能，已被弗吉尼亚理工大学和华盛顿邮报独立复现。

**核心概念**

- **四种记忆类型**：世界事实（"炉子会烫"）、经验（"我碰了炉子很疼"）、观察（从多条记忆归纳出的有证据支撑的信念）、心智模型（对世界的习得理解）
- **三大操作**：
  - `retain` — 存入新记忆，LLM 提取关键事实/时间/实体/关系，规范化后入存储
  - `recall` — 4 种并行检索策略：语义向量 + BM25 关键词 + 实体/时序/因果图 + 时间范围，结果用倒数排名融合 + 重排模型排序
  - `reflect` — 深度分析已有记忆，形成新连接、建立更完整理解（如"为什么某些外联消息收到了回复"）
- **观察会自我精炼**：相关事实在后台合并为去重信念，保留支撑证据和证明计数，新证据到来时**增强/弱化/扩展**而非覆盖
- **知识页**：活文档——bank 写关于自己的文章，像 wiki 一样组织，可投影为 markdown。定义一个问题，bank 自动写答案并持续更新

**编码 Agent 专属能力**

```bash
npx @vectorize-io/hindsight-coding-agents install all
```

一条命令为检测到的所有 CLI 编码 Agent 配置长期项目记忆：从 git 历史和过往会话自动构建 per-repo 记忆库，Agent 启动时注入。**官方明确支持 DeepSeek Harness。**

**部署方式**：Docker（推荐）、pip 裸金属、Kubernetes Helm、或 Hindsight Cloud 托管。支持 25+ LLM provider 包括本地 Ollama。

**适合你的理由**：你有 Windows 环境，Hindsight Windows x64 完全支持（Docker/pip/嵌入式数据库都行）；它的 LLM Wrapper 只需 2 行代码就能给现有 Agent 加记忆，也可以用 Python 嵌入式无需起服务。

---

### 1.3 其他记忆/知识库插件速览

| 插件 | 安装量 | 安装命令 | 一句话定位 |
|------|--------|----------|-----------|
| **dsh-weknora**（腾讯） | 38 | `dsh plugin --profile web add @wxg-prc-cpg/dsh-weknora` | 把原始文档变可查询 RAG + 自主推理 Agent + 自维护 Wiki。21.6k ⭐ |
| **dsh-memory-toolkit** | dshfind 收录 | `dsh plugin --profile web add dsh-memory-toolkit`（GitHub: 123caiji） | 跨会话知识图谱记忆 + 五层 token 节省编排 |
| **dsh-auto-memory** | dshfind 收录 | `dsh plugin --profile web add dsh-auto-memory`（GitHub: 1304836815） | 会话级：收尾提醒 + MEMORY.md 索引 + 对话日志 + LLM 摘要压缩。轻量，零外部依赖 |
| **dsh-project-memory** | dshfind 收录 | npm: `@yolk_vat-y/dsh-project-memory` | 读取时项目记忆，专注单个项目上下文 |
| **dsh-knowledge** | 2 | `dsh plugin --profile web add dsh-knowledge` | 知识库 & RAG：分块、本地嵌入、混合搜索、管理面板 |
| **memos-local-plugin**（MemTensor） | 4 | `dsh plugin --profile web add @memtensor/memos-local-plugin` | 持久化自进化记忆，混合检索+跨任务技能复用。11.2k ⭐ |

**记忆类选型建议**：

| 需求 | 推荐 |
|------|------|
| 最强、最全面、企业级 | **OpenViking**（三层加载+可观测检索+benchmark 验证） |
| 让 Agent 真正"学习"而非仅"记忆" | **Hindsight**（reflect 操作+观察自我精炼） |
| 轻量、零外部依赖、快速上手 | **dsh-auto-memory**（MEMORY.md + 摘要压缩） |
| 把文档变成可查询知识库 | **dsh-weknora**（腾讯 RAG+Wiki）或 **dsh-knowledge** |

---

## 二、视觉能力（给纯文本模型加上"眼睛"）

你用的 glm-5.2 / deepseek-v4-flash 等模型是纯文本模型，无法直接看图。以下插件能补足这个能力缺口。

---

### 2.1 ModLens（liustack）— DSH 视觉插件能力最强

| 维度 | 数据 |
|------|------|
| GitHub stars | **3,896** ⭐ |
| DSH 安装量 | 141 |
| npm 包名 | `@liustack/modlens` |
| 安装命令 | `dsh plugin --profile web add @liustack/modlens` |
| 许可证 | MIT |
| 仓库 | https://github.com/liustack/modlens |
| dshfind 评分 | 🥇 "The most capable vision plugin for DSH" |

**它是什么**

ModLens 是一个即插即用的视觉引擎，给纯文本模型加上看图能力。**直接在聊天里粘贴图片**（Ctrl+V），不需要先存文件再传路径。它自动发现每个携带纯文本模型的 provider 路由，为每条路由添加一个 `(modlens vision)` 变体。你的 `deepseek-v4-flash` 会变成 `DeepSeek-V4-Flash (modlens vision)`。

**十个视觉来源 + 故障转移链**

不依赖单一视觉服务，10 个来源构成故障转移链——快速 API 先试，Agent CLI 后备，第一个好结果胜出：

| Provider | 需要 | 速度 |
|----------|------|------|
| `gemini-api` | 免费 Gemini API Key（3 分钟，无需信用卡） | 5-10s（推荐默认） |
| `openai` | 任何 OpenAI 兼容端点（key+baseUrl+model） | 5-10s |
| `anthropic` | Anthropic API Key | 5-10s |
| `antigravity-cli` | 免费 `agy` CLI，浏览器登录一次，无需 key | 15-45s |
| `claude-cli` | 已登录的 Claude Code | 20-45s |
| `kimi-cli` | 已登录的 Kimi Code | 20-45s |

`openai` 是通用插座——任何 OpenAI chat-completions 协议+图片输入的端点都能接入：qwen-vl、GLM、SiliconFlow、OpenRouter、自托管 vLLM/Ollama。

**证据而非想象**

ModLens 不生成泛泛描述，而是输出：完整转录、阅读顺序布局区域、实体和关系列表。模型引用具体细节。

**实测演示**（README 实读）：
- 推文截图：读出作者、文案、照片内容、时间戳、每个互动数字（5.4M views, 1.6K replies, 5.7K reposts, 116K likes）
- 128 个 AI 模型散点图：读出双轴、对数刻度、颜色编码、高亮区域、每个 DeepSeek 模型虚线标记
- 三张图同时粘贴：逐张读取，发现属于同一视觉家族，描述各自内容风格

**安装后配置**：设置 → Plugins → Plugin config 中有 ModLens 卡片，切换引擎、勾选 auto 模式可复用的本地 CLI，保存即生效。

---

### 2.2 DSH Vision Toolkit（Anionex）— 10 个工具的完整视觉工作流

| 维度 | 数据 |
|------|------|
| GitHub stars | 855 ⭐ |
| DSH 安装量 | 32 |
| npm 包名 | `@anionex/dsh-vision-toolkit` |
| 安装命令 | `dsh plugin --profile web add @anionex/dsh-vision-toolkit` |
| dshfind 评分 | **94 分——最高评分插件** |
| 仓库 | https://github.com/Anionex/dsh-vision-toolkit |

**它是什么**

不只是看图问答——而是一套完整的视觉任务工作流。粘贴图片后自动切换到 `(Vision Toolkit)` 模型变体，附带 `vision-skills` Skill 教 Agent 何时用哪个工具、按什么顺序、如何验证结果。

**10 个工具**

| 工具 | 回答的问题 | 主要输出 |
|------|-----------|---------|
| `vision_glance` | "这张图里发生了什么？" | 聚焦答案、描述、OCR 或多图比较 |
| `vision_ground` | "我要的东西在哪？" | 原始像素坐标 + 可选框选预览 |
| `vision_detect` | "有哪些按钮/图标/元素？" | 编号元素清单+坐标+预览 |
| `vision_crop` | "把这块区域提取出来" | PNG/JPEG 裁剪 |
| `vision_trace` | "把这个形状变成可编辑矢量" | SVG |
| `vision_pixel_diff` | "实现和参考的差异在哪？" | 差异百分比+排名区域+热力图+JSON |
| `vision_long_screenshot_ocr` | "读取整张长截图" | Markdown+分块+清单+审计输出 |
| `vision_extract_foreground` | "去掉背景抠主体" | 透明 PNG |
| `vision_dominant_colors` | "这块区域主色是什么？" | 色板/排名候选色 |
| `vision_html_screenshot` | "按精确视口渲染本地页面" | PNG + CSS pageHeight |

**5 个实战 Playbook**（Agent 学到的完整工作流）

1. **长截图 OCR**：找低内容切割带→逐块 OCR→保留聊天说话者/时间戳/引用→只合并重复重叠→暴露风险边界供验证
2. **截图转 UI**：先复用项目组件和资产→结合代码原生 UI+提取视觉+渲染截图+视觉比较→对齐页面
3. **图标/Logo 还原**：从源图提取透明 PNG，或重建可编辑/可缩放 SVG，验证形状/颜色/alpha 边
4. **草图/白板转结构代码**：恢复节点/标签/连接/方向为 Mermaid/Graphviz
5. **GUI 截图操作**：定位控件→执行一个动作→再截图→验证结果状态→继续

**任务感知描述**：不是泛泛描述图片，而是恢复"Agent 为什么要看这张图"——用户消息或模型陈述的原因变成 focus hint 传给视觉模型，输出强调当前步骤最关键的信息，token 更少、准确率更高。

**安装注意**：首次启动准备隔离运行时——优先用系统 Python 3.11+，没有则自动下载约 35MB 的独立 Python（腾讯云镜像优先，GitHub 回退）。DSH Desktop 用户应从托盘打开 DSH Terminal 执行安装命令。

---

### 2.3 dsh-vision-router — 内置免 Key 视觉链 + 像素级工具

| 维度 | 数据 |
|------|------|
| DSH 安装量 | 42 |
| 安装命令 | `dsh plugin --profile web add dsh-vision-router` |
| GitHub stars | 1,078 ⭐ |
| 仓库 | https://github.com/ysr666/dsh-vision-router |

为纯文本 Agent 提供视觉能力：内置免 Key 视觉链 + 像素级视觉工具（看图问答、定位、裁剪、像素对比、取色、OCR、矢量化、抠图、截图）。粘贴图片即可用。适合不想配置 API Key 的用户。

---

### 2.4 其他视觉插件

| 插件 | 安装量 | 安装命令 | 定位 |
|------|--------|----------|------|
| **dsh-llm-vision** | dshfind 收录 | npm: `dsh-llm-vision` | 可靠视觉+OCR：describe_image(normal/critical)+extract_text 工具，自动预处理+重试+持久答案缓存 |
| **dsh-mindsee** | dshfind 收录 | npm: `dsh-mindsee` | 通过 MindSee 把截图/本地图片转文字让 DeepSeek 看图作答 |
| **dsh-video-lens** | 1 | `dsh plugin --profile web add dsh-video-lens` | 视频镜头能力，处理会话中的视觉内容 |

**视觉类选型建议**：

| 需求 | 推荐 |
|------|------|
| 最强看图能力、故障转移、多 provider | **ModLens**（10 来源链+证据输出+实测最强） |
| 不只看图——还要截图转 UI/草图转代码/像素 diff | **DSH Vision Toolkit**（10 工具+5 Playbook+任务感知） |
| 零配置免 Key 快速上手 | **dsh-vision-router**（内置免 Key 视觉链） |
| 两者组合最佳 | ModLens（看图问答）+ Vision Toolkit（视觉工作流），功能互补不冲突 |

---

## 三、浏览器与电脑控制（让 Agent 真正"动手"）

---

### 3.1 BrowserSkill（腾讯）— 让 Agent 操控你已登录的浏览器

| 维度 | 数据 |
|------|------|
| GitHub stars | **1,823** ⭐ |
| DSH 安装量 | 44 |
| npm 包名 | `@wxg-prc-cpg/browser-skill-dsh-plugin` |
| 安装命令 | `dsh plugin --profile web add @wxg-prc-cpg/browser-skill-dsh-plugin` |
| 许可证 | MIT |
| 仓库 | https://github.com/Tencent/BrowserSkill |

**它是什么**

腾讯出品的浏览器控制桥接。让 Agent 连接到你**已经登录的浏览器**——不需要单独的测试账号。Agent 要操作你已打开的标签页时，必须显式"借"那个标签，用完归还，其余浏览器不受影响。

**核心优势**

- **复用真实登录状态**：Agent 直接用你已登录的网站，不需要单独注册测试号
- **不中断你的工作**：浏览器任务运行在单独的、可见的 Agent Window 中，你继续用自己的浏览器
- **支持任何 Agent**：任何能调 shell 的 Agent 都能通过 `bsk` CLI 使用，不锁定特定模型/框架/harness
- **内置 human-in-loop**：遇到验证码/登录/确认对话框等人工步骤时，Agent 请你接管然后继续

**运行环境**：macOS（Apple Silicon + Intel）、Linux（x64 + ARM64）、Windows x64。Chrome 和 Edge 支持。

**架构**

```
Agent → bsk CLI → 本地 daemon → WebSocket(127.0.0.1) → 浏览器扩展 → Agent Window
```

Agent 从不直接和浏览器通信。它请求 `bsk` CLI 执行浏览器任务，本地 daemon 路由到扩展，扩展在 Agent Window 中执行。

**DSH 集成**：插件注入原生 `browser_*` 工具（不需要 shell 调 `bsk`），还有 Web UI 实时覆盖层显示每个 Agent Window。插件自带 skill，不需要额外 `bsk install-skill`。但 `bsk` CLI 和浏览器扩展仍是前置依赖。

**安装步骤**

```powershell
# 1. 安装 bsk CLI（Windows PowerShell）
irm https://raw.githubusercontent.com/Tencent/BrowserSkill/main/install.ps1 | iex

# 2. 从 Chrome Web Store 或 Edge Add-ons 安装浏览器扩展

# 3. 安装 DSH 插件
dsh plugin --profile web add @wxg-prc-cpg/browser-skill-dsh-plugin

# 4. 启动
dsh --profile web
```

---

### 3.2 dsh-computer-use-win — Windows 桌面控制（22 个工具）

| 维度 | 数据 |
|------|------|
| DSH 安装量 | 2 |
| 安装命令 | `dsh plugin --profile web add github:Yu-tao-Li/dsh-computer-use-win` |
| 许可证 | MIT |
| 仓库 | https://github.com/Yu-tao-Li/dsh-computer-use-win |

**它是什么**

给 DSH 装上 Windows 电脑操控能力——MCP stdio 服务器 + PowerShell/UIA 桌面引擎，22 个工具让 Agent 能**看**（UIA 无障碍树、窗口裁剪截图、OCR 词框）也能**做**（鼠标、键盘、UIA 语义动作、窗口管理）真实的 Windows 桌面应用。

**你是 Windows 环境，这个插件非常适合你。**

**22 个工具清单**（前缀 `mcp__wincu__`）

| 分组 | 工具 |
|------|------|
| 观察 | `health` · `snapshot`（树+截图）· `accessibility_tree` · `list_windows` · `find` · `element_info` · `ocr` |
| 动作 | `click` · `double_click` · `move` · `drag` · `scroll` · `type_text` · `keypress` · `focus` · `invoke` · `set_value` |
| 窗口 | `activate_window` · `move_window` · `close_window` · `wait_for` · `wait` |

**核心技术特点**

- **文本优先观察**：UIA 无障碍树三视图（control/content/raw），按 name/automationId/类名/值找控件，不靠猜像素。元素 id 用 UIA RuntimeId（UI 刷新后仍稳定，过期报 `stale` 而非点错地方）
- **三级截图链**：PrintWindow（非前台窗口也能抓）→ WGC（Windows.Graphics.Capture，DirectComposition/被遮挡窗口）→ 屏幕区域兜底
- **三条输入路径**：语义（UIA pattern，不碰鼠标）/ 前台（SetCursorPos+SendInput+剪贴板）/ 后台（PostMessage 直进窗口消息队列，不抢前台）
- **内置安全机制**：
  - 坐标 homing——观察后窗口被移动，点击自动补偿
  - 急停 failsafe——物理鼠标停屏幕角落 500ms，所有输入被拒（`EMERGENCY STOP`）
  - identity guard——按 windowTitle 操作时窗口 HWND/PID 变了就拒绝
  - 前台校验——目标窗口不是真前台就报错，绝不打进别的窗口
- **持久化后端**：一个常驻 PowerShell 进程 + JSON 行协议，热态延迟 6–100ms

**架构**：不改 DSH 本体，通过 `@deepseek-ai/dsh-mcp-client` 桥接，零运行时依赖。

---

### 3.3 其他浏览器/电脑控制插件

| 插件 | 安装量 | 安装命令 | 定位 |
|------|--------|----------|------|
| **dsh-ego-browser** | 5 | `dsh plugin --profile web add dsh-ego-browser` | 内置 ego-lite Chromium（给 AI Agent 用的浏览器），13 个结构化 ego_* 工具（语义快照/语义点击/表单填充/截图/CDP 控制/任务空间隔离），Linux+Chrome 开箱即用 |
| **dsh-browser** (wqty123) | 4 | `dsh plugin --profile web add dsh-builtin-browser` | 共享真实浏览器控制 |
| **dsh-playwright-browser** | 2 | `dsh plugin --profile web add dsh-playwright-browser` | Playwright 浏览器自动化，支持导航和交互 |
| **dsh-mac-control** | dshfind 收录 | `dsh plugin --profile web add github:18126295767-cell/dsh-mac-control` | macOS 原生浏览器+桌面控制（你用 Windows 不适用） |

**浏览器/控制类选型建议**：

| 需求 | 推荐 |
|------|------|
| 操控已登录的浏览器（最强通用方案） | **BrowserSkill**（腾讯，复用真实登录+不中断工作+human-in-loop） |
| 操控 Windows 桌面应用（非浏览器） | **dsh-computer-use-win**（22 工具+UIA 语义+三级截图+安全机制） |
| 内置浏览器不需装扩展 | **dsh-ego-browser**（自带 Chromium+13 个结构化工具） |
| 两者组合最佳 | BrowserSkill（浏览器内）+ dsh-computer-use-win（桌面应用），覆盖所有交互场景 |

---

## 🎯 针对你的环境的最终推荐

你的环境：Windows + DSH Desktop + soappig/sensenova 多 provider + glm-5.2 等纯文本模型 + 已装 dsh-context/dsh-better-sidebar 等

### 三方向各选一个首选

| 方向 | 首选 | 理由 |
|------|------|------|
| 记忆/知识库 | **OpenViking** | 35.8k⭐ 火山引擎出品，三层加载省 token，benchmark 验证准确率 80-83%，支持你的 provider |
| 视觉能力 | **ModLens** | 3.9k⭐ 安装量最高，10 来源故障转移链，粘贴即看图，支持 OpenAI 兼容端点接入你的 provider |
| 浏览器/控制 | **BrowserSkill + dsh-computer-use-win** | 腾讯出品操控浏览器 + 22 工具操控 Windows 桌面，两者组合覆盖所有交互 |

### 一键安装命令

```powershell
# 记忆/知识库
dsh plugin --profile web add @openviking/dsh-memory-plugin

# 视觉能力
dsh plugin --profile web add @liustack/modlens

# 浏览器控制（需先装 bsk CLI 和浏览器扩展，见上文 3.1 安装步骤）
dsh plugin --profile web add @wxg-prc-cpg/browser-skill-dsh-plugin

# Windows 桌面控制
dsh plugin --profile web add github:Yu-tao-Li/dsh-computer-use-win
```

### 安装后注意

1. **OpenViking** 需要额外 `pip install openviking` 并运行 `openviking-server init` 配置 provider
2. **ModLens** 安装后在 Settings → Plugins → Plugin config 的 ModLens 卡片配置视觉引擎（推荐免费 Gemini API Key，3 分钟搞定）
3. **BrowserSkill** 需要先装 `bsk` CLI（PowerShell 脚本）+ Chrome/Edge 扩展，插件才注入 `browser_*` 工具
4. **dsh-computer-use-win** 重启 `dsh web` 后工具以 `mcp__wincu__windows_computer_use_*` 出现，零运行时依赖
5. 所有插件安装后刷新页面；Desktop profile 用 DSH Terminal 执行安装命令
