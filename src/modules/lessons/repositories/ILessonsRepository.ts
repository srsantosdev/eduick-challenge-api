import { Lesson } from '@prisma/client';
import { CreateLessonDTO } from '../dtos/CreateLessonDTO';

export interface ILessonsRepository {
  create(data: CreateLessonDTO): Promise<Lesson>;
  findById(id: string): Promise<Lesson | undefined>;
  filterByCourse(course_id: string): Promise<Lesson[]>;
  save(lesson: Lesson): Promise<Lesson>;
  remove(id: string): Promise<void>;
}
