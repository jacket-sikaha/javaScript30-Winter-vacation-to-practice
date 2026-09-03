// 1. 造一个"售票窗口"函数，参数是"窗口数量"  setTimeout
function createTicketWindow(windowCount) {
  // 排队的人（等待执行的任务队列）
  const waitingQueue = [];
  // 当前正在窗口买票的人数（执行中的任务数）
  let peopleInWindow = 0;

  // 2. 核心：窗口自动叫号的逻辑
  function callNextPerson() {
    // 如果窗口满了，或者没人排队，就啥也不干
    if (peopleInWindow >= windowCount || waitingQueue.length === 0) {
      return;
    }

    // 叫队列里第一个人到窗口（取出第一个任务）
    peopleInWindow++; // 窗口人数+1
    const person = waitingQueue.shift(); // 取出排队的第一个人

    // 这个人开始买票（执行任务），耗时1秒
    console.log(`[当前窗口人数: ${peopleInWindow}] 第${person.id}个人开始买票`);
    setTimeout(() => {
      // 1秒后，这个人买完票了
      console.log(`第${person.id}个人买完票了 ✅`);
      peopleInWindow--; // 窗口人数-1
      console.log(`[当前窗口人数: ${peopleInWindow}] 窗口空出一个位置`);

      // 窗口空了，继续叫下一个人
      callNextPerson();
    }, 1000);
  }

  // 3. 返回"排队登记"函数（别人来买票，先登记排队）
  return function registerPerson(personId) {
    // 把这个人加入排队队列
    waitingQueue.push({ id: personId });
    console.log(
      `第${personId}个人来排队了，当前排队人数: ${waitingQueue.length}`,
    );

    // 尝试叫号（看看窗口有没有空位）
    callNextPerson();
  };
}

// ==================== 测试运行 ====================
// 开2个售票窗口（并发数=2）
const register = createTicketWindow(2);

// 10个人依次来排队买票
for (let i = 0; i < 10; i++) {
  register(i);
}
