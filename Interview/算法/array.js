/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  if (nums.length === 0) {
    return [];
  }
  let tmp = nums[0];
  const res = [];
  for (let i = 1; i < nums.length; i++) {
    const element = nums[i];
    if (element - nums[i - 1] === 1) {
      continue;
    } else {
      res.push(tmp === nums[i - 1] ? tmp.toString() : `${tmp}->${nums[i - 1]}`);
      tmp = element;
    }
  }
  const last = nums[nums.length - 1];
  res.push(tmp === last ? tmp.toString() : `${tmp}->${last}`);
  return res;
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let idx = 0;
  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    if (element !== 0) {
      [nums[idx], nums[i]] = [nums[i], nums[idx]];
      idx++;
    }
  }
  console.log("nums:", nums);
};
moveZeroes([1, 0, 0, 2, 3, 0, 4]);

/**
 * @param {string[]} strs
 * @return {string}
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  // 边界情况1：空数组直接返回空字符串
  if (strs.length === 0) return "";
  // 边界情况2：单元素数组直接返回该元素
  if (strs.length === 1) return strs[0];

  // 以第一个字符串为基准（公共前缀不可能长于它）
  const baseStr = strs[0];
  // 遍历基准字符串的每个字符位
  for (let idx = 0; idx < baseStr.length; idx++) {
    const currentChar = baseStr[idx];
    // 检查所有其他字符串的该字符位
    for (let i = 1; i < strs.length; i++) {
      // 两种情况说明前缀结束：1.字符不相等 2.某个字符串已到末尾
      if (idx >= strs[i].length || strs[i][idx] !== currentChar) {
        return baseStr.slice(0, idx);
      }
    }
  }

  // 所有字符都匹配，返回基准字符串
  return baseStr;
};
longestCommonPrefix(["aa", "aa"]);

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  // const res = new Set(nums.map((o, i) => i + 1));
  // for (let i = 0; i < nums.length; i++) {
  //   const tmp = res.has(nums[i]);
  //   if (tmp !== -1) {
  //     res.delete(nums[i]);
  //   }
  // }
  // return [...res.values()];
  const n = nums.length;
  const res = [];

  // 第一步：标记已出现的数字（原地哈希）
  for (let i = 0; i < n; i++) {
    // 取绝对值：避免之前标记的负数影响索引计算
    const num = Math.abs(nums[i]);
    // 对应的索引位置
    const index = num - 1;
    // 标记为负数（表示该数已出现）
    if (nums[index] > 0) {
      nums[index] = -nums[index];
    }
  }
  // 第二步：收集消失的数字
  for (let i = 0; i < n; i++) {
    // 正数表示对应数字（i+1）未出现
    if (nums[i] > 0) {
      res.push(i + 1);
    }
  }

  return res;
};

findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]);
findDisappearedNumbers([1, 1]);
// 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。
// 请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。示例 1：

// 输入：nums = [4,3,2,7,8,2,3,1]
// 输出：[5,6]
// 示例 2：

// 输入：nums = [1,1]
// 输出：[2]

/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
  // let tmp = [...new Set(nums)].sort();
  // return tmp.length < 3 ? tmp[tmp.length - 1] : tmp[tmp.length - 3];
  let first = null;
  let second = null;
  let third = null;

  for (const num of nums) {
    // 跳过重复值（核心：避免重复更新）
    if (num === first || num === second || num === third) {
      continue;
    }

    // 一次遍历更新前三大值（合并你的两次遍历逻辑）
    if (first === null || num > first) {
      third = second;
      second = first;
      first = num;
    } else if (second === null || num > second) {
      third = second;
      second = num;
    } else if (third === null || num > third) {
      third = num;
    }
  }

  // 不足三个不同值返回最大值，否则返回第三大值
  return third === null ? first : third;
};

/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  if (s.length === 0) {
    return 0;
  }
  let sum = 0;
  // s.sort((a, b) => a - b);
  // for (let i = 0; i < g.length; i++) {
  //   const element = g[i];
  //   for (let j = 0; j < s.length; j++) {
  //     const cookie = s[j];
  //     if (cookie >= element) {
  //       s[j] = 0;
  //       sum++;
  //       break;
  //     }
  //   }
  // }

  // ----------------------
  // 贪心 + 双指针
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let i = 0,
    j = 0;
  while (i < g.length && j < s.length) {
    if (g[i] <= s[j]) {
      i++;
      j++;
      sum++;
    } else {
      j++;
    }
  }
  return sum;
};

/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  let five = 0;
  let ten = 0;
  let twenty = 0;
  for (let i = 0; i < bills.length; i++) {
    const element = bills[i];
    switch (element) {
      case 5:
        five++;
        continue;
      case 10:
        ten++;
        if (five > 0) {
          five--;
        } else {
          return false;
        }
        continue;
      case 20:
        twenty++;
        // 找15
        //  10+5
        //  5+5+5
        if (five > 0 && ten > 0) {
          five--;
          ten--;
        } else if (five >= 3) {
          five -= 3;
        } else {
          return false;
        }
        continue;
      default:
        return false;
    }
  }
  return true;
};
[5, 5, 10, 20, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 5, 5, 20, 5, 20, 5];

/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function (grid) {
  const n = grid.length; // 网格边长（题目中是正方形网格）
  let total = 0;

  // 遍历每个位置的立方体数量
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const count = grid[i][j];
      if (count === 0) continue; // 无立方体，跳过

      // 1. 基础表面积：count个立方体，每个6面，总6*count
      let area = count * 6;

      // 2. 减去垂直重叠（上下堆叠）：count个立方体有count-1个重叠面，每个重叠减2
      area -= (count - 1) * 2;

      // 3. 减去水平相邻重叠（上下左右四个方向）
      // 上方（i-1,j）
      if (i > 0) {
        const upCount = grid[i - 1][j];
        area -= 2 * Math.min(count, upCount); // 取较小值，是实际重叠的层数
      }
      // 左方（i,j-1）
      if (j > 0) {
        const leftCount = grid[i][j - 1];
        area -= 2 * Math.min(count, leftCount);
      }
      // 下方（i+1,j）、右方（i,j+1）无需重复计算！
      // 因为遍历是按i/j递增，后续遍历到(i+1,j)时会计算和(i,j)的重叠

      // 累加当前位置的表面积
      total += area;
    }
  }

  return total;
};

// 测试用例（覆盖凹进去的场景）
console.log(
  surfaceArea([
    [1, 2],
    [3, 4],
  ]),
); // 输出 34（正确）
console.log(
  surfaceArea([
    [1, 0],
    [0, 2],
  ]),
); // 输出 16（凹进去的场景，正确）
console.log(surfaceArea([[2]])); // 输出 10（单个位置2个立方体，正确）
console.log(
  surfaceArea([
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ]),
); // 中间凹进去，输出 32（正确）

/**
 * @param {number[]} score
 * @return {string[]}
 */
var findRelativeRanks = function (score) {
  const positionMap = new Map(
    score
      .slice()
      .sort((a, b) => b - a)
      .map((n, i) => {
        switch (i) {
          case 0:
            return [n, "Gold Medal"];
          case 1:
            return [n, "Silver Medal"];
          case 2:
            return [n, "Bronze Medal"];
          default:
            return [n, `${i + 1}`];
        }
      }),
  );
  return score.map((n) => positionMap.get(n));
};

console.log(
  "findRelativeRanks([5,4,3,2,1])",
  findRelativeRanks([5, 4, 3, 2, 1]),
);

/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function (nums) {
  const obj = new Map();
  // 整理各个元素出现的位置索引
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    if (!obj.has(element)) {
      obj.set(element, [index]);
    } else {
      obj.get(element).push(index);
    }
  }
  // 统计出现元素次数最大的连续子数组
  // 连续子数组---其元素首尾相连的长度
  // 出现两个一样的最大的度 就比较最小的连续子数组长度
  let min = nums.length;
  let max = 0;
  for (const [key, value] of obj) {
    if (value.length > max) {
      min = value[value.length - 1] - value[0] + 1;
      max = value.length;
    } else if (value.length === max) {
      min = Math.min(min, value[value.length - 1] - value[0] + 1);
    }
  }
  console.log("min:", obj);
  return min;
};

/**
 *
  优化 解法
 */
var findShortestSubArray1 = function (nums) {
  // 存储结构：key=元素值，value=[首次索引, 末次索引, 出现次数]
  const elemInfo = new Map();
  const n = nums.length;
  let minLength = n; // 最短子数组长度，初始为数组总长
  let maxFrequency = 0; // 数组的度（最高出现次数）

  // 第一次遍历：仅记录首次/末次索引+出现次数（无需存储所有索引）
  for (let i = 0; i < n; i++) {
    const num = nums[i];
    if (!elemInfo.has(num)) {
      // 首次出现：[首次索引, 末次索引, 出现次数]
      elemInfo.set(num, [i, i, 1]);
    } else {
      const info = elemInfo.get(num);
      info[1] = i; // 更新末次索引
      info[2]++; // 更新出现次数
    }
  }

  // 第二次遍历：找最高频元素的最短子数组
  for (const [_, [first, last, count]] of elemInfo) {
    if (count > maxFrequency) {
      maxFrequency = count;
      minLength = last - first + 1;
    } else if (count === maxFrequency) {
      minLength = Math.min(minLength, last - first + 1);
    }
  }

  return minLength;
};
findShortestSubArray([1, 2, 2, 3, 1]);
findShortestSubArray([1, 2, 2, 3, 1, 4, 2]);

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isMonotonic = function (nums) {
  let isIncreasing = true; // 标记是否可能递增
  let isDecreasing = true; // 标记是否可能递减

  for (let i = 1; i < nums.length; i++) {
    const prev = nums[i - 1];
    const curr = nums[i];

    // 只要出现一次递减，就不可能是递增的
    if (prev > curr) {
      isIncreasing = false;
    }
    // 只要出现一次递增，就不可能是递减的
    if (prev < curr) {
      isDecreasing = false;
    }

    // 提前终止：既不递增也不递减，直接返回false
    if (!isIncreasing && !isDecreasing) {
      return false;
    }
  }

  // 只要满足递增或递减其一，就是单调的
  return isIncreasing || isDecreasing;
};

/**
 * @param {string[]} operations
 * @return {number}
 */
var calPoints = function (operations) {
  const stack = []; // 栈：存储有效分数，命名更直观

  for (const op of operations) {
    const len = stack.length;
    switch (op) {
      case "+":
        // 直接通过索引访问栈顶两个元素，避免slice创建新数组
        stack.push(stack[len - 1] + stack[len - 2]);
        break;
      case "D":
        // 访问栈顶元素，无需slice
        stack.push(stack[len - 1] * 2);
        break;
      case "C":
        stack.pop(); // 移除上一轮分数，逻辑不变
        break;
      default:
        // 数字字符串：直接转数字入栈
        stack.push(parseInt(op));
    }
  }

  // 求和逻辑不变，简洁写法
  return stack.reduce((sum, score) => sum + score, 0);
};

// 测试用例
console.log(calPoints(["5", "2", "C", "D", "+"])); // 30（正确）
console.log(calPoints(["5", "-2", "4", "C", "D", "9", "+", "+"])); // 27（正确）
console.log(calPoints(["1"])); // 1（正确）
