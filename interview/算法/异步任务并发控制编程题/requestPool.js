// 题 4：并发控制 + 重试

// 实现：

// requestPool(tasks, limit, retryCount)

// 要求：

// tasks：异步任务数组，每个任务都是 () => Promise
// limit：最大并发数
// retryCount：失败后的最大重试次数
// 同时最多执行 limit 个任务
// 某个任务失败后，自动重试
// 重试也算这个任务占用的并发槽位
// 一个任务最终成功后，worker 才去拿下一个任务
// 如果任务最终失败，需要记录失败结果，但不能影响其他任务
// 最终按照 tasks 原始顺序返回结果
const request = async () => {
  const success = Math.random() > 0.7;

  if (!success) {
    throw new Error("请求失败");
  }

  return "success";
};
const tasks = [
  () => request(1),
  () => request(2),
  () => request(3),
  () => request(4),
  () => request(5),
];

const requestPool = async (tasks = [], limit, retryCount) => {
  let index = 0;
  const res = new Array(tasks.length);
  const retry = async (fn) => {
    for (let i = 0; i <= retryCount; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === retryCount) {
          throw error;
        }
      }
    }
  };
  const worker = async () => {
    while (index < tasks.length) {
      let curIdx = index++;
      try {
        res[curIdx] = await retry(tasks[curIdx]);
        console.log(" res[curIdx]:", res[curIdx]);
      } catch (error) {
        res[curIdx] = error;
      }
    }
  };
  await Promise.all(
    new Array(Math.min(limit, tasks.length)).fill(0).map(() => worker()),
  );
  return res;
};

try {
  const result = await requestPool(tasks, 2, 3);
  console.log("result:", result);
} catch (error) {
  console.log("error:", error);
}
// export {};
