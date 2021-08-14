import AppError from '@shared/errors/AppError';

import { FakeHashProvider } from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import { FakeTokenProvider } from '@shared/providers/TokenProvider/fakes/FakeTokenProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;

let authenticateUserService: AuthenticateUserService;

describe('Authenticate user', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
  });

  it('should be able to authenticate a user with email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456789',
      username: 'johndoe',
    });

    const response = await authenticateUserService.execute({
      username: 'johndoe',
      password: '123456789',
    });

    expect(response.token).toBeTruthy();
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate a non-existent user', async () => {
    await expect(
      authenticateUserService.execute({
        username: 'johndoe',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with invalid password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456789',
      username: 'johndoe',
    });

    await expect(
      authenticateUserService.execute({
        username: 'johndoe',
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
