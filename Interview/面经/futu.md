# futu

## 2026-2-4

### http协议知道多少？http2 ，http3有了解过吗

#### 基础

1. 协议本质
   无状态协议：每次请求独立，服务器不保留上下文（通过Cookie/Session模拟状态）
   应用层协议：基于TCP（HTTP/1/2）或UDP（HTTP/3）的请求-响应模型
   明文传输（HTTP） vs 加密传输（HTTPS = HTTP + TLS）

##### http1 特点

1. 持久连接Connection: keep-alive 复用TCP连接
2. ETag/Last-Modified + Cache-Control 缓存控制
3. 无连接：每个请求完成后立即关闭连接

- 关键痛点：队头阻塞（HOL Blocking）
  单TCP连接中，前一个请求未完成时，后续请求必须等待（即使资源已就绪）

##### HTTP/2 特点

核心改进（基于TCP + TLS强制加密）

多路复用 单TCP连接承载多流（Stream），帧带Stream ID 彻底解决应用层队头阻塞
头部压缩 HPACK算法（静态/动态字典+Huffman编码） 头部体积减少80%+（尤其对移动端）

- 未解决的问题
  TCP层队头阻塞：单个TCP包丢失 → 整个连接暂停重传（影响所有Stream）
  连接建立开销：TLS 1.2需2-RTT（TLS 1.3优化至1-RTT）

##### HTTP/3 特点

传输层重构 QUIC协议替代TCP
HTTP/1.1（应用层堵）→ HTTP/2（TCP层堵）→ HTTP/3（彻底无堵）

🌐 三版本速记表
| 版本 | 传输层 | 核心突破 | 致命短板 | 记忆关键词 |
|------|--------|----------|----------|------------|
| HTTP/1.1 | TCP | 持久连接 | 串行请求，应用层队头阻塞 | `Keep-Alive` |
| HTTP/2 | TCP+TLS | 多路复用（单连接并发） | TCP丢包→全连接阻塞 | `二进制帧` |
| HTTP/3 | QUIC (UDP+TLS1.3) | 流级独立（丢包只影响单流） | 防火墙可能拦截UDP | `无缝切换网络` |

💡 3句口诀秒记
1.1堵在请求（串行等响应）
2.0堵在TCP（丢1包，全流停）
3.0堵不住（QUIC流独立 + 0-RTT快连）

### react vue 区别,能简单说说吗

| 维度     | React                                 | Vue                                                           |
| -------- | ------------------------------------- | ------------------------------------------------------------- |
| 核心理念 | “库”：专注视图层，生态自由组合        | “框架”：渐进式全家桶（Router/Vuex/Pinia）                     |
| 写法     | JSX（JS+HTML融合），逻辑视图一体      | 模板语法（HTML-like），逻辑视图分离（Composition API可选JSX） |
| 响应式   | 手动触发更新（`setState`/`useState`） | 数据劫持（Proxy），改数据→自动更新                            |
| 学习曲线 | 概念多（JSX/Hooks/生态选型）          | 模板直观，文档友好，上手更快                                  |
| 更新优化 | 需手动优化（`React.memo`）            | 编译时+运行时自动优化（细粒度更新）                           |
| TS支持   | 社区完善                              | Vue 3原生TS重写，体验更丝滑                                   |

### 为什么hook不能用在if 判断语句中

```js
// 每个组件实例维护一个 Hook 链表
fiber.memoizedState = {
  baseState: 0, // count 的状态
  next: {
    baseState: "", // name 的状态
    next: null,
  },
};

// 渲染时匹配逻辑
function useState(initial) {
  const hookIndex = currentHookIndex++; // 每次调用自增
  const hook = getHookByIndex(hookIndex); // 按索引取节点

  if (isFirstRender) {
    hook.memoizedState = initial; // 首次创建
  }
  return [hook.memoizedState, dispatch];
}
```

关键：hookIndex 是唯一关联依据！

❌ 条件改变 → 索引错位 → 状态张冠李戴
a b c hook ，第二次更新渲染 b 没有执行，hook c 按照hookIndex就拿到了b的hook 导致状态错误

### vite冷启动为什么这么快

- webpack 是全量打包包括nodemodule依赖 vite 预构建依赖 不打包

为什么不打包

- ESM 支持
- esbuild 预构建
- 按需编译 浏览器只编译加载所需要的js
- 智能缓存 预构建结果存 .vite/deps，依赖不变直接复用

### Content-Type

决定内容解析 ，告诉对方 “内容是什么类型”，指导如何解析

### Keep-Alive

复用TCP连接，避免每次请求重建连接（减少握手开销）
HTTP/1.1默认生效，框架/服务器已优化

### 预检请求（Preflight Request）

什么情况会触发

- PUT/DELETE
- Content-Type: application/json
- 自定义头（如 Authorization: Bearer xxx）

为什么要有预检请求---保护服务器免受未知跨域风险 为了安全
防止CSRF攻击，恶意请求预检会被服务器拒绝
浏览器对 “非简单请求”（可能对服务器数据产生较大影响的请求）会格外谨慎

### 能说一下pnpm吗 为什么pnpm这么快，解决了yarn npm的什么问题

本质
**pnpm = 全局仓库 + 硬链接 + 严格依赖树**

一个全局仓库，相同的包只存一份，有就不需要下载，不像npm每次都下载一份新的
npm是复制文件到nodemodule，pnpm 通过软硬连接到nodemodule 更快

#### 幽灵依赖

npm/yarn 的 hoisting 机制

- 会把全部依赖扁平化，因此可能会出现一些依赖没有在package json声明的却能使用（隐患就是哪天a库升级，删掉了隐藏的b库，而代码依赖b库就会运行失败）

pnpm 的根治方案：物理隔离 + 严格沙箱 通过文件系统结构物理阻断访问

pnpm 的node module三层结构

```text

.pnpm/
├── react@18.2.0/
│   └── node_modules/
│       ├── react → <store>/react
│       └── scheduler → ../../scheduler@0.23.0/node_modules/scheduler
├── scheduler@0.23.0/
│   └── node_modules/
│       └── scheduler → <store>/scheduler
└── ...

```

1. 项目根目录 node_modules（第一层）

   只包含直接依赖的软链接：如 react → .pnpm/react@18.2.0
   无扁平化 hoisting：不会将间接依赖提升到根目录
   作用：提供项目代码可直接访问的入口

2. .pnpm 目录（第二层，虚拟存储）

   内部局部扁平化，方便软链接复用同版本包，节省空间，但依然依赖隔离，不会把隐式依赖暴露到根目录 node_modules
   如axios，除了自身直接依赖，可能会加上dependencies里的包，在.pnpm软连接加进来供axios正常运行,但依旧是这些依赖依然隔离在.pnpm

3. 全局存储 ~/.pnpm-store（第三层）

   内容寻址存储：按文件内容哈希存储，相同内容只存一份
   硬链接机制：.pnpm 中的文件通过硬链接指向全局存储
   磁盘优化：10 个项目使用相同包版本，仅存储 1 份物理文件

### vite怎么解决循环依赖

a引用b b引用a，顶层模块作用域直接打印这个变量，直接使用会出现变量未初始化报错
将公共的常量变量统一在一个文件导出，只有他导出给其他文件用，不含任何import
写依赖包时候，所有文件不允许直接通过入口文件路径import其他文件,容易循环依赖
a ==> index ==> b
a <== index <== b
