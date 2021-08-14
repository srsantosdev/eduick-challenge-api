import { Course } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICoursesRepository } from '../repositories/ICoursesRepository';

type RequestData = {
  course_id: string;
};

@injectable()
export class ShowCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ course_id }: RequestData): Promise<Course> {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError('Course not found', 404, 'COURSE_NOT_FOUND');
    }

    return course;
  }
}
