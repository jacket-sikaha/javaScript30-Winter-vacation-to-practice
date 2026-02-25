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
1200304;
1230004;
