import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { Lesson } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ILessonsRepository } from '../repositories/ILessonsRepository';

type RequestData = {
  course_id: string;
};

@injectable()
export class ListLessonsService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ course_id }: RequestData): Promise<Lesson[]> {
    const findCourse = await this.coursesRepository.findById(course_id);

    if (!findCourse) {
      throw new AppError('Course not found', 404, 'COURSE_NOT_FOUND');
    }

    const lessons = await this.lessonsRepository.filterByCourse(course_id);

    return lessons;
  }
}
