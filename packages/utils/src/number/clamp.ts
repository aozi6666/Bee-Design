export function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return value;
  if (min > max) [min, max] = [max, min];
  return Math.min(Math.max(value, min), max);
}
