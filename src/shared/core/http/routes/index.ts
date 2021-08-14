import { Router } from 'express';

import { coursesRouter } from '@modules/courses/core/http/routes/courses.routes';
import { lessonsRouter } from '@modules/lessons/core/http/routes/lessons.routes';
import { usersRouter } from '@modules/users/core/http/routes/users.routes';

const router = Router();

router.use('/courses', coursesRouter);
router.use('/lessons', lessonsRouter);
router.use('/users', usersRouter);

export const appRouter = router;
