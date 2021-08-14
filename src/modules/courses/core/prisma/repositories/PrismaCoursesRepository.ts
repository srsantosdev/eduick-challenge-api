import { CreateCourseDTO } from '@modules/courses/dtos/CreateCourseDTO';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { Course } from '@prisma/client';

import { client } from '@shared/core/prisma/client';

export class PrismaCoursesRepository implements ICoursesRepository {
  public async all(): Promise<Course[]> {
    const courses = await client.course.findMany();

    return courses;
  }

  public async create({
    image,
    stars,
    title,
  }: CreateCourseDTO): Promise<Course> {
    const createdCourse = await client.course.create({
      data: { image, stars, title },
    });

    return createdCourse;
  }

  public async findById(id: string): Promise<Course | undefined> {
    const course = await client.course.findUnique({
      where: { id },
    });

    return course || undefined;
  }

  public async save(course: Course): Promise<Course | undefined> {
    const updatedCourse = await client.course.update({
      where: { id: course.id },
      data: { ...course },
    });

    return updatedCourse || undefined;
  }

  public async remove(id: string): Promise<void> {
    await client.course.delete({
      where: { id },
    });
  }
}
