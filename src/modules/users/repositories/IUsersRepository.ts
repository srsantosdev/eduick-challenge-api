import { User } from '@prisma/client';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

export interface IUsersRepository {
  all(): Promise<User[]>;
  create(data: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  remove(user_id: string): Promise<void>;
}
