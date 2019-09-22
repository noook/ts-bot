export function uniqBy<T>(input: T[], key: string): T[] {
  const data = {};

  input.forEach((entry: T) => {
    data[entry[key]] = entry;
  });

  return Object.values(data);
}
