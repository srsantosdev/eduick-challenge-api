import { Router } from 'express';
import { SessionsController } from '../controllers/SessionsController';
import { UserPasswordController } from '../controllers/UserPasswordController';
import { UsersController } from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();
const userPasswordController = new UserPasswordController();
const sessionController = new SessionsController();

usersRouter.post('/auth', sessionController.create);
usersRouter.put('/change-password/:user_id', userPasswordController.update);

usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.index);
usersRouter.get('/:user_id', usersController.show);
usersRouter.put('/:user_id', usersController.update);
usersRouter.delete('/:user_id', usersController.delete);

export { usersRouter };
