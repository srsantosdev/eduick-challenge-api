import AppError from '@shared/errors/AppError';

import { FakeHashProvider } from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { UpdateUserService } from '../services/UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateUserService: UpdateUserService;

describe('Update User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update a user', async () => {
    const createdUser = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456789',
      username: 'johndoe',
    });

    const user = await updateUserService.execute({
      user_id: createdUser.id,
      name: 'John Smith',
      username: 'johnsmith',
      email: 'johnsmith@example.com',
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Smith',
        username: 'johnsmith',
        email: 'johnsmith@example.com',
      }),
    );
  });

  it('should be able to update a user password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const createdUser = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456789',
      username: 'johndoe',
    });

    await updateUserService.execute({
      user_id: createdUser.id,
      name: 'John Smith',
      username: 'johnsmith',
      email: 'johnsmith@example.com',
      password: '987654321',
    });

    expect(generateHash).toHaveBeenCalledWith('987654321');
  });

  it('should not be able to update a user if it not found', async () => {
    await expect(
      updateUserService.execute({
        user_id: 'user_id',
        name: 'John Smith',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
