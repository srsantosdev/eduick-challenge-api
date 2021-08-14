import { User } from '@prisma/client';
import { IHashProvider } from '@shared/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';

type RequestData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    name,
    password,
    username,
  }: RequestData): Promise<User> {
    const findByEmail = await this.usersRepository.findByEmail(email);

    if (findByEmail) {
      throw new AppError(
        'User with this email already exists',
        400,
        'USER_EMAIL_ALREADY_EXISTS',
      );
    }

    const findByUsername = await this.usersRepository.findByUsername(username);

    if (findByUsername) {
      throw new AppError(
        'User with this username already exists',
        400,
        'USERNAME_ALREADY_EXISTS',
      );
    }

    const hashedProvider = await this.hashProvider.generateHash(password);

    const createdUser = await this.usersRepository.create({
      email,
      name,
      password: hashedProvider,
      username,
    });

    return createdUser;
  }
}
