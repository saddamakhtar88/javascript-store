export function isFunction(value: unknown): value is Function {
  return !!value && typeof value === "function";
}
