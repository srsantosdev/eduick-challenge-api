import { Router } from 'express';

import { LessonsController } from '@modules/lessons/core/http/controllers/LessonsController';

const lessonsRouter = Router();
const lessonsController = new LessonsController();

lessonsRouter.post('/', lessonsController.create);
lessonsRouter.get('/', lessonsController.index);
lessonsRouter.get('/:lesson_id', lessonsController.show);
lessonsRouter.put('/:lesson_id', lessonsController.update);
lessonsRouter.delete('/:lesson_id', lessonsController.delete);

export { lessonsRouter };
