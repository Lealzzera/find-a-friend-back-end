export class InvalidOrgCredentialsError extends Error {
  constructor() {
    super("Invalid ORG credentials.");
  }
}
