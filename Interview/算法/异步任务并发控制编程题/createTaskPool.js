// 题 5：可取消的并发任务池

// 实现：

// createTaskPool(limit)

// 返回：

// const pool = createTaskPool(2)

// pool.add(task)
// pool.add(task)
// pool.add(task)

// 要求：

// 1. 最大并发数

// 同时最多执行 limit 个任务。

// limit = 2

// task1 ──────────→
// task2 ────→
// task3     等待
// task4     等待

// 当 task1 完成：

// task1 ──────────✓
// task2 ────→
// task3 ──────────→
// 2. 支持手动停止

// 需要提供：

// pool.stop()

// 调用之后：

// 还没有开始执行的任务，不再执行。

// 例如：

// task1 ───────────────→
// task2 ─────────→

// task3      等待
// task4      等待
// task5      等待

//           ↓
//       pool.stop()

// task1 ───────────────→
// task2 ─────────→

// task3 ❌
// task4 ❌
// task5 ❌

// 注意：

// 已经执行中的 task 不需要强制终止。

// 也就是说：

// stop()
//   ↓
// 正在执行的任务 → 继续执行
// 等待中的任务   → 不再执行
// 3. add 返回 Promise

// 例如：

// const p1 = pool.add(() => request(1))
// const p2 = pool.add(() => request(2))
// const p3 = pool.add(() => request(3))

// const result = await p1

// 每一个 add() 都应该返回这个任务自己的 Promise。

// 所以：

// const p1 = pool.add(task1)

// 最终：

// await p1

// 能够拿到：

// 'result1'

// 如果任务失败：

// await p1

// 应该正常 throw error。

const request = async (p) => {
  await new Promise((resolve, reject) =>
    setTimeout(resolve, 500 + Math.random() * 500),
  );

  console.log("执行:", p);
  return p;
};

const createTaskPool = (limit) => {
  if (limit <= 0) throw new Error("limit must be > 0");

  let activeCount = 0;
  const queue = [];
  let stopped = false;
  // 一个被反复调用的调度函数
  const next = () => {
    if (stopped || activeCount >= limit || queue.length === 0) return;

    const { task, resolve, reject } = queue.shift();
    activeCount++;

    Promise.resolve()
      .then(task)
      .then(resolve, reject)
      .finally(() => {
        activeCount--;
        next();
      });
  };

  const add = (task) => {
    if (stopped) {
      return Promise.reject(new Error("Pool has been stopped"));
    }

    return new Promise((resolve, reject) => {
      queue.push({ task, resolve, reject });
      next();
    });
  };

  const stop = () => {
    stopped = true;
    // 拒绝所有排队中的任务
    while (queue.length) {
      const { reject } = queue.shift();
      reject(new Error("Pool stopped"));
    }
  };

  return { add, stop };
};
const pool = createTaskPool(2);
const p1 = pool.add(() => request(1));
const p2 = pool.add(() => request(2));
const p3 = pool.add(() => request(3));
const p4 = pool.add(() => request(4));
const p5 = pool.add(() => request(5));
const p6 = pool.add(() => request(6));

const test = async () => {
  const pp1 = await p1;
  console.log("pp1:", pp1);
  const pp5 = await p5;
  console.log("pp5:", pp5);
};
test();

export {};
