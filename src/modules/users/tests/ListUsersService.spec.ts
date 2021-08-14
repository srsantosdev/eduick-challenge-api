import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { ListUsersService } from '../services/ListUsersService';

let fakeUsersRepository: FakeUsersRepository;

let listUsersService: ListUsersService;

describe('List Users', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsersService = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list users', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456789',
      username: 'johndoe',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'maryann@example.com',
      name: 'Mary Ann',
      password: '123456789',
      username: 'maryann',
    });

    const users = await listUsersService.execute();

    expect(users).toEqual(expect.arrayContaining([user1, user2]));
  });
});
