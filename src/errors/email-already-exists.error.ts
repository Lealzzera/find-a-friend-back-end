export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("E-mail provided already exists.");
  }
}
