const createTaskScheduler = ({
  concurrency = 5,
  rate = 2,
  interval = 1000,
  retry = 3,
}) => {
  let _tasks = [];
  let timestamps = [];
  let stopFlag = false;
  let waitTimer = [];

  // schedule负责调度任务的执行，并且在指定的时间间隔内不超过rate个任务被执行。
  const schedule = async () => {
    while (_tasks.some(({ status }) => status === "pending") && !stopFlag) {
      const now = Date.now();
      if (timestamps.length < rate) {
        timestamps.push(now);
        await attempt();
      } else {
        let timer;
        await new Promise((resolve) => {
          timer = setTimeout(resolve, interval - (now - timestamps[0]));
          // 存储 停止 rate异步等待 所需要的两个变量
          waitTimer.push({ timer, resolve });
        });
        waitTimer = waitTimer.filter((item) => item.timer !== timer);
        // 清理过期的时间戳，让新的schedule运行
        while (
          timestamps.length > 0 &&
          Date.now() - timestamps[0] >= interval
        ) {
          timestamps.shift();
        }
      }
    }
    return;
  };

  // attempt负责执行单个任务，并处理任务的重试逻辑。
  const attempt = async () => {
    // 如果当前索引超出任务数组的长度，则重新查找下一个待执行的任务索引。
    let cur = _tasks.findIndex(({ status }) => status === "pending");
    if (cur === -1) return;

    const task = _tasks[cur];

    try {
      task.status = "running";
      task.result = await task.job();
      task.status = "fulfilled";
    } catch (error) {
      task.retryCount++;
      task.status = "pending";
      if (task.retryCount === retry + 1) {
        task.result = error;
        task.status = "rejected";
      }
    }
  };

  const run = async (tasks = []) => {
    // 重置调度器的状态，以便可以重新运行任务。
    stopFlag = false;
    timestamps = [];
    waitTimer = [];
    _tasks = tasks.map((job) => ({
      job,
      retryCount: 0,
      result: null,
      status: "pending",
    }));
    // 使用Promise.allSettled来并发执行任务调度器，分配给定的并发数，各自调用schedule来执行。
    await Promise.allSettled(
      Array.from({ length: Math.min(concurrency, tasks.length) }, () =>
        schedule(),
      ),
    );
    return _tasks.map(({ result, status }) =>
      status === "fulfilled"
        ? { status, value: result }
        : { status, reason: result },
    );
  };

  const stop = () => {
    stopFlag = true;
    // 只cleartimeout对应timer是不够的，因为Promise没有resolve的话就会一直处于pending
    // 导致这个schedule处于阻塞状态，可能导致run方法里的Promise.allSettled也阻塞
    waitTimer.forEach(({ timer, resolve }) => {
      clearTimeout(timer);
      resolve();
    });
    _tasks = _tasks.map((obj) => {
      return {
        ...obj,
        result:
          obj.status === "pending" ? new Error("Task stopped") : obj.result,
        status: obj.status === "pending" ? "rejected" : obj.status,
      };
    });
  };

  return {
    run,
    stop,
  };
};

const scheduler = createTaskScheduler({
  concurrency: 5,
  rate: 2,
  interval: 1000,
  retry: 3,
});

const tasks = Array.from({ length: 100 }, (_, i) => {
  return () => request(i);
});

const results = await scheduler.run(tasks);

console.log(results);
