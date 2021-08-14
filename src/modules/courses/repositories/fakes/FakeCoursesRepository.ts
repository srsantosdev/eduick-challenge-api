import { v4 as uuid } from 'uuid';

import { Course } from '@prisma/client';
import { CreateCourseDTO } from '@modules/courses/dtos/CreateCourseDTO';
import { ICoursesRepository } from '../ICoursesRepository';

export class FakeCoursesRepository implements ICoursesRepository {
  private courses: Course[] = [];

  public async all(): Promise<Course[]> {
    return this.courses;
  }

  public async create({
    image,
    stars,
    title,
  }: CreateCourseDTO): Promise<Course> {
    const course: Course = {
      id: uuid(),
      image,
      stars,
      title,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.courses.push(course);

    return course;
  }

  public async findById(id: string): Promise<Course | undefined> {
    const course = this.courses.find(findCourse => findCourse.id === id);

    return course;
  }

  public async save(course: Course): Promise<Course | undefined> {
    const findIndexCourse = this.courses.findIndex(
      findCourse => findCourse.id === course.id,
    );

    Object.assign(course, { updated_at: new Date() });

    this.courses[findIndexCourse] = course;

    return course;
  }

  public async remove(id: string): Promise<void> {
    const findIndexCourse = this.courses.findIndex(
      findCourse => findCourse.id === id,
    );

    this.courses.splice(findIndexCourse, 1);
  }
}
