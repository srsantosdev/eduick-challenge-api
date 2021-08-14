import * as jwt from 'jsonwebtoken';
import { auth } from '@config/auth';

import {
  ParametersTokenProvider,
  ITokenProvider,
} from '../models/ITokenProvider';

export class JWTTokenProvider implements ITokenProvider {
  public generateToken({
    payload,
    secret,
    options,
  }: ParametersTokenProvider): string {
    const { expiresIn, secrets } = auth.jwt;

    const token = jwt.sign(payload, secret || secrets.appSecret, {
      expiresIn,
      ...options,
    });

    return token;
  }
}
