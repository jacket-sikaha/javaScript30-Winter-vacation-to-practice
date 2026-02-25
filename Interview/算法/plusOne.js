/**
 * 给定一个表示 大整数 的整数数组 digits，
 * 其中 digits[i] 是整数的第 i 位数字。
 * 这些数字按从左到右，从最高位到最低位排列。这个大整数不包含任何前导 0。
将大整数加 1，并返回结果的数字数组。
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let plus = 1;
  for (let i = digits.length - 1; i >= 0; i--) {
    const element = digits[i];
    if (element + plus >= 10) {
      digits[i] = (element + plus) % 10;
    } else {
      digits[i] = (element + plus) % 10;
      plus = 0;
      break;
    }
  }
  if (plus) {
    digits.unshift(plus);
  }
  return digits;
};
plusOne([1, 2, 3]);
