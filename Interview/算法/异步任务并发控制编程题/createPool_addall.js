const createPool = (limit) => {
  let list = [];
  let running = 0;
  let idleResolvers = [];

  const run = async () => {
    if (list.length === 0 || running >= limit) return;
    running++;
    const { task, resolve, reject } = list.shift();
    try {
      resolve(await task());
    } catch (error) {
      reject(error);
    } finally {
      running--;
      if (list.length === 0 && running === 0) {
        for (let i = 0; i < idleResolvers.length; i++) {
          idleResolvers[i]?.();
        }
        idleResolvers = [];
      }
      run();
    }
  };

  const add = (fn) => {
    return new Promise((resolve, reject) => {
      list.push({
        task: fn,
        resolve,
        reject,
      });
      run();
    });
  };

  const addAll = (tasks) => Promise.all(tasks.map((fn) => add(fn)));

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
