export default function withDefaultValue<T extends object>(obj: T, key: string, defaultValue: any) {
  if (obj.hasOwnProperty(key) && typeof obj[key] !== 'undefined') {
    return obj;
  }

  obj[key] = defaultValue;
  return obj;
};
