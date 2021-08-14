import AppError from '@shared/errors/AppError';

import { FakeHashProvider } from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CreateUserService } from '../services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUserService: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a user', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const createdUser = await createUserService.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456789',
      username: 'johndoe',
    });

    expect(generateHash).toHaveBeenCalledWith('123456789');
    expect(createdUser).toHaveProperty('id');
  });

  it('should not be able to create a user with email already exists', async () => {
    await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456789',
      username: 'johndoe',
    });

    await expect(
      createUserService.execute({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123456789',
        username: 'johndoe1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user with username already exists', async () => {
    await fakeUsersRepository.create({
      email: 'johndoe1@example.com',
      name: 'John Doe',
      password: '123456789',
      username: 'johndoe',
    });

    await expect(
      createUserService.execute({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123456789',
        username: 'johndoe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
