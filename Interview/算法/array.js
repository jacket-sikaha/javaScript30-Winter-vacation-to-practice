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

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  // 边界问题 需要前后补0
  flowerbed.push(0);
  flowerbed.unshift(0);
  for (let i = 0; i < flowerbed.length - 2; i++) {
    // 核心思路 三个空位中间可以种
    const cur = flowerbed[i];
    const next = flowerbed[i + 1];
    const nextnext = flowerbed[i + 2];
    if (cur === 0 && next === 0 && nextnext === 0) {
      n--;
      flowerbed[i + 1] = 1;
    }
    //  # 优化：如果已经种够n朵，直接返回True（不用继续遍历）
    if (n <= 0) return true;
  }
  console.log("flowerbed:", flowerbed);
  return n <= 0;
};
canPlaceFlowers([1, 0, 0, 0, 0, 1]);
canPlaceFlowers([0, 0, 1, 0, 0]);

/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (words) {
  // 给你一个字符串数组 words ，只返回可以使用在 美式键盘 同一行的字母打印出来的单词。键盘如下图所示。
  const a = new Map("qwertyuiop".split("").map((s) => [s, 0]));
  const b = new Map("asdfghjkl".split("").map((s) => [s, 1]));
  const c = new Map("zxcvbnm".split("").map((s) => [s, 2]));
  const res = [];

  for (let i = 0; i < words.length; i++) {
    const str = words[i];
    let sum = new Set();
    for (let j = 0; j < str.length; j++) {
      const w = str[j].toLowerCase();
      sum.add(a.get(w) ?? b.get(w) ?? c.get(w));
    }
    if (sum.size === 1) {
      res.push(str);
    }
  }
  return res;
};

/**
 * 优化
 * @param {string[]} words
 * @return {string[]}
 */
var findWords1 = function (words) {
  // 合并为1个Map：所有字母→对应行号，初始化更简洁
  const keyboardMap = new Map([
    ..."qwertyuiop".split("").map((s) => [s, 0]),
    ..."asdfghjkl".split("").map((s) => [s, 1]),
    ..."zxcvbnm".split("").map((s) => [s, 2]),
  ]);
  const res = [];

  for (const word of words) {
    // 取第一个字母的行号（转小写）
    const targetLine = keyboardMap.get(word[0].toLowerCase());
    let isSameLine = true;

    // 遍历后续字母，只要有一个行号不同，立即终止遍历
    for (let i = 1; i < word.length; i++) {
      const curLine = keyboardMap.get(word[i].toLowerCase());
      if (curLine !== targetLine) {
        isSameLine = false;
        break; // 提前终止，减少无意义遍历
      }
    }

    if (isSameLine) {
      res.push(word);
    }
  }

  return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
  // 1. 原地排序，无需重新赋值
  nums.sort((a, b) => a - b);
  let sum = 0;
  // 2. 步长2遍历，直接累加，省略冗余变量
  for (let i = 0; i < nums.length; i += 2) {
    sum += nums[i];
  }
  return sum;
};
// 给定长度为 2n 的整数数组 nums ，你的任务是将这些数分成 n 对, 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从 1 到 n 的 min(ai, bi) 总和最大。

// 示例 1：

// 输入：nums = [1,4,3,2]
// 输出：4
// 解释：所有可能的分法（忽略元素顺序）为：
// 1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
// 2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
// 3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
// 所以最大总和为 4
// 示例 2：

// 输入：nums = [6,2,6,5,1,2]
// 输出：9
// 解释：最优的分法为 (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9

/**
 * @param {number[]} nums
 * @return {number}
 * 核心优化方向：
    鲁棒性：位运算解法无溢出风险，是这道题的最优解；
    利用异或运算的特性 ——a ^ a = 0、a ^ 0 = a、异或满足交换律 / 结合律
 */
var missingNumber = function (nums) {
  let len = nums.length;
  let sum = (len * (len + 1)) / 2;
  let total = nums.reduce((a, b) => a + b, 0);
  return sum - total;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function (nums) {
  const max = Math.max(...nums);
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === max) {
      res = i;
      continue;
    }
    if (max < nums[i] * 2) {
      return -1;
    }
  }
  return res;
};

/**
 * 优化 向量叉乘
 * 
 * 向量 AB = (bx-ax, by-ay)，向量 AC = (cx-ax, cy-ay)，叉乘公式：cross = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax)
若 cross = 0：三点共线（不是回旋镖）；
若 cross ≠ 0：三点不共线（是回旋镖）。
 * @param {number[][]} points
 * @return {boolean}
 */
var isBoomerang = function (points) {
  const [[ax, ay], [bx, by], [cx, cy]] = points;
  const k1 = by - ay === 0 ? "y" : bx - ax === 0 ? "x" : (by - ay) / (bx - ax);
  const k2 = by - cy === 0 ? "y" : bx - cx === 0 ? "x" : (by - cy) / (bx - cx);
  const k3 = cy - ay === 0 ? "y" : cx - ax === 0 ? "x" : (cy - ay) / (cx - ax);
  return k1 !== k2 && k2 !== k3 && k1 !== k3;
};

/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
  const uniqueCandyTypes = new Set(candyType).size;
  let maxCanTake = candyType.length >> 1; // 位运算更快;
  return Math.min(maxCanTake, uniqueCandyTypes);
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  let repeat = 0;
  let disappear = 0;
  const map1 = new Set(nums);
  const map2 = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (!map1.has(i + 1)) {
      disappear = i + 1;
    }
    if (!map2.has(nums[i])) {
      map2.add(nums[i]);
    } else {
      repeat = nums[i];
    }
    if (disappear && repeat) {
      return [repeat, disappear];
    }
  }
  return [repeat, disappear];
};

/**
 * 原地哈希（最优，O (1) 额外空间）
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  let repeat = 0;
  let disappear = 0;
  const n = nums.length;

  // 第一步：遍历标记，找重复数
  for (let i = 0; i < n; i++) {
    // num - 1 就是数组的索引
    // 如果 1到n的数字数组没有重复数字，遍历都是能访问到每一个数字的
    const num = Math.abs(nums[i]);
    const idx = num - 1;
    // 已标记为负数 → 该数重复
    if (nums[idx] < 0) {
      repeat = num;
    } else {
      // 标记为负数，表示该数已出现
      nums[idx] = -nums[idx];
    }
  }

  // 第二步：找缺失数（正数对应的索引+1）
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      disappear = i + 1;
      break; // 找到后立即终止
    }
  }

  return [repeat, disappear];
};

/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  const map = new Set(banned);
  // 匹配单词正则表达式
  const arr = paragraph.toLowerCase().match(/[a-z]+/g) || [];

  const obj = {};
  let max = 0;
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    const word = arr[i];
    if (map.has(word)) {
      continue;
    }
    // 简化频率统计（一行替代if-else）
    obj[word] = (obj[word] || 0) + 1;
    if (max < obj[word]) {
      result = word;
      max = obj[word];
    }
  }
  console.log("obj:", obj);
  return result;
};
mostCommonWord("Bob hit a ball, the hit BALL flew far after it was hit.", [
  "hit",
]);

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
  let max = 1;
  let count = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      count++;
    } else {
      count = 1;
    }
    max = Math.max(max, count);
  }
  return max;
};

/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
var distanceBetweenBusStops = function (distance, start, destination) {
  let a = 0;
  let b = 0;
  if (start === destination) {
    return 0;
  }
  let idx = start;
  // 从start 到 destination
  // 因为 start可能比destination大 所以都要取模
  while (idx % distance.length !== destination) {
    a += distance[idx % distance.length];
    idx++;
  }
  // 从destination 到 start
  idx = destination;
  while (idx % distance.length !== start) {
    b += distance[idx % distance.length];
    idx++;
  }

  return a > b ? b : a;
};
distanceBetweenBusStops([7, 10, 1, 12, 11, 14, 5, 0], 7, 2);

/**
 * pref
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
var distanceBetweenBusStops = function (distance, start, destination) {
  // 边界：起点=终点，距离为0
  if (start === destination) return 0;

  // 统一start < destination，简化顺时针遍历逻辑（避免环形取模）
  let [s, d] =
    start < destination ? [start, destination] : [destination, start];

  // 1. 计算顺时针路径距离（s→d）
  let clockwiseDist = 0;
  for (let i = s; i < d; i++) {
    clockwiseDist += distance[i];
  }

  // 2. 计算总距离（数组总和）
  const totalDist = distance.reduce((sum, val) => sum + val, 0);

  // 3. 逆时针路径距离 = 总距离 - 顺时针距离，取最小值
  const counterClockwiseDist = totalDist - clockwiseDist;

  return Math.min(clockwiseDist, counterClockwiseDist);
};

/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
  let count = 0;
  const [cols, rows] = [strs[0].length, strs.length];
  for (let i = 0; i < cols; i++) {
    for (let j = 1; j < rows; j++) {
      if (strs[j][i] < strs[j - 1][i]) {
        count++;
        break;
      }
    }
  }
  return count;
};
minDeletionSize(["cba", "daf", "ghi"]);

/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function (matrix) {
  // 边界1：空矩阵/单行/单列矩阵，天然满足托普利茨条件
  if (matrix.length <= 1 || matrix[0].length <= 1) return true;
  // -1 下和右的边缘item不存在 左上到右下的对角元素
  for (let i = 0; i < matrix.length - 1; i++) {
    for (let j = 0; j < matrix[i] - 1; j++) {
      if (matrix[i][j] !== matrix[i + 1][j + 1]) {
        return false;
      }
    }
  }
  return true;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  // 1. 计算数组总和
  const totalSum = nums.reduce((sum, num) => sum + num, 0);

  // 2. 遍历每个下标，计算左侧和，判断是否满足条件
  let leftSum = 0; // 初始左侧和为0（第一个元素左侧无元素）
  for (let i = 0; i < nums.length; i++) {
    // 右侧和 = 总和 - 左侧和 - 当前元素
    const rightSum = totalSum - leftSum - nums[i];

    // 找到中心下标，立即返回（保证最左侧）
    if (leftSum === rightSum) {
      return i;
    }

    // 左侧和 += 当前元素（为下一个下标做准备）
    leftSum += nums[i];
  }

  // 遍历完无满足条件的下标
  return -1;
};

var MyHashMap = function () {
  this.map = {};
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
  this.map[key] = value;
};

/**
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
  return this.map[key] ?? -1;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
  delete this.map[key];
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */

/**
 * @param {number[]} aliceSizes
 * @param {number[]} bobSizes
 * @return {number[]}
 */
var fairCandySwap = function (aliceSizes, bobSizes) {
  let alicesum = aliceSizes.reduce((a, b) => a + b);
  let bobsum = bobSizes.reduce((a, b) => a + b);
  for (let i = 0; i < aliceSizes.length; i++) {
    const a = aliceSizes[i];
    for (let j = 0; j < bobSizes.length; j++) {
      const b = bobSizes[j];
      if (alicesum - a + b === bobsum - b + a) {
        return [a, b];
      }
    }
  }
  return [0, 0];
};
/**
 * pref
 * @param {number[]} aliceSizes
 * @param {number[]} bobSizes
 * @return {number[]}
 */
var fairCandySwap = function (aliceSizes, bobSizes) {
  // 1. 计算两人总糖果数
  const aliceSum = aliceSizes.reduce((sum, val) => sum + val, 0);
  const bobSum = bobSizes.reduce((sum, val) => sum + val, 0);

  // 2. 计算差值的一半（等式变形后的关键值）
  // aliceSum - a + b = bobSum - b + a // 等式关系
  // 2b = (bobSum - aliceSum) + 2a
  const delta = (bobSum - aliceSum) / 2;

  // 3. 将bob的糖果存入Set，用于O(1)查找
  const bobSet = new Set(bobSizes);

  // 4. 遍历alice的糖果，找满足条件的b
  for (const a of aliceSizes) {
    const targetB = a + delta;
    // 找到目标b，立即返回（题目保证有唯一解）
    if (bobSet.has(targetB)) {
      return [a, targetB];
    }
  }

  // 题目保证有解，此处仅为兜底
  return [0, 0];
};

/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
  // 边界：n=1且无信任关系 → 1就是法官
  if (n === 1) return 1;

  // 初始化入度、出度数组（下标从1到n，对应小镇的人）
  const inDegree = new Array(n + 1).fill(0);
  const outDegree = new Array(n + 1).fill(0);

  // 遍历trust，统计入度和出度
  for (const [a, b] of trust) {
    outDegree[a]++; // a信任别人 → 出度+1
    inDegree[b]++; // b被信任 → 入度+1
  }

  // 遍历1~n，找满足条件的法官
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === n - 1 && outDegree[i] === 0) {
      return i;
    }
  }

  // 无满足条件的法官
  return -1;
};

console.log("findJudge(2, [[1, 2]]):", findJudge(2, [[1, 2]]));

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function (nums) {
  let len = 1;
  let maxL = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] > 1) {
      len = Math.max(len, maxL);
      len = 1;
    } else {
      len++;
    }
  }
  return maxL;
};

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
  const y = image.length;
  const x = image[0].length;
  const originalColor = image[sr][sc];
  const map = new Set(); // 记录走过的路避免无限递归
  const dfs = (i, j) => {
    // 边界判断：
    // - 行r超出数组范围（<0 或 >= 行数）
    // - 列c超出数组范围（<0 或 >= 列数）
    // - 当前像素颜色≠原始颜色（不需要填充）
    if (
      i === y ||
      j === x ||
      i < 0 ||
      j < 0 ||
      map.has(`${i}${j}`) ||
      image[i][j] !== originalColor
    ) {
      return;
    }
    map.add(`${i}${j}`);
    image[i][j] = color;
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };
  dfs(sr, sc);
  return image;
};

/**
 * @param {number[]} bits
 * @return {boolean}
 */
var isOneBitCharacter = function (bits) {
  for (let i = 0; i < bits.length; i++) {
    const element = bits[i];
    // 抓住 “1 必须跳 2 步” 的核心规则
    if (element === 1) {
      // 倒数第二个是1 就是10 是false
      if (i === bits.length - 2) {
        return false;
      }
      i++;
    }
  }
  return true;
};

/**
 * @param {number[]} nums
 * @return {boolean[]}
 */
// 会产生【超大数溢出】问题
// let str = "";
// str = str + n;          // 不断拼接 0/1 字符串
// parseInt(str, 2) % 5    // 转成二进制整数再取模
var prefixesDivBy5 = function (nums) {
  const res = [];
  let num = 0;

  for (const bit of nums) {
    // 核心公式：永远只保留模5的值，不会溢出
    //     下一个二进制数 = 当前数 * 2 + 新位
    // 是否能被5整除 ← 只要看 (当前数*2+新位) %5 ==0
    num = (num * 2 + bit) % 5;
    res.push(num === 0);
  }

  return res;
};

/**
 * 超级简单的正确思路（3 步走）
1. 把数组从小到大排序
2. 优先把最小的负数翻成正数（这样总和变大）
3. 如果负数全部翻完了，k 还有剩余：
剩下的次数是偶数：随便翻一个数两次 → 等于没变
剩下的次数是奇数：必须翻最小的那个数一次（损失最小）
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function (nums, k) {
  // 1. 从小到大排序
  nums.sort((a, b) => a - b);

  // 2. 先把所有负数翻成正数（能翻多少翻多少）
  for (let i = 0; i < nums.length && k > 0; i++) {
    if (nums[i] < 0) {
      nums[i] = -nums[i];
      k--;
    }
  }

  // 3. 还有剩余次数，就翻最小的那个数
  if (k > 0 && k % 2 === 1) {
    // 再排一次，找到最小的
    nums.sort((a, b) => a - b);
    nums[0] = -nums[0];
  }

  // 求和
  return nums.reduce((a, b) => a + b);
};
[-2, 5, 0, 2, -2];
[8, -7, -3, -9, 1, 9, -6, -9, 3];

/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
  const map = new Map(order.split("").map((o, i) => [o, i + 1]));
  for (let i = 0; i < words.length - 1; i++) {
    for (let j = 0; j < Math.max(words[i].length, words[i + 1].length); j++) {
      // 字符串比较，从头到尾逐个字符比较
      // 顺序不符合，大的就返回
      // 顺序符合，跳出循环 比较下一个字符串
      // 相等就继续循环比较下一个字符
      let _a = map.get(a[j]) ?? 0;
      let _b = map.get(b[j]) ?? 0;
      if (_a > _b) return false;
      if (_a < _b) break;
    }
  }
  return true;
};

/**
 * pref
 *
 * @param {*} words
 * @param {*} order
 * @return {*}
 */
var isAlienSorted = function (words, order) {
  // 建立字符:优先级映射（不用i+1，直接i即可）
  const map = new Map(order.split("").map((ch, i) => [ch, i]));

  // 遍历相邻的每一对单词
  for (let i = 0; i < words.length - 1; i++) {
    const a = words[i]; // 前一个单词
    const b = words[i + 1]; // 后一个单词
    const maxLen = Math.max(a.length, b.length);

    for (let j = 0; j < maxLen; j++) {
      // 不存在的字符优先级为0（更短）
      const valA = map.get(a[j]) ?? 0;
      const valB = map.get(b[j]) ?? 0;

      // 1. 前一个字符 > 后一个 → 直接非法
      if (valA > valB) return false;
      // 2. 前一个字符 < 后一个 → 这对单词合法，跳出循环
      if (valA < valB) break;
      // 3. 相等 → 继续比较下一个字符（无需写代码，自动走下一轮j）
    }

    // 边界：前一个单词更长，且是后一个的前缀 → 非法
    if (a.length > b.length && a.startsWith(b)) return false;
  }

  return true;
};

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  const compare = () => {
    if (stones.length <= 1) {
      return stones[0] ?? 0;
    }
    stones.sort((a, b) => a - b);
    const y = stones.pop();
    const x = stones.pop();
    let newstones = y - x;
    if (newstones > 0) {
      stones.push(newstones);
    }
    return compare();
  };
  return compare();
};
/**
 * pref
 * 改成迭代（更安全、更标准）
 * @param {*} stones
 * @return {*}
 */
var lastStoneWeight = function (stones) {
  while (stones.length > 1) {
    // 排序
    stones.sort((a, b) => a - b);
    // 拿最大两块
    const y = stones.pop();
    const x = stones.pop();
    // 粉碎
    const diff = y - x;
    if (diff > 0) stones.push(diff);
  }
  return stones[0] || 0;
};

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  while (k > 0) {
    let tmp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (i === m - 1 && j === n - 1) {
          tmp[0][0] = grid[i][j];
        } else if (j === n - 1) {
          tmp[i + 1][0] = grid[i][n - 1];
        } else if (j < n - 1) {
          tmp[i][j + 1] = grid[i][j];
        } else {
          tmp[i][j] = grid[i][j];
        }
      }
    }
    grid = tmp;
    k--;
  }
  return grid;
};
shiftGrid(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  1,
);
// 每次「迁移」操作将会引发下述活动：
// 前两列右移 最后一列移到第一列且 grid[m - 1][n - 1] 的元素移动到 grid[0][0]
// 位于 grid[i][j]（j < n - 1）的元素将会移动到 grid[i][j + 1]。
// 位于 grid[i][n - 1] 的元素将会移动到 grid[i + 1][0]。
// 位于 grid[m - 1][n - 1] 的元素将会移动到 grid[0][0]。

/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function (emails) {
  return new Set(
    emails.map((s) => {
      let [l, r] = s.split("@");
      return l.replace(/\+[^@]+/, "").replace(/\./g, "") + "@" + r;
    }),
  ).size;
};
[
  "test.email+alex@leetcode.com",
  "test.e.mail+bob.cathy@leetcode.com",
  "testemail+david@lee.tcode.com",
].map((s) => {
  let [l, r] = s.replace(/\+[^@]+/, "").split("@");
  return l.replace(/\./g, "") + "@" + r;
});

/**
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter = function (nums) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const a = nums[i];
        const b = nums[j];
        const c = nums[k];
        if (a + b > c && a + c > b && b + c > a) {
          max = Math.max(a + b + c, max);
        }
      }
    }
  }
  return max;
};
/**
 * pref
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter1 = function (nums) {
  // 1. 从大到小排序（核心）
  nums.sort((a, b) => b - a);

  // 2. 遍历连续三个最大的数
  for (let i = 0; i < nums.length - 2; i++) {
    const a = nums[i]; // 最大边
    const b = nums[i + 1]; // 次大边
    const c = nums[i + 2]; // 最小边

    // 3. 只需要判断这一个条件！
    if (b + c > a) {
      return a + b + c;
    }
  }

  // 4. 没有能构成三角形的，返回0
  return 0;
};
largestPerimeter([1, 4, 8, 3, 2]);

/**
 * @param {number[][]} points
 * @return {number}
 */
var largestTriangleArea = function (points) {
  let maxArea = 0;
  const n = points.length;

  // 枚举所有三个点
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[j];
        const [x3, y3] = points[k];

        // 面积公式
        const area =
          Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2;

        maxArea = Math.max(maxArea, area);
      }
    }
  }
  return maxArea;
};

/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
var shortestToChar = function (s, c) {
  const answer = new Array(s.length).fill(0);
  const postion = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      postion.push(i);
    }
  }
  for (let i = 0; i < s.length; i++) {
    const element = s[i];
    if (element !== c) {
      answer[i] = Math.min(...postion.map((p) => Math.abs(i - p)));
    }
  }
  return answer;
};

/**
 *
 * pref
 * 
 * 最优解法思路（超级好懂）
 两次遍历：
 从左往右遍历：记录左边最近 c 的距离
 从右往左遍历：记录右边最近 c 的距离
 每个位置取 左右最小距离
 * @param {*} s
 * @param {*} c
 * @return {*} 
 */
var shortestToChar2 = function (s, c) {
  const n = s.length;
  const res = new Array(n).fill(n); // 初始设为最大值
  let pos = n;

  // 左 → 右
  for (let i = 0; i < n; i++) {
    if (s[i] === c) pos = i;
    res[i] = Math.abs(i - pos);
  }

  // 右 → 左
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === c) pos = i;
    res[i] = Math.min(res[i], Math.abs(i - pos));
  }

  return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let max = 0;
  let len = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      len++;
    } else {
      max = Math.max(len, max);
      len = 0;
    }
  }
  if (len > 0) {
    max = Math.max(len, max);
  }
  return max;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    if (element % 2) {
      res.push(element);
    } else {
      //  数组的 unshift 是 O (n) 操作（每次往头部插，后面所有元素都要往后挪一位）
      res.unshift(element);
    }
  }
  // 分离奇偶再合并（最简单、O (n)
  const even = [],
    odd = [];
  for (const n of nums) {
    n % 2 === 0 ? even.push(n) : odd.push(n);
  }
  return [...even, ...odd];
  return res;
};
/**
 * pref
 * 双指针原地排序
 * @param {*} nums
 * @return {*}
 */
var sortArrayByParity1 = function (nums) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    // 左奇右偶 → 交换
    if (nums[left] % 2 === 1 && nums[right] % 2 === 0) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
      right--;
    }
    // 左边已是偶数 → 往右走
    else if (nums[left] % 2 === 0) left++;
    // 右边已是奇数 → 往左走
    else right--;
  }
  return nums;
};

/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function (num, k) {
  let flag = 0;
  // 数字反转，从低位开始加，方便处理位数不一样的情况
  const kArr = k.toString().split("").map(Number).reverse();
  num = num.reverse();
  // k 和 num 位数可能不一样
  for (let i = 0; i < Math.max(num.length, kArr.length); i++) {
    // 用?? 0 处理越界
    const value = (num[i] ?? 0) + (kArr[i] ?? 0) + flag;
    num[i] = value % 10;
    flag = value >= 10 ? 1 : 0;
  }
  if (flag) num.push(1);
  return num.reverse();
};
// 输入：num = [1,2,0,0], k = 34
// 输出：[1,2,3,4]
// 解释：1200 + 34 = 1234

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  // 直接计算第一个窗口的和，不创建新数组（唯一优化点）
  let currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += nums[i];
  }

  let maxSum = currentSum;
  // 滑动窗口
  for (let i = k; i < nums.length; i++) {
    currentSum = currentSum + nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum / k;
};

/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rCenter
 * @param {number} cCenter
 * @return {number[][]}
 */
var allCellsDistOrder = function (rows, cols, rCenter, cCenter) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid.push([r, c]);
    }
  }
  return grid.sort((a, b) => {
    const d1 = Math.abs(a[0] - rCenter) + Math.abs(a[1] - cCenter);
    const d2 = Math.abs(b[0] - rCenter) + Math.abs(b[1] - cCenter);
    return d1 - d2;
  });
};
