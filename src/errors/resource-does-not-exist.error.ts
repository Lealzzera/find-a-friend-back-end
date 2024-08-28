export class ResourceDoesNotExistError extends Error {
  constructor() {
    super("Resource does not exist.");
  }
}
