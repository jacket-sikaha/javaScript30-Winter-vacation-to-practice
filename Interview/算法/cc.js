/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  //   let res = [];
  //   for (let i = 0; i <= n; i++) {
  //     const element = i
  //       .toString(2)
  //       .split('')
  //       .filter((item) => item === '1').length;
  //     res.push(element);
  //   }
  //   return res;
  let res = [0];
  for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
      res.push(res[i / 2]);
      continue;
    }
    res.push(res[i - 1] + 1);
  }
  return res;
};
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let idx = 0;
  for (let i = 0; i < t.length; i++) {
    const element = t[i];
    if (element === s[idx]) {
      idx++;
    }
  }
  return idx === s.length;
};

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  let tmp = [0, 1];
  if (n <= 1) {
    return tmp[n];
  }
  for (let i = 1; i < n; i++) {
    tmp.push(tmp[i] + tmp[i - 1]);
  }
  return tmp[tmp.length - 1];
};

/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  let res = [];
  for (let i = 0; i < cost.length; i++) {
    const ele = cost[i];
    if (i <= 1) {
      res.push(ele);
      continue;
    }
    const s1 = res[i - 1];
    const s2 = res[i - 2];
    res.push(Math.min(s1, s2) + ele);
  }
  return Math.min(res[res.length - 1], res[res.length - 1]);
};

/**
 * @param {number} n
 * @return {boolean}
 */
var divisorGame = function (n) {
  // 规律 就是爱丽丝先手偶数必赢
  //  偶数-奇 = 奇
  //  bao只能选奇
  //  奇-奇=偶
  //  偶数给爱丽丝意味着循环下去爱丽丝永远有的减，知道bao拿一
  //  反之bao 拿到偶数，爱丽丝只能得到奇数选奇直到拿1 必输
  return n % 2 === 0;
};

/**
 * @param {number} n
 * @return {number}
 */
var waysToStep = function (n) {
  const MOD = 1000000007; // 大质数（只能被 1 和自身整除）
  // 模运算的「等价性」关键性质：
  // (a + b) % mod = [(a % mod) + (b % mod)] % mod
  // (a × b) % mod = [(a % mod) × (b % mod)] % mod
  const res = [1, 2, 4];
  if (n <= 3) {
    return res[n - 1];
  }
  for (let i = 3; i < n; i++) {
    const element = (res[0] % MOD) + (res[1] % MOD) + (res[2] % MOD);
    res.push(element % MOD);
    res.shift();
  }
  return res[res.length - 1];
};
