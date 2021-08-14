import { User } from '@prisma/client';
import { IHashProvider } from '@shared/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';

type RequestData = {
  user_id: string;
  password: string;
};

@injectable()
export class ChangeUserPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, user_id }: RequestData): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const hashedProvider = await this.hashProvider.generateHash(password);

    Object.assign(user, { password: hashedProvider });

    await this.usersRepository.save(user);

    return user;
  }
}
