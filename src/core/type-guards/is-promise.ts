export function isPromise(value: unknown): value is Promise<unknown> {
  return !!value && typeof (value as any).then === "function";
}
