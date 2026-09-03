const createPool = (limit) => {
  let list = []; // 任务队列
  // 正在运行的任务数
  let running = 0;
  // 记录idle需要resolve的函数，pool资源清空后，用于拦截处理完所有Resolvers 才能执行下一阶段任务
  let idleResolvers = [];
  // 记录tasks的批次
  const batch = new Map();
  // 生成批次id
  let nextBatchId = 0;

  const run = async () => {
    if (list.length === 0 || running >= limit) return;
    running++;
    const { task, resolve, reject, batchId } = list.shift();
    try {
      if (batchId && batch.get(batchId).stopped) {
        // tasks 属于这个批次的后续的任务都不执行
        reject(new Error("不执行"));
        return;
      }
      resolve(await task());
    } catch (error) {
      reject(error);
      if (batchId) {
        // tasks 发生错误，做后续任务不执行标记
        let tmp = batch.get(batchId);
        batch.set(batchId, { ...tmp, stopped: true });
      }
    } finally {
      running--;
      if (batchId) {
        let tmp = batch.get(batchId);
        // 记录还剩多少task未处理
        batch.set(batchId, { ...tmp, remaining: tmp.remaining - 1 });
        if (batch.get(batchId).remaining === 0) {
          batch.delete(batchId);
        }
      }
      // 处理完所有Resolvers 才能执行下一阶段任务
      if (list.length === 0 && running === 0) {
        for (let i = 0; i < idleResolvers.length; i++) {
          idleResolvers[i]?.();
        }
        idleResolvers = [];
      }
      run();
    }
  };

  const add = (fn, batchId) => {
    return new Promise((resolve, reject) => {
      list.push({
        task: fn,
        resolve,
        reject,
        batchId,
      });
      run();
    });
  };

  const addAll = (tasks, options = { stopOnError: false }) => {
    // 需要错误后停止执行的tasks，则定义好批次及其状态
    const batchId = options.stopOnError ? ++nextBatchId : null;
    if (batchId && tasks.length > 0) {
      batch.set(batchId, {
        stopped: false,
        remaining: tasks.length,
      });
    }

    return Promise.all(tasks.map((fn) => add(fn, batchId)));
  };

  const onIdle = () => {
    return new Promise((resolve) => {
      if (list.length === 0 && running === 0) {
        resolve();
        return;
      }
      idleResolvers.push(resolve);
    });
  };

  return {
    add,
    addAll,
    onIdle,
  };
};

const sleep = (ms, value, shouldReject = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldReject ? reject(new Error(value)) : resolve(value);
    }, ms);
  });

const pool = createPool(2);

const p1 = pool.add(() => sleep(100, "A"));
const p2 = pool.add(() => sleep(200, "B"));
const p3 = pool.add(() => sleep(50, "C"));
const p4 = pool.add(() => sleep(100, "D"));

console.log(await p1); // A
console.log(await p2); // B
console.log(await p3); // C
console.log(await p4); // D

// await pool.onIdle();

console.log("idle");
