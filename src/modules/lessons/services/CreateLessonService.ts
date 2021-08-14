import { Lesson } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { ILessonsRepository } from '../repositories/ILessonsRepository';

type RequestData = {
  name: string;
  course_id: string;
};

@injectable()
export class CreateLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ name, course_id }: RequestData): Promise<Lesson> {
    const findCourse = await this.coursesRepository.findById(course_id);

    if (!findCourse) {
      throw new AppError('Course not found', 404, 'COURSE_NOT_FOUND');
    }

    const createdLesson = await this.lessonsRepository.create({
      name,
      course_id: findCourse.id,
    });

    return createdLesson;
  }
}
