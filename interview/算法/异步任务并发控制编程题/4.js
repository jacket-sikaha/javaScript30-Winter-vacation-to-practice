// 题目描述
// 实现一个限频函数 createRateLimitFn(limit, windowMs)，返回一个包装函数limitedFn：
// limit: 时间窗口内的最大执行次数
// windowMs: 时间窗口（毫秒）
// 每次调用limitedFn(fn)时，会将fn（异步函数）加入执行队列，但保证在任意windowMs时间窗口内，执行的fn数量不超过limit
// 超出限制的任务需要等待，直到时间窗口内的执行次数有空余

const createRateLimitFn = (limit, windowMs) => {
  const list = [];
  let count = 0;
  let timer = Date.now();
  const run = async () => {
    if (count >= limit || list.length === 0) {
      return;
    }
    count++;
    const fn = list.shift();
    try {
      await fn();
    } catch (error) {
      console.log(error);
    } finally {
      let runTimer = Date.now();
      await new Promise((resolve, reject) =>
        setTimeout(resolve, timer + windowMs - runTimer),
      );
      count--;
      timer = Date.now();
      run();
    }
  };
  return (fn) => {
    list.push(fn);
    run();
  };
};

// 创建1秒内最多执行2次的限频函数
const limitedFn = createRateLimitFn(2, 1000);

// --------------------------------------
/**
 * 创建限频函数(正确答案)
 * @param {number} limit 时间窗口内最大执行次数
 * @param {number} windowMs 时间窗口（毫秒）
 * @returns {(fn: () => Promise<any>) => void} 限频包装函数
 */
const createRateLimitFn1 = (limit, windowMs) => {
  const taskQueue = []; // 待执行的任务队列
  let execCount = 0; // 当前窗口内已执行的次数
  let windowStart = Date.now(); // 当前时间窗口的起始时间

  // 核心执行逻辑：处理队列中的任务
  const processQueue = async () => {
    // 1. 先检查是否超出时间窗口，若超出则重置计数和窗口起始
    const now = Date.now();
    if (now - windowStart >= windowMs) {
      execCount = 0;
      windowStart = now;
    }

    // 2. 窗口内次数未满 + 有任务待执行，才执行任务
    if (execCount >= limit || taskQueue.length === 0) {
      return;
    }

    execCount++; // 占用当前窗口的一个执行名额
    const task = taskQueue.shift(); // 取出队首任务

    try {
      await task(); // 执行异步任务
    } catch (error) {
      console.error("任务执行失败:", error);
    } finally {
      // 任务执行完后，继续处理队列（无需等待窗口结束）
      processQueue();
    }
  };

  // 返回包装函数：添加任务到队列，并触发处理
  return (fn) => {
    taskQueue.push(fn);
    // 异步触发处理，避免同步调用导致的竞态
    Promise.resolve().then(processQueue);
  };
};

// 测试用例：1秒内最多执行2次
const limitedFn1 = createRateLimitFn(2, 1000);

// 连续调用5次
let tmp = Date.now();
for (let i = 0; i < 5; i++) {
  limitedFn1(async () => {
    console.log(`--执行任务${i}`, new Date().getSeconds());
    await new Promise((resolve) => setTimeout(resolve, 100)); // 任务耗时100ms
    if (i === 4) {
      console.log("总用上时间:", Date.now() - tmp);
    }
  });
}
// 预期输出（秒数示例）：
// 执行任务0 30
// 执行任务1 30
// 执行任务2 31 （1秒后）
// 执行任务3 31
// 执行任务4 32 （又1秒后）

// 时间轴（单位：ms）：
// 0ms → 任务0入队，触发run()，count=1，执行任务0（耗时100ms）
// 100ms → 任务0执行完，开始等待：timer+windowMs - runTimer = 0+1000-100=900ms
//         同时，任务1入队，触发run()，count=2，执行任务1（耗时100ms）
// 200ms → 任务1执行完，开始等待：timer+windowMs - runTimer = 0+1000-200=800ms
// 1000ms → 任务0的等待结束（900ms到），count=1，timer重置为1000ms，触发run()
// 1000ms → 任务2入队，run()判断count=1<2，执行任务2（耗时100ms）
// 1100ms → 任务2执行完，等待：1000+1000-1100=900ms

// 1000ms+800ms=1800ms → 任务1的等待结束，count=0，timer重置为1800ms，触发run()
// 1800ms → 任务3入队，run()判断count=0<2，执行任务3（耗时100ms）

// 1900ms → 任务3执行完，等待：1800+1000-1900=900ms
// 1000+900=1900ms → 任务2的等待结束，count=1，timer重置为1900ms，触发run()

// 1900ms → 任务4入队，run()判断count=1<2，执行任务4（耗时100ms）
// 2000ms → 任务4执行完，打印总耗时≈2100ms（从0ms到2000ms+100ms）
