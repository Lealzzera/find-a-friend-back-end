export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("User with same email already exists");
  }
}
