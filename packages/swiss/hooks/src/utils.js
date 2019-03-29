export const defer =
  typeof Promise == 'function'
    ? Promise.prototype.then.bind(Promise.resolve())
    : setTimeout;

export function argsChanged(oldArgs, newArgs) {
  return (
    oldArgs == null || newArgs.some((arg, index) => arg !== oldArgs[index])
  );
}

export function invokeOrReturn(arg, f) {
  return typeof f === 'function' ? f(arg) : f;
}
