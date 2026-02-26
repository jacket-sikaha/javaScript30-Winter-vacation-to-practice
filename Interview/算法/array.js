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
