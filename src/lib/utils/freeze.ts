export function freeze<T>(object: T, deep: boolean = false): T {
  Object.freeze(object);

  if (deep)
    Object.getOwnPropertyNames(object).forEach((propName) => {
      const value = (object as any)[propName];
      if (
        value &&
        (typeof value === "object" || typeof value === "function") &&
        !Object.isFrozen(value)
      ) {
        freeze(value, deep);
      }
    });

  return object;
}
