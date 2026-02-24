/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */

// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。

// 假设 nums 中不等于 val 的元素数量为 k，要通过此题，您需要执行以下操作：

// 更改 nums 数组，使 nums 的前 k 个元素包含不等于 val 的元素。nums 的其余元素和 nums 的大小并不重要。
// 返回 k。
var removeElement = function (nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    if (element !== val) {
      k++;
      continue;
    }
    nums.splice(i, 1);
    i--;
  }
  return k;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    let mid = (l + r) >> 1;
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return l;
};
(0, 1, 2, 3, 4, 5);
(1, 3, 5, 6);

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let l = 0;
    let r = n;

    while (l <= r) {
      let mid = Math.floor(l - (l - r) / 2);
      if (isBadVersion(mid)) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
};
(0, 1, 2, 3);
