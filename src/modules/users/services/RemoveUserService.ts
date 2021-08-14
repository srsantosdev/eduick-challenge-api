import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';

type RequestData = {
  user_id: string;
};

@injectable()
export class RemoveUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: RequestData): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    await this.usersRepository.remove(user_id);
  }
}
