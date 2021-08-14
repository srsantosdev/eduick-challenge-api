import { Lesson } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ILessonsRepository } from '../repositories/ILessonsRepository';

type RequestData = {
  lesson_id: string;
  name?: string;
};

@injectable()
export class UpdateLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  public async execute({ lesson_id, name }: RequestData): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findById(lesson_id);

    if (!lesson) {
      throw new AppError('Lesson not found', 404, 'LESSON_NOT_FOUND');
    }

    Object.assign(lesson, { name });

    await this.lessonsRepository.save(lesson);

    return lesson;
  }
}
