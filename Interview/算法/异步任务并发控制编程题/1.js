// 设计实现一个通用的限频函数，返回一个fn，限制同时只能有concurrency个fn在执行中
let time = 0;
const createLimitFn = (concurrency) => {
  const list = [];
  let count = 0; // 窗口在服务的人数
  const run = async () => {
    time++;
    if (count >= concurrency || list.length === 0) return;
    count++;
    const job = list.shift();
    try {
      await job();
      console.log("time:", time);
    } catch (error) {
      console.error(" ", error);
    } finally {
      count--;
      run(); // 窗口服务完一个人马上叫号
    }
  };
  return async (fn) => {
    // 排队
    list.push(fn);
    run();
  };
};

// 测试示例：设置并发数为1
const limit = createLimitFn(2);

// 执行10个异步任务，每个耗时1秒，串行执行总耗时10秒
for (let i = 0; i < 10; i++) {
  limit(async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1000),
    );
    console.log(i);
    return i; // 可选：返回结果，方便外部获取
  });
}

console.log("time:", time);
