import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ILessonsRepository } from '../repositories/ILessonsRepository';

type RequestData = {
  lesson_id: string;
};

@injectable()
export class RemoveLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  public async execute({ lesson_id }: RequestData): Promise<void> {
    const lesson = await this.lessonsRepository.findById(lesson_id);

    if (!lesson) {
      throw new AppError('Lesson not found', 404, 'LESSON_NOT_FOUND');
    }

    await this.lessonsRepository.remove(lesson_id);
  }
}
