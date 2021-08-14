import { container } from 'tsyringe';

import '@shared/providers/HashProvider';
import '@shared/providers/TokenProvider';

import { PrismaCoursesRepository } from '@modules/courses/core/prisma/repositories/PrismaCoursesRepository';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';

import { PrismaLessonsRepository } from '@modules/lessons/core/prisma/repositories/PrismaLessonsRepository';
import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';

import { PrismaUsersRepository } from '@modules/users/core/prisma/repositories/PrismaUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<ICoursesRepository>(
  'CoursesRepository',
  PrismaCoursesRepository,
);

container.registerSingleton<ILessonsRepository>(
  'LessonsRepository',
  PrismaLessonsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PrismaUsersRepository,
);
