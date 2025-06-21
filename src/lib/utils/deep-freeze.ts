export function deepFreeze<T>(object: T): T {
  Object.freeze(object);

  Object.getOwnPropertyNames(object).forEach((propName) => {
    const value = (object as any)[propName];
    if (
      value &&
      (typeof value === "object" || typeof value === "function") &&
      !Object.isFrozen(value)
    ) {
      deepFreeze(value);
    }
  });

  return object;
}
