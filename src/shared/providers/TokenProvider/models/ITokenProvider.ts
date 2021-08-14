interface PayloadToken {
  [key: string]: any;
}

export interface ParametersTokenProvider {
  payload: PayloadToken;
  secret?: string;
  options?: any;
}

export interface ITokenProvider {
  generateToken(data: ParametersTokenProvider): string;
}
