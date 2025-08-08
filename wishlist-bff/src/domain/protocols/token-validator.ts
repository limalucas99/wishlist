export interface TokenValidator {
  validate: (token: string) => Promise<TokenValidator.Result>;
}

export namespace TokenValidator {
  export interface Result {
    customerId: string;
    email: string;
  }
}
