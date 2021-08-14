import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { auth } from '@config/auth';
import AppError from '@shared/errors/AppError';

import { IHashProvider } from '@shared/providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '@shared/providers/TokenProvider/models/ITokenProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

type RequestData = {
  username: string;
  password: string;
};

type ResponseData = {
  user: User;
  token: string;
};

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({
    password,
    username,
  }: RequestData): Promise<ResponseData> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError(
        'Incorrect credentials.',
        401,
        'INCORRECT_AUTH_COMBINATION',
      );
    }
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError(
        'Incorrect credentials.',
        401,
        'INCORRECT_AUTH_COMBINATION',
      );
    }

    const token = this.tokenProvider.generateToken({
      payload: { sub: user.id },
      secret: auth.jwt.secrets.appSecret,
    });

    return {
      user,
      token,
    };
  }
}
