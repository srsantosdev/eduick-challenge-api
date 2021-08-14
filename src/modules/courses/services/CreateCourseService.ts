import { Course } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ICoursesRepository } from '../repositories/ICoursesRepository';

type RequestData = {
  title: string;
  stars: number;
  image: string;
};

@injectable()
export class CreateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ image, title, stars }: RequestData): Promise<Course> {
    const createdCourse = await this.coursesRepository.create({
      image,
      stars,
      title,
    });

    return createdCourse;
  }
}
