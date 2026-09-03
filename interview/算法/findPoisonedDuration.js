/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function (timeSeries, duration) {
  let count = 0;
  for (let i = 1; i < timeSeries.length; i++) {
    const pre = timeSeries[i - 1];
    const cur = timeSeries[i];
    // 相差时间间隔大于中毒持续时间，没有触发计数器 就直接加
    if (pre + duration - 1 < cur) {
      count += duration;
    } else {
      //  重新触发计数器，这段间隔就是中毒持续时间
      count += cur - pre;
    }
  }
  //   执行到最后一个时间点，因为没有别的触发时间了，直接加上该点的中毒持续时间
  return count + duration;
};
