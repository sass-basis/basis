export function uniqueId(prefix) {
  const random = Math.floor((Math.random() * (9999999 - 1000000)) + 1000000);
  const time   = new Date().getTime();
  return `${ prefix }-${ time }${ random }`;
}
