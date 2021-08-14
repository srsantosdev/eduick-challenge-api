import { v4 as uuid } from 'uuid';

import { Lesson } from '@prisma/client';
import { CreateLessonDTO } from '@modules/lessons/dtos/CreateLessonDTO';
import { ILessonsRepository } from '../ILessonsRepository';

export class FakeLessonsRepository implements ILessonsRepository {
  private lessons: Lesson[] = [];

  public async create({ course_id, name }: CreateLessonDTO): Promise<Lesson> {
    const lesson: Lesson = {
      id: uuid(),
      course_id,
      name,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.lessons.push(lesson);

    return lesson;
  }

  public async findById(id: string): Promise<Lesson | undefined> {
    const lesson = this.lessons.find(findLesson => findLesson.id === id);

    return lesson;
  }

  public async filterByCourse(course_id: string): Promise<Lesson[]> {
    const lessons = this.lessons.filter(
      lesson => lesson.course_id === course_id,
    );

    return lessons;
  }

  public async save(lesson: Lesson): Promise<Lesson> {
    const findIndexLesson = this.lessons.findIndex(
      findLesson => findLesson.id === lesson.id,
    );

    Object.assign(lesson, { updated_at: new Date() });

    this.lessons[findIndexLesson] = lesson;

    return lesson;
  }

  public async remove(id: string): Promise<void> {
    const findIndexUser = this.lessons.findIndex(
      findLesson => findLesson.id === id,
    );

    this.lessons.splice(findIndexUser, 1);
  }
}
