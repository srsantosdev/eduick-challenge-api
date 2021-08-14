import AppError from '@shared/errors/AppError';

import { FakeHashProvider } from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { ChangeUserPasswordService } from '../services/ChangeUserPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let changeUserPasswordService: ChangeUserPasswordService;

describe('Change User Password', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    changeUserPasswordService = new ChangeUserPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to change a user password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const createdUser = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456789',
      username: 'johndoe',
    });

    await changeUserPasswordService.execute({
      user_id: createdUser.id,
      password: 'new-password',
    });

    expect(generateHash).toHaveBeenCalledWith('new-password');
  });

  it('should not be able to change a user if it not found', async () => {
    await expect(
      changeUserPasswordService.execute({
        user_id: 'user_id',
        password: '987654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
