/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} ops
 * @return {number}
 */
var maxCount = function (m, n, ops) {
  const common = [m, n];
  for (let i = 0; i < ops.length; i++) {
    const [a, b] = ops[i];
    common[0] = Math.min(common[0], a);
    common[1] = Math.min(common[1], b);
  }
  return common[0] * common[1];
};
