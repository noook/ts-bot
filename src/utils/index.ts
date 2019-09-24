export function uniqBy<T>(input: T[], key: string): T[] {
  const data = {};

  input.forEach((entry: T) => {
    data[entry[key]] = entry;
  });

  return Object.values(data);
}

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
