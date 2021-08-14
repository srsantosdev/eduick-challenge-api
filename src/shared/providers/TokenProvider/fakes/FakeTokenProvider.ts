import {
  ParametersTokenProvider,
  ITokenProvider,
} from '../models/ITokenProvider';

export class FakeTokenProvider implements ITokenProvider {
  public generateToken({ payload }: ParametersTokenProvider): string {
    return JSON.stringify(payload);
  }
}
