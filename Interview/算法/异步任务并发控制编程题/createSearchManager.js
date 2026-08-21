// 题 7：搜索请求调度器

// 实现一个：

// createSearchManager(options)

// 用于模拟搜索框。

// 使用方式：

// const manager = createSearchManager({
//   wait: 300,
//   limit: 2,
// })

// manager.search('r')
// manager.search('re')
// manager.search('rea')
// manager.search('react')

// 要求同时满足下面 4 个条件。

// ① debounce：用户停止输入 300ms 后才真正发请求

// 例如：

// 0ms     r
// 100ms   re
// 200ms   rea
// 250ms   reac
// 400ms   react
//                   ↓
//                 停止输入
//                   ↓
// 700ms             发起 react 请求

// 所以前面的：

// r
// re
// rea
// reac

// 都不应该真正发送请求。

// ② Promise 并发控制：最多同时 2 个请求

// 假设用户连续进行了多个搜索：

// request A ────────────────→
// request B ───────→
// request C       等待
// request D       等待

// 最多：

// running <= 2

// 当 B 完成：

// request A ────────────────→
// request B ───────✓
// request C ───────────────→

// 也就是你之前做过的 动态 Promise Pool。

// ③ throttle：请求发送不能太频繁

// 增加一个规则：

// 真正发起 HTTP 请求时，两次请求开始之间至少间隔 1000ms。

// 例如：

// 0ms      request A 开始
// 300ms    request B 想开始
//          ↓
//          ❌ 不能开始
//          ↓
// 1000ms   request B 开始

// 注意：

// 这里的 throttle 针对的是：

// 请求真正开始执行的时间

// 而不是用户输入。

// 所以：

// debounce
// ↓
// 决定什么时候产生搜索任务

// throttle
// ↓
// 决定什么时候允许真正发 HTTP 请求

// concurrency
// ↓
// 决定最多同时有几个 HTTP 请求

// 这三个概念不要混在一起。

// ④ 支持取消旧搜索

// 例如：

// manager.search('react')

// 请求已经开始：

// request('react')
//        ↓
//      请求中

// 用户又搜索：

// manager.search('vue')

// 那么：

// react 请求
//    ↓
// 应该取消

// 最终只关心最新一次搜索：

// vue
// 你需要实现的 API

// 至少支持：

// const manager = createSearchManager({
//   wait: 300,
//   limit: 2,
//   throttle: 1000,
// })

// manager.search(keyword)

// 以及：

// manager.cancel()
// search() 返回 Promise

// 例如：

// const result = await manager.search('react')

// 成功：

// {
//   keyword: 'react',
//   data: [...]
// }

// 失败：

// throw error

// 如果这个搜索因为新的搜索产生而被取消：

// throw new Error('cancelled')

const request = (keyword, signal) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => {
        resolve(`result: ${keyword}`);
      },
      Math.random() * 2000 + 500,
    );

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("cancelled"));
    });
  });
};

const createSearchManager = ({ wait = 0, limit = 1, throttle = 1000 }) => {
  const list = []; // 任务队列
  let running = 0; // 当前并发数
  let throttleTimer = null; // 节流等待定时器
  let lastRequestStart = 0; // 上一次请求开始时间
  let stop = false;
  let debounceTimer = null; // 防抖定时器
  let currentAbort = null; // 当前最新搜索的取消控制器

  // ========== 核心调度：并发控制 + 请求节流 ==========
  const schedule = () => {
    // 已有节流定时器、无任务、并发满、已停止，都不处理
    if (throttleTimer || list.length === 0 || running >= limit || stop) return;

    const now = Date.now();
    const timePassed = now - lastRequestStart;

    // 满足节流间隔，直接执行
    if (timePassed >= throttle) {
      runNext();
      return;
    }

    // 不满足间隔，等待到时间后执行
    const waitTime = throttle - timePassed;
    throttleTimer = setTimeout(() => {
      throttleTimer = null;
      runNext();
    }, waitTime);
  };

  const runNext = () => {
    if (list.length === 0 || running >= limit || stop) return;

    const taskItem = list.shift();
    const { task, signal, resolve, reject } = taskItem;

    // 任务已被取消，直接跳过，不占用并发和节流名额
    if (signal.aborted) {
      reject(new Error("cancelled"));
      Promise.resolve().then(schedule);
      return;
    }

    running++;
    lastRequestStart = Date.now(); // 任务开始，更新节流时间戳

    Promise.resolve()
      .then(() => task(signal))
      .then(resolve, reject)
      .finally(() => {
        running--;
        schedule(); // 任务结束，调度下一个
      });
  };

  // ========== 搜索入口：防抖 + 取消旧搜索 ==========
  const search = (keyword) => {
    // 1. 取消上一次搜索（防抖中、排队中、执行中 全部取消）
    if (currentAbort) {
      currentAbort.abort();
      currentAbort = null;
    }
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }

    // 2. 创建新的取消控制器
    const abortController = new AbortController();
    currentAbort = abortController;
    const signal = abortController.signal;

    // 3. 返回 Promise，防抖结束后提交到调度队列
    return new Promise((resolve, reject) => {
      // 监听取消信号，提前抛出取消错误
      const onAbort = () => {
        reject(new Error("cancelled"));
        signal.removeEventListener("abort", onAbort);
      };
      signal.addEventListener("abort", onAbort);

      // 设置防抖定时器
      debounceTimer = setTimeout(() => {
        debounceTimer = null;
        if (signal.aborted) return; // 已取消则不入队
        list.push({
          task: (sig) => request(keyword, sig),
          signal,
          resolve,
          reject,
        });
        schedule();
      }, wait);
    });
  };

  // ========== 手动取消 ==========
  const cancel = () => {
    // 清除防抖定时器
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
    // 取消当前所有进行中的搜索
    if (currentAbort) {
      currentAbort.abort();
      currentAbort = null;
    }
    // 清空任务队列
    list.length = 0;
    // 重置状态，不影响后续使用
    stop = false;
  };

  return { search, cancel };
};

const manager = createSearchManager({
  wait: 300,
  limit: 2,
  throttle: 1000,
});

manager.search("r");
manager.search("re");
manager.search("rea");
manager.search("react");

setTimeout(() => {
  manager.search("react h");
}, 500);

setTimeout(() => {
  manager.search("react hook");
}, 800);

export {};
