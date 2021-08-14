import { Course } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ICoursesRepository } from '../repositories/ICoursesRepository';

@injectable()
export class ListCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(): Promise<Course[]> {
    const courses = await this.coursesRepository.all();

    return courses;
  }
}
