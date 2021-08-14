import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, username } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { token, user } = await authenticateUserService.execute({
      password,
      username,
    });

    return response.json({ token, user });
  }
}
