export class InvalidParamTypeError extends Error {
  constructor(paramName: string, expectedType: string) {
    super(`Invalid param: ${paramName} must be a ${expectedType}`);
    this.name = "InvalidParamTypeError";
  }
}
