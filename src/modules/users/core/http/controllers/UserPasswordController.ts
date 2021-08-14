import { ChangeUserPasswordService } from '@modules/users/services/ChangeUserPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UserPasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { password } = request.body;

    const changeUserPasswordService = container.resolve(
      ChangeUserPasswordService,
    );

    const user = await changeUserPasswordService.execute({ password, user_id });

    return response.json(user);
  }
}
