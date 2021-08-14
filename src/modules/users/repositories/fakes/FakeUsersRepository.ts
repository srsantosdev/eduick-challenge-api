import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async all(): Promise<User[]> {
    return this.users;
  }

  public async create({
    email,
    name,
    username,
    password,
  }: CreateUserDTO): Promise<User> {
    const user: User = {
      id: uuid(),
      email,
      name,
      username,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.id === id);

    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.username === username);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.email === email);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndexUser = this.users.findIndex(
      findUser => findUser.id === user.id,
    );

    Object.assign(user, { updated_at: new Date() });

    this.users[findIndexUser] = user;

    return user;
  }

  public async remove(user_id: string): Promise<void> {
    const findIndexUser = this.users.findIndex(
      findUser => findUser.id === user_id,
    );

    this.users.splice(findIndexUser, 1);
  }
}
