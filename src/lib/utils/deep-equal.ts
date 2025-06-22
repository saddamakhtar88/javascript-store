export function deepEqual(obj1: unknown, obj2: unknown): boolean {
  if (Object.is(obj1, obj2)) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  )
    return false;

  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  if (keysObj1.length !== keysObj2.length) return false;

  for (const key of keysObj1) {
    if (!keysObj2.includes(key)) return false;

    if (!deepEqual((obj1 as any)[key], (obj2 as any)[key])) return false;
  }

  return true;
}
