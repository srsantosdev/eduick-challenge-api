import AppError from '@shared/errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { ShowUserService } from '../services/ShowUserService';

let fakeUsersRepository: FakeUsersRepository;

let showUserService: ShowUserService;

describe('Show User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserService = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to show a user', async () => {
    const createdUser = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456789',
      username: 'johndoe',
    });

    const user = await showUserService.execute({
      user_id: createdUser.id,
    });

    expect(user).toEqual(createdUser);
  });

  it('should not be able to show a user if it not found', async () => {
    await expect(
      showUserService.execute({
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
