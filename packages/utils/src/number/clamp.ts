/**
 * 限制值 在最小值和最大值之间
 * @param value 要限制的值
 * @param min 最小值
 * @param max 最大值
 * ### 例如：clamp(10, 0, 5) => 5
 * ### 例如：clamp(-1, 5, 0) => 0
 */

export function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return value;
  // 自动调整 不可理的参数顺序
  if (min > max) [min, max] = [max, min];
  // 返回限制后的值
  return Math.min(Math.max(value, min), max);
}
