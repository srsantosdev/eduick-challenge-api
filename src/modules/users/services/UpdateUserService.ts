import { User } from '@prisma/client';
import { IHashProvider } from '@shared/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';

type RequestData = {
  user_id: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
};

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    email,
    name,
    password,
    username,
  }: RequestData): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    if (password) {
      const hashedProvider = await this.hashProvider.generateHash(password);

      Object.assign(user, { password: hashedProvider });
    }

    Object.assign(user, { email, name, username });

    await this.usersRepository.save(user);

    return user;
  }
}
