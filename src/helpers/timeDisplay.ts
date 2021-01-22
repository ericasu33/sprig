export function totalTimeUsed (seconds: number) {
  const hour = Math.floor(seconds % (3600 * 24) / 3600);
  const minute = Math.floor(seconds % 3600 / 60);
  const second = Math.floor(seconds % 60);

  return `${hour} : ${minute} : ${second}`
}


