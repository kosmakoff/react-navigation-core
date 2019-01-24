export default function withDefaultValue<T extends object>(
  obj: T,
  key: string,
  defaultValue: any
): T {
  if (obj.hasOwnProperty(key) && typeof obj[key] !== 'undefined') {
    return obj;
  }

  obj[key] = defaultValue;
  return obj;
};
