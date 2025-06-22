export function deepEqual(obj1: unknown, obj2: unknown): boolean {
  // TODO: Make it production ready
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
