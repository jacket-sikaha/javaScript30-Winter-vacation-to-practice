// 题 6：实现一个防抖 debounce

// 虽然看起来简单，但这题我们不只做最基础版本。

// 实现：

// debounce(fn, wait)

// 要求：

// 1. 基础防抖

// 连续调用：

// const fn = debounce(() => {
//   console.log('hello')
// }, 1000)

// fn()
// fn()
// fn()

// 最终只执行一次。

// 0ms     fn()
// 100ms   fn()
// 200ms   fn()
//         ↓
//         等待 1000ms
//         ↓
// 1200ms  真正执行

// 核心规则：

// 每次调用都会重新计时，只有停止调用超过 wait 后才执行。

// 2. 保留 this

// 例如：

// const obj = {
//   name: 'Tom',

//   say: debounce(function () {
//     console.log(this.name)
//   }, 1000),
// }

// obj.say()

// 应该打印：

// Tom

// 不能因为 debounce 导致 this 丢失。

// 3. 保留参数
// const fn = debounce((name, age) => {
//   console.log(name, age)
// }, 1000)

// fn('Tom', 18)

// 最终应该输出：

// Tom 18
// 4. 支持取消

// 返回的函数需要：

// fn.cancel()

// 例如：

// const fn = debounce(() => {
//   console.log('hello')
// }, 1000)

// fn()

// fn.cancel()

// 那么：

// hello

// 就不会执行。

const debounce = (fn = () => {}, wait) => {
  let timer = 0;
  let last = Date.now();
  const myFn = function (...arg) {
    let now = Date.now();
    if (now - last < wait) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...arg);
      last = now;
    }, wait);
  };
  myFn.cancel = () => {
    clearTimeout(timer);
  };
  return myFn;
};
