import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { User } from '@prisma/client';
import { client } from '@shared/core/prisma/client';

export class PrismaUsersRepository implements IUsersRepository {
  public async all(): Promise<User[]> {
    const users = await client.user.findMany();

    return users;
  }

  public async create({
    email,
    name,
    password,
    username,
  }: CreateUserDTO): Promise<User> {
    const user = await client.user.create({
      data: { email, name, password, username },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await client.user.findUnique({
      where: { id },
    });

    return user || undefined;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await client.user.findFirst({
      where: { username },
    });

    return user || undefined;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await client.user.findFirst({
      where: { email },
    });

    return user || undefined;
  }

  public async save(user: User): Promise<User> {
    const updatedUser = await client.user.update({
      where: { id: user.id },
      data: { ...user },
    });

    return updatedUser;
  }

  public async remove(user_id: string): Promise<void> {
    await client.user.delete({
      where: { id: user_id },
    });
  }
}
