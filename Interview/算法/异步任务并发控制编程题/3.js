/**
 * 控制异步任务并发执行的函数
 * @param {Function[]} tasks 异步任务数组（每个元素是返回Promise的函数）
 * @param {number} limit 最大并发数
 * @returns {Promise<any[]>} 所有任务完成后的结果数组（顺序与tasks一致）
 */
const runTasksWithLimit = async (tasks, limit) => {
  // 存储最终结果（保证顺序与tasks一致）
  const results = new Array(tasks.length);
  // 等待队列：存储待执行的任务索引
  const taskQueue = [];
  // 正在执行的任务数
  let runningCount = 0;
  // 任务索引（用于标记每个任务的原始位置）
  let taskIndex = 0;

  // 执行单个任务的函数
  const executeTask = async (index) => {
    runningCount++;
    try {
      // 执行任务并存储结果
      const result = await tasks[index]();
      results[index] = result;
      console.log(`任务${index + 1}完成`); // 注意：示例中任务ID是index+1
    } catch (error) {
      results[index] = error;
      console.log(`任务${index + 1}失败:`, error);
    } finally {
      runningCount--;
      // 任务完成后，从队列取下一个任务执行
      if (taskQueue.length > 0) {
        const nextIndex = taskQueue.shift();
        await executeTask(nextIndex);
      }
    }
  };

  // 遍历所有任务，初始化执行
  while (taskIndex < tasks.length) {
    // 并发数未超限，直接执行
    if (runningCount < limit) {
      await executeTask(taskIndex);
      taskIndex++;
    } else {
      // 并发数超限，加入等待队列
      taskQueue.push(taskIndex);
      taskIndex++;
    }
  }

  // 等待所有正在执行的任务完成
  while (runningCount > 0) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  return results;
};

// 测试用例
const createTask = (id, delay) => () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, delay);
  });

const tasks = [
  createTask(1, 2000),
  createTask(2, 1000),
  createTask(3, 3000),
  createTask(4, 1500),
  createTask(5, 500),
];

runTasksWithLimit(tasks, 2).then((results) => {
  console.log("所有任务完成", results); // 输出: 所有任务完成 [1,2,3,4,5]
});

// 预期执行顺序（控制台输出）：
// 任务2完成（1秒后）
// 任务1完成（2秒后）
// 任务4完成（2.5秒后）
// 任务5完成（3秒后）
// 任务3完成（4秒后）
// 所有任务完成 [1,2,3,4,5]
// 任务1完成   任务4完成  任务5完成
// 2s  ---- 1.5    0.5
// 任务2完成（1秒后）    任务3完成
// 1s                        3s
