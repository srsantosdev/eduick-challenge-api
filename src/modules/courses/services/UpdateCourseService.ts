import { Course } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICoursesRepository } from '../repositories/ICoursesRepository';

type RequestData = {
  course_id: string;
  title?: string;
  stars?: number;
  image?: string;
};

@injectable()
export class UpdateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({
    course_id,
    image,
    title,
    stars,
  }: RequestData): Promise<Course> {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError('Course not found', 404, 'COURSE_NOT_FOUND');
    }

    Object.assign(course, { image, title, stars });

    await this.coursesRepository.save(course);

    return course;
  }
}
