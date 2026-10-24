// React 面试知识体系 —— 知识数据源（唯一内容来源）
// m: g=🟢已掌握 / y=🟡待巩固 / r=🔴待学习 ; v:1=待验证
// t: 节点名称 ; n: 一句话核心结论 ; k: 易错点 / 面试关键词

export const BRANCHES = [
  {
    id: 'b1', t: 'State 与组件更新', m: 'g',
    n: 'state 是快照，更新入队后统一处理',
    k: '本章主线：Snapshot → 闭包 → 队列 → 批处理',
    c: [
      { id: 'b1a', t: 'State Snapshot', m: 'g', c: [
        { id: 'b1a1', t: 'state 是 render 快照', m: 'g', n: '一次 render 内的 state 在此次 render 中不变', k: 'setState 不会立即改当前 render 的 state' },
        { id: 'b1a2', t: '闭包捕获本次快照', m: 'g', n: '每次 render 的函数都有独立闭包', k: 'Stale Closure 的根源' },
      ]},
      { id: 'b1b', t: '更新队列与批处理', m: 'g', c: [
        { id: 'b1b1', t: 'setState 只是入队', m: 'g', n: '更新先进队列，由 React 决定何时处理', k: '不是立即赋值' },
        { id: 'b1b2', t: '自动批处理', m: 'g', n: '同一次事件内的多次更新合并处理', k: 'React 18 起 Promise / setTimeout 也批处理' },
        { id: 'b1b3', t: '函数式更新', m: 'g', n: 'setX(x => x + 1) 基于队列前一项计算', k: '避免读到旧快照' },
      ]},
      { id: 'b1c', t: '闭包与旧值', m: 'g', c: [
        { id: 'b1c1', t: 'Stale Closure', m: 'g', n: '异步回调读到的是那次 render 的旧值', k: '事件监听 / 定时器 / 请求回调最常见' },
        { id: 'b1c2', t: '三种解法', m: 'g', n: '函数式更新 / useRef 存最新值 / 正确清理副作用', k: '按场景选，不是一律用 ref' },
      ]},
      { id: 'b1d', t: '受控与非受控', m: 'g', c: [
        { id: 'b1d1', t: '受控组件', m: 'g', n: '值由 state 驱动，React 实时掌握输入', k: '实时校验 / 格式化 / 禁用按钮才需要' },
        { id: 'b1d2', t: '非受控组件', m: 'g', n: 'DOM 自己维护值，通过 ref 读取', k: '简单表单更轻量' },
        { id: 'b1d3', t: '全受控≠性能问题', m: 'y', n: '取决于更新影响的 render 范围与单次成本', k: '拆分组件 / memo / 字段级订阅' },
      ]},
      { id: 'b1e', t: 'Props 与组件通信', m: 'g', c: [
        { id: 'b1e1', t: '单向数据流', m: 'g', n: '数据自上而下，事件回调向上', k: 'props 只读' },
        { id: 'b1e2', t: '状态提升', m: 'g', n: '多组件共享时把 state 提到共同父级', k: '就近原则，不要过早全局化' },
        { id: 'b1e3', t: '通信方式选择', m: 'y', n: 'props / 回调 / Context / 状态库各有适用面', k: '层级很深才考虑 Context' },
      ]},
      { id: 'b1f', t: 'useReducer', m: 'g', c: [
        { id: 'b1f1', t: '何时用 reducer', m: 'g', n: '多字段联动、状态转移复杂时更清晰', k: '不是 useState 的替代品' },
        { id: 'b1f2', t: 'dispatch 语义', m: 'g', n: '描述发生了什么，由 reducer 决定 state 变成什么', k: 'Effect 管何时请求，reducer 管变成什么' },
      ]},
      { id: 'b1g', t: '状态结构设计', m: 'y', c: [
        { id: 'b1g1', t: '避免冗余状态', m: 'y', n: '能算出来的不要单独存', k: '冗余状态必然带来同步 bug' },
        { id: 'b1g2', t: '派生数据直接算', m: 'g', n: '简单计算不需要 useMemo', k: '简单直接算 / 昂贵才 useMemo' },
        { id: 'b1g3', t: '不可变更新', m: 'g', n: '设置相同引用时 React 会跳过更新', k: 'memo / useMemo / Context 都依赖引用稳定' },
      ]},
    ]
  },
  {
    id: 'b2', t: 'Hooks 与副作用', m: 'g',
    n: 'Effect 负责与外部系统同步，不是生命周期',
    k: '本章主线：规则 → 依赖 → cleanup → 竞态',
    c: [
      { id: 'b2a', t: 'Hooks 规则', m: 'g', c: [
        { id: 'b2a1', t: '只在顶层调用', m: 'g', n: '不能在条件、循环、嵌套函数中调用', k: '本质是保证每次 render 的调用顺序稳定' },
        { id: 'b2a2', t: '只在函数组件或自定义 Hook 中', m: 'g', n: 'Hooks 依赖 React 的调度上下文', k: '普通函数里调用会报错' },
      ]},
      { id: 'b2b', t: 'useEffect 基础', m: 'g', c: [
        { id: 'b2b1', t: 'Effect 是同步外部系统', m: 'g', n: '不是生命周期，而是与外部系统的同步机制', k: '渲染产出 UI，Effect 同步外部' },
        { id: 'b2b2', t: '依赖数组语义', m: 'g', n: '依赖变化时才重新同步', k: '依赖要完整，不要骗 React' },
        { id: 'b2b3', t: 'setup 与 cleanup', m: 'g', n: 'cleanup 清理上一次建立的同步关系', k: '避免资源泄漏与重复订阅' },
        { id: 'b2b4', t: '执行时机', m: 'g', n: 'commit 之后、浏览器绘制之后执行', k: 'useLayoutEffect 才在绘制前' },
        { id: 'b2b5', t: '不能直接 async', m: 'g', n: '返回值专用于 cleanup，Promise 会被忽略', k: '需要 async 就在内部包一层再调用' },
        { id: 'b2b6', t: '避免不必要的 Effect', m: 'g', n: '能在 render 里算的不要放进 Effect', k: '没有外部系统就不需要 Effect' },
      ]},
      { id: 'b2c', t: '异步与请求竞态', m: 'g', c: [
        { id: 'b2c1', t: '请求竞态', m: 'g', n: '后发的请求可能先返回，覆盖更新结果', k: '切换 userId / 搜索联想场景' },
        { id: 'b2c2', t: 'cleanup 忽略过期结果', m: 'g', n: 'cleanup 中标记失效，避免写入旧结果', k: '最常用的解法' },
        { id: 'b2c3', t: 'AbortController 取消', m: 'g', n: '真正取消请求，节省带宽与解析成本', k: 'fetch 支持 signal' },
        { id: 'b2c4', t: '交给数据请求库', m: 'y', n: 'React Query 等内置竞态与缓存处理', k: '业务复杂时优先用库' },
      ]},
      { id: 'b2d', t: 'useRef', m: 'g', c: [
        { id: 'b2d1', t: '改 ref 不触发 render', m: 'g', n: '所有 render 与闭包共享同一个 ref 对象', k: '通过 ref.current 读最新值' },
        { id: 'b2d2', t: 'state vs ref', m: 'g', n: 'state 驱动 UI，ref 存不驱动 UI 的可变数据', k: '典型：DOM 节点 / 定时器 id' },
      ]},
      { id: 'b2e', t: 'useLayoutEffect', m: 'y', c: [
        { id: 'b2e1', t: '执行时机', m: 'y', n: 'DOM 更新后、浏览器绘制前同步执行', k: '会阻塞绘制' },
        { id: 'b2e2', t: '适用场景', m: 'y', n: 'DOM 测量后同步调整，避免视觉闪烁', k: 'tooltip 定位是典型例子' },
        { id: 'b2e3', t: '何时不该用', m: 'y', n: '普通副作用优先 useEffect', k: '耗时操作放这里会拖慢绘制' },
      ]},
      { id: 'b2f', t: '自定义 Hooks', m: 'y', c: [
        { id: 'b2f1', t: '设计原则', m: 'y', n: '复用逻辑，不共享状态', k: '每次调用都是独立 state' },
        { id: 'b2f2', t: '常见问题', m: 'y', n: '依赖不稳定、闭包、返回值每次新建', k: '返回值引用也要考虑稳定' },
      ]},
    ]
  },
  {
    id: 'b3', t: '渲染机制与 Fiber', m: 'g',
    n: 'Render 可中断，Commit 不可中断',
    k: '本章主线：render 原因 → Diff → key → Fiber 调度',
    c: [
      { id: 'b3a', t: '何时重新渲染', m: 'g', c: [
        { id: 'b3a1', t: 'render 的五个原因', m: 'g', n: '自身 state / 父 render / props / Context / 其他调度', k: '定位问题按这五条逐个排除' },
        { id: 'b3a2', t: '父 render 带动子 render', m: 'g', n: 'props 没变子组件也会参与 reconciliation', k: '只有 memo 才能跳过' },
      ]},
      { id: 'b3b', t: 'Render 与 Commit', m: 'g', c: [
        { id: 'b3b1', t: 'Render 阶段', m: 'g', n: '纯计算，可中断、可丢弃、可重做', k: '不要在这里做副作用' },
        { id: 'b3b2', t: 'Commit 阶段', m: 'g', n: '同步应用 DOM 变更，不可中断', k: 'commit 完成后才跑 Effect' },
        { id: 'b3b3', t: 'Hooks 执行时序', m: 'g', n: 'Render → Commit → useLayoutEffect → Paint → useEffect', k: '高频面试图，务必能画出来' },
      ]},
      { id: 'b3c', t: 'Reconciliation', m: 'g', c: [
        { id: 'b3c1', t: 'Diff 策略', m: 'g', n: '同层比较，跨层不复用', k: 'O(n) 启发式，代价是跨层移动会重建' },
        { id: 'b3c2', t: '类型变化即重建', m: 'g', n: '元素类型不同会卸载重建，state 丢失', k: '条件渲染切换不同组件时的坑' },
      ]},
      { id: 'b3d', t: 'key', m: 'g', c: [
        { id: 'b3d1', t: 'key 是身份标识', m: 'g', n: '帮助 React 识别元素在两次 render 间的身份', k: 'identity 优先，性能只是结果之一' },
        { id: 'b3d2', t: '正确 key 复用 DOM', m: 'g', n: 'key 相同则复用并移动，保留组件 state', k: '不是按位置匹配' },
        { id: 'b3d3', t: 'index 作 key 的问题', m: 'g', n: '插入/删除/排序后身份错位，state 串位', k: '必须用稳定 ID' },
      ]},
      { id: 'b3e', t: 'Fiber', m: 'g', c: [
        { id: 'b3e1', t: 'Fiber 是什么', m: 'g', n: '把 render 工作拆成可中断的工作单元', k: '不是新的 Virtual DOM' },
        { id: 'b3e2', t: '可中断渲染', m: 'g', n: '执行一部分 → 让出主线程 → 之后再继续', k: '解决长任务阻塞主线程' },
        { id: 'b3e3', t: '双缓冲树', m: 'y', n: 'current 与 workInProgress 交替切换', k: '未提交前整棵树可丢弃' },
      ]},
      { id: 'b3f', t: '并发与优先级', m: 'y', c: [
        { id: 'b3f1', t: '并发不是并行', m: 'y', n: '同一时刻仍只有一个 JS 任务在执行', k: '并发是可中断的交错执行' },
        { id: 'b3f2', t: '优先级与抢占', m: 'y', n: '高优先级更新可以打断低优先级工作', k: 'transition 属于低优先级' },
      ]},
      { id: 'b3g', t: 'StrictMode', m: 'y', c: [
        { id: 'b3g1', t: '开发期检查机制', m: 'y', n: '额外 re-render 与额外 setup+cleanup 循环', k: '生产环境不会重复执行' },
        { id: 'b3g2', t: '设计目的', m: 'y', n: '暴露 cleanup 不完整与副作用不纯的问题', k: 'Effect 跑两次不是 bug' },
      ]},
    ]
  },
  {
    id: 'b4', t: '性能优化', m: 'g',
    n: '先测量，再针对昂贵计算或不稳定引用优化',
    k: '本章主线：诊断 → 记忆化 → 引用稳定 → 结构优化',
    c: [
      { id: 'b4a', t: '记忆化三件套', m: 'g', c: [
        { id: 'b4a1', t: 'React.memo', m: 'g', n: 'props 未变时跳过父 render 引起的重渲染', k: '挡不住自身 state 与 Context 变化' },
        { id: 'b4a2', t: 'useMemo', m: 'g', n: '缓存昂贵计算结果', k: '先确认它真的昂贵' },
        { id: 'b4a3', t: 'useCallback', m: 'g', n: '稳定函数引用', k: '只在传给 memo 子组件时才有意义' },
        { id: 'b4a4', t: 'Props 引用稳定性', m: 'g', n: '依赖不可变更新与稳定依赖', k: '内联对象/函数是最常见破坏者' },
      ]},
      { id: 'b4b', t: 'Context 重渲染', m: 'g', c: [
        { id: 'b4b1', t: 'value 变化的影响', m: 'g', n: '所有订阅该 Context 的组件都会重渲染', k: 'React.memo 挡不住' },
        { id: 'b4b2', t: '四层优化手段', m: 'g', n: '稳定 value / 拆分 Context / 缩小消费范围 / selector', k: '按这个顺序排查' },
      ]},
      { id: 'b4c', t: '定位无效渲染', m: 'y', c: [
        { id: 'b4c1', t: 'React DevTools Profiler', m: 'r', n: '录制后查看哪些组件 render 了以及原因', k: '先测量再优化，不要猜' },
        { id: 'b4c2', t: '区分两类瓶颈', m: 'y', n: '计算耗时与 DOM 节点过多，优化手段不同', k: '前者用记忆化，后者用虚拟列表' },
      ]},
      { id: 'b4d', t: '列表与加载', m: 'y', c: [
        { id: 'b4d1', t: '虚拟列表', m: 'r', n: '只渲染可视区域，用占位容器撑出总高度', k: '长列表的关键手段' },
        { id: 'b4d2', t: '代码分割与懒加载', m: 'y', n: 'React.lazy + Suspense 按路由或交互拆分', k: '减少首屏 JS 体积' },
      ]},
      { id: 'b4e', t: 'React Compiler', m: 'r', c: [
        { id: 'b4e1', t: '定位', m: 'r', n: '编译期自动插入记忆化，减少手写 memo', k: '不替代 Profiler 诊断', v: 1 },
        { id: 'b4e2', t: '适用条件', m: 'r', n: '代码需符合 Rules of React 才可安全优化', k: '副作用不纯会失效', v: 1 },
      ]},
    ]
  },
  {
    id: 'b5', t: 'Context 与状态管理', m: 'y',
    n: 'Context 是传值机制，不是完整的性能方案',
    k: '本章主线：Context 局限 → 拆分 → selector → Server State',
    c: [
      { id: 'b5a', t: 'Context 基础', m: 'g', c: [
        { id: 'b5a1', t: '使用方式', m: 'g', n: 'createContext + Provider + useContext', k: '默认值只在没有 Provider 时生效' },
        { id: 'b5a2', t: 'React 19 简写', m: 'y', n: '可直接用 <Context> 作为 Provider 渲染', k: '老版本仍需 <Context.Provider>' },
        { id: 'b5a3', t: '局限', m: 'g', n: '订阅粒度较粗，值变化影响全部消费者', k: '不是状态管理银弹' },
        { id: 'b5a4', t: 'Context vs Props', m: 'g', n: '跨层级隐式传递 vs 显式数据流', k: '能显式传就别隐式传' },
      ]},
      { id: 'b5b', t: 'Context 进阶', m: 'g', c: [
        { id: 'b5b1', t: 'Context 与 memo 的关系', m: 'g', n: 'memo 无法阻止 Context 变化引起的重渲染', k: '拆出子组件再 memo 才有效' },
        { id: 'b5b2', t: '拆分 Context', m: 'g', n: '按更新频率与业务职责拆分', k: '避免无关状态互相影响' },
        { id: 'b5b3', t: 'useReducer + Context', m: 'g', n: '轻量全局状态方案', k: 'dispatch 引用稳定，配合拆分更好' },
      ]},
      { id: 'b5c', t: '第三方状态库', m: 'y', c: [
        { id: 'b5c1', t: 'Zustand selector', m: 'y', n: '按切片订阅，只有选中值变化才重渲染', k: '选择器返回新对象会失去效果' },
        { id: 'b5c2', t: 'useSyncExternalStore', m: 'g', n: '订阅外部 store 的官方桥梁', k: '配合 selector 实现细粒度订阅' },
        { id: 'b5c3', t: 'getSnapshot 必须稳定', m: 'g', n: '每次返回新对象会陷入无限循环并报错', k: '不可变数据直接返回，可变数据缓存快照' },
      ]},
      { id: 'b5d', t: 'Server State 与 Client State', m: 'y', c: [
        { id: 'b5d1', t: '两者区别', m: 'y', n: '服务端数据带有缓存、失效、重试、去重语义', k: '不要塞进 Context 手工管理' },
        { id: 'b5d2', t: 'React Query', m: 'r', n: '缓存、请求去重、失效与重新验证', k: 'Server State 应该交给它' },
      ]},
    ]
  },
  {
    id: 'b6', t: '并发与进阶 API', m: 'g',
    n: '并发能力让更新可被打断，而不是更快',
    k: '本章主线：Transition → Suspense → 边界配合 → 冷门 API',
    c: [
      { id: 'b6a', t: 'Transition', m: 'g', c: [
        { id: 'b6a1', t: 'startTransition', m: 'g', n: '把更新标记为非阻塞的 transition', k: '不能用于受控文本输入' },
        { id: 'b6a2', t: 'useTransition', m: 'g', n: '额外提供 isPending 标记', k: '用于加载态提示' },
        { id: 'b6a3', t: 'useDeferredValue', m: 'g', n: '延迟某个值的更新，让输入先响应', k: '搜索联想是典型场景' },
      ]},
      { id: 'b6b', t: 'Suspense', m: 'y', c: [
        { id: 'b6b1', t: '基础行为', m: 'y', n: '子组件挂起时，最近的父边界显示 fallback', k: '边界之外的兄弟内容不受影响' },
        { id: 'b6b2', t: '嵌套边界', m: 'y', n: '由内向外依次填充，形成渐进加载序列', k: '内层先显示，外层后补齐' },
        { id: 'b6b3', t: 'Transition 中不隐藏内容', m: 'y', n: '过渡更新期间保持已有内容可见，避免闪回 fallback', k: '需要重置边界时加 key' },
        { id: 'b6b4', t: '与 Error Boundary 分工', m: 'y', n: 'Suspense 负责加载态，Error Boundary 负责异常', k: '生产上两者必须配合使用' },
        { id: 'b6b5', t: 'Error Boundary 局限', m: 'y', n: '不捕获事件处理、SSR、异步回调与自身抛错', k: 'transition 内抛错会被捕获' },
      ]},
      { id: 'b6c', t: '代码加载', m: 'y', c: [
        { id: 'b6c1', t: 'React.lazy', m: 'y', n: '动态导入组件，必须配合 Suspense 使用', k: '路由级拆分最实用' },
      ]},
      { id: 'b6d', t: '其他进阶 API', m: 'g', c: [
        { id: 'b6d1', t: 'useId', m: 'g', n: '生成服务端与客户端一致的唯一 ID', k: '用于无障碍属性关联' },
        { id: 'b6d2', t: 'forwardRef', m: 'y', n: 'React 19 起可直接把 ref 当普通 prop 传', k: 'forwardRef 将被废弃' },
        { id: 'b6d3', t: 'useImperativeHandle', m: 'g', n: '只向父组件暴露必要的方法', k: '配合 ref prop 使用，不暴露整个 DOM' },
        { id: 'b6d4', t: 'useInsertionEffect', m: 'r', n: '供 CSS-in-JS 注入样式，早于 layout effect', k: '业务代码几乎不用', v: 1 },
        { id: 'b6d5', t: 'useSyncExternalStore 场景', m: 'g', n: '订阅浏览器 API 或第三方 store', k: '服务端渲染同时兼容' },
      ]},
    ]
  },
  {
    id: 'b7', t: '工程化与 Next.js', m: 'r',
    n: '后续学习计划，当前不作为已掌握内容',
    k: '本章主线：渲染模式 → 水合 → RSC → App Router',
    c: [
      { id: 'b7a', t: '渲染模式', m: 'r', c: [
        { id: 'b7a1', t: 'CSR / SSR / SSG', m: 'r', n: '在首屏速度、SEO 与数据实时性之间取舍', k: '按页面性质选择，不是越新越好' },
        { id: 'b7a2', t: 'Hydration', m: 'r', n: '服务端 HTML 与客户端首次 render 对齐的过程', k: '不一致会报水合错误' },
        { id: 'b7a3', t: '水合失败原因', m: 'r', n: '随机值、时间、直接访问 window、两端数据不一致', k: '放到 Effect 里或用稳定初值' },
      ]},
      { id: 'b7b', t: 'Server Components', m: 'r', c: [
        { id: 'b7b1', t: 'Server Components', m: 'r', n: '在服务端执行，不进入客户端 bundle', k: '不能使用交互 state' },
        { id: 'b7b2', t: 'Client Components', m: 'r', n: "'use client' 标记边界及其子树", k: '边界尽量下移，减少客户端 JS' },
      ]},
      { id: 'b7c', t: 'Next.js App Router', m: 'r', c: [
        { id: 'b7c1', t: '目录即路由', m: 'r', n: 'app 目录约定式路由与嵌套布局', k: 'layout 在同层级切换时默认保留' },
        { id: 'b7c2', t: '数据请求与缓存', m: 'r', n: '服务端请求配合缓存与重新验证策略', k: '缓存语义要显式声明' },
        { id: 'b7c3', t: '加载与错误状态', m: 'r', n: 'loading.js 与 error.js 约定文件', k: '底层就是 Suspense 与 Error Boundary' },
      ]},
      { id: 'b7d', t: '工程实践', m: 'r', c: [
        { id: 'b7d1', t: '前端性能分析', m: 'r', n: 'Lighthouse、Web Vitals、bundle 体积分析', k: '先量化再优化' },
        { id: 'b7d2', t: '测试', m: 'r', n: '单元 / 组件 / E2E 分层覆盖', k: '关键路径优先' },
      ]},
    ]
  },
  {
    id: 'b8', t: '面试场景题', m: 'g',
    n: '统一答题结构：现象 → 原因 → 方案',
    k: '每条都能挂回前面的原理分支',
    c: [
      { id: 'b8a', t: '组件为什么重复渲染', m: 'g', c: [
        { id: 'b8a1', t: '现象', m: 'g', n: '父组件改一个无关 state，整棵子树都 render', k: 'Profiler 里一片高亮' },
        { id: 'b8a2', t: '原因', m: 'g', n: '父 render 默认带动子 render，且 props 引用不稳定', k: '五个 render 原因逐个排除' },
        { id: 'b8a3', t: '方案', m: 'g', n: '先 Profiler 定位，再稳定引用并配合 memo', k: '不要无脑加 memo' },
      ]},
      { id: 'b8b', t: '为什么出现旧闭包', m: 'g', c: [
        { id: 'b8b1', t: '现象', m: 'g', n: '定时器或事件监听里读到旧 state', k: 'setInterval 里最常见' },
        { id: 'b8b2', t: '原因', m: 'g', n: '闭包捕获的是那次 render 的快照', k: '与 Stale Closure 同一根源' },
        { id: 'b8b3', t: '方案', m: 'g', n: '函数式更新 / ref 存最新值 / 补全依赖', k: '按是否要触发 render 来选' },
      ]},
      { id: 'b8c', t: '如何解决请求竞态', m: 'g', c: [
        { id: 'b8c1', t: '现象', m: 'g', n: '快速切换后显示的是先发请求的结果', k: '搜索、tab 切换' },
        { id: 'b8c2', t: '原因', m: 'g', n: '响应到达顺序与发起顺序无关', k: '网络延迟不可控' },
        { id: 'b8c3', t: '方案', m: 'g', n: 'cleanup 忽略过期结果，或 AbortController / 请求库', k: '三者可叠加' },
      ]},
      { id: 'b8d', t: '如何优化大列表', m: 'r', c: [
        { id: 'b8d1', t: '现象', m: 'r', n: '滚动卡顿、首次渲染慢', k: 'DOM 节点数破千' },
        { id: 'b8d2', t: '原因', m: 'r', n: 'DOM 过多导致渲染与布局成本线性上升', k: '与 key 错用叠加放大' },
        { id: 'b8d3', t: '方案', m: 'r', n: '虚拟列表 + 稳定 key + 行级 memo', k: '先确认不是计算瓶颈' },
      ]},
      { id: 'b8e', t: '如何排查 Context 性能', m: 'g', c: [
        { id: 'b8e1', t: '现象', m: 'g', n: '一处小状态变化导致大量组件 render', k: '无关组件也高亮' },
        { id: 'b8e2', t: '原因', m: 'g', n: 'value 引用每次新建，或订阅粒度过粗', k: 'Provider 值内联写法是常见病根' },
        { id: 'b8e3', t: '方案', m: 'g', n: 'Profiler 定位 → useMemo 稳定 → 拆分 → selector', k: '四层按顺序推进' },
      ]},
      { id: 'b8f', t: '如何设计全局状态', m: 'y', c: [
        { id: 'b8f1', t: '判断标准', m: 'y', n: '跨层级、多组件共享、更新频繁才需要', k: '局部能解决就不要上全局' },
        { id: 'b8f2', t: '分层策略', m: 'y', n: '局部 state → Context → 状态库 → Server State 库', k: '按数据性质分开，不要混用' },
        { id: 'b8f3', t: '常见错误', m: 'y', n: '把派生数据和 server state 都塞进全局 store', k: '导致同步成本与失效难题' },
      ]},
      { id: 'b8g', t: '如何处理 Suspense 加载与错误', m: 'y', c: [
        { id: 'b8g1', t: '加载态', m: 'y', n: '按颗粒度放边界，形成渐进式加载', k: '边界太大会整屏 spinner' },
        { id: 'b8g2', t: '错误态', m: 'y', n: '外层 Error Boundary 包裹内层 Suspense', k: 'Suspense 本身不处理异常' },
        { id: 'b8g3', t: '注意点', m: 'y', n: 'transition 中保持旧内容，需要重置时加 key', k: '否则会一直显示上一个页面' },
      ]},
      { id: 'b8h', t: '如何分析 SSR 与 Hydration 问题', m: 'r', c: [
        { id: 'b8h1', t: '现象', m: 'r', n: '控制台水合不匹配警告、页面闪烁重绘', k: '首次交互丢失' },
        { id: 'b8h2', t: '原因', m: 'r', n: '服务端与客户端首次渲染结果不一致', k: '随机值、时间、window、数据来源不同' },
        { id: 'b8h3', t: '方案', m: 'r', n: '消除不确定来源，统一数据获取时机', k: '用 Effect 承载仅客户端逻辑' },
      ]},
    ]
  },
];

// 易混淆知识点的关联线（跨分支）
export const LINKS = [
  { a: 'b1a1', b: 'b1c1', l: '快照 → 闭包 → 旧值', c: '#e11d48' },
  { a: 'b2b3', b: 'b2c1', l: 'cleanup ↔ 请求竞态', c: '#0891b2' },
  { a: 'b5a1', b: 'b4a1', l: 'Context ↔ memo 挡不住', c: '#7c3aed' },
  { a: 'b3d1', b: 'b3c1', l: 'key ↔ Reconciliation', c: '#ea580c' },
  { a: 'b3e1', b: 'b3b2', l: 'Fiber ↔ Render/Commit', c: '#2563eb' },
  { a: 'b3e2', b: 'b6a1', l: '可中断 ↔ startTransition', c: '#0d9488' },
  { a: 'b6b4', b: 'b6b5', l: 'Suspense ↔ Error Boundary', c: '#c026d3' },
  { a: 'b5c2', b: 'b5c1', l: 'useSyncExternalStore ↔ Zustand', c: '#65a30d' },
  { a: 'b5d1', b: 'b5d2', l: 'Server State ↔ React Query', c: '#b45309' },
];

export const MASTERY = {
  g: { label: '已掌握', color: '#16a34a' },
  y: { label: '待巩固', color: '#d97706' },
  r: { label: '待学习', color: '#dc2626' },
};

// 输出清单：总览 + 5 个专题
export const VIEWS = [
  {
    file: 'React面试知识体系-总览.html',
    title: 'React 面试知识体系 · 总览',
    subtitle: '8 大分支 · 点击节点展开/折叠 · 右侧查看结论与易错点 · 可开关关联线',
    branches: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'],
    expandLevel: 2,
  },
  {
    file: '专题1-State与Hooks.html',
    title: '专题 1 · State 与 Hooks',
    subtitle: '分支 1 + 2：更新机制、闭包旧值、副作用与竞态（全部展开）',
    branches: ['b1', 'b2'],
    expandLevel: 9,
  },
  {
    file: '专题2-渲染与性能.html',
    title: '专题 2 · 渲染机制与性能',
    subtitle: '分支 3 + 4：Render/Commit、Fiber、key、记忆化与诊断（全部展开）',
    branches: ['b3', 'b4'],
    expandLevel: 9,
  },
  {
    file: '专题3-Context与状态管理.html',
    title: '专题 3 · Context 与状态管理',
    subtitle: '分支 5：Context 局限、拆分、selector、Server State（全部展开）',
    branches: ['b5'],
    expandLevel: 9,
  },
  {
    file: '专题4-并发与进阶API.html',
    title: '专题 4 · 并发与进阶 API',
    subtitle: '分支 6：Transition、Suspense 嵌套、边界配合、冷门 API（全部展开）',
    branches: ['b6'],
    expandLevel: 9,
  },
  {
    file: '专题5-工程化与场景题.html',
    title: '专题 5 · 工程化与场景题',
    subtitle: '分支 7 + 8：渲染模式、水合、RSC、8 道场景题（全部展开）',
    branches: ['b7', 'b8'],
    expandLevel: 9,
  },
];
