export class InvalidSizeError extends Error {
  constructor() {
    super("The pet must to has a valid size such as SMALL, MEDIUM or LARGE.");
  }
}
