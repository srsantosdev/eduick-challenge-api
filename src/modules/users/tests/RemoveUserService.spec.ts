import AppError from '@shared/errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { RemoveUserService } from '../services/RemoveUserService';

let fakeUsersRepository: FakeUsersRepository;

let removeUserService: RemoveUserService;

describe('Remove User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    removeUserService = new RemoveUserService(fakeUsersRepository);
  });

  it('should be able to remove a user', async () => {
    const removeUser = jest.spyOn(fakeUsersRepository, 'remove');

    const createdUser = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456789',
      username: 'johndoe',
    });

    await removeUserService.execute({
      user_id: createdUser.id,
    });

    expect(removeUser).toHaveBeenCalledWith(createdUser.id);
  });

  it('should not be able to remove a user if it not found', async () => {
    await expect(
      removeUserService.execute({
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
