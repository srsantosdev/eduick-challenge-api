import { CreateUserService } from '@modules/users/services/CreateUserService';
import { ListUsersService } from '@modules/users/services/ListUsersService';
import { RemoveUserService } from '@modules/users/services/RemoveUserService';
import { ShowUserService } from '@modules/users/services/ShowUserService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, name, password, username } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      name,
      password,
      username,
    });

    return response.json(user).status(201);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute();

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { email, name, password, username } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      user_id,
      email,
      name,
      password,
      username,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const removeUserService = container.resolve(RemoveUserService);

    await removeUserService.execute({ user_id });

    return response.status(204).send();
  }
}
