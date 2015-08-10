export class TestUtils {
  static prettyPrint (data) {
    return (typeof data === 'string' || typeof data === 'function' || data instanceof RegExp)
        ? data
        : JSON.stringify(data);
  }
}