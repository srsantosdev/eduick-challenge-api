import { CreateLessonDTO } from '@modules/lessons/dtos/CreateLessonDTO';
import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';
import { Lesson } from '@prisma/client';
import { client } from '@shared/core/prisma/client';

export class PrismaLessonsRepository implements ILessonsRepository {
  public async create({ course_id, name }: CreateLessonDTO): Promise<Lesson> {
    const createdLesson = await client.lesson.create({
      data: {
        name,
        course_id,
      },
    });

    return createdLesson;
  }

  public async findById(id: string): Promise<Lesson | undefined> {
    const lesson = await client.lesson.findUnique({ where: { id } });

    return lesson || undefined;
  }

  public async filterByCourse(course_id: string): Promise<Lesson[]> {
    const lessons = await client.lesson.findMany({ where: { course_id } });

    return lessons;
  }

  public async save(lesson: Lesson): Promise<Lesson> {
    const updatedLesson = await client.lesson.update({
      where: { id: lesson.id },
      data: { ...lesson },
    });

    return updatedLesson;
  }

  public async remove(id: string): Promise<void> {
    await client.lesson.delete({
      where: { id },
    });
  }
}
