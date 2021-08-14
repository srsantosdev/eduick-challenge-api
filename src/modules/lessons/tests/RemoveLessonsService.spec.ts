import AppError from '@shared/errors/AppError';
import { FakeLessonsRepository } from '../repositories/fakes/FakeLessonsRepository';
import { RemoveLessonService } from '../services/RemoveLessonService';

let fakeLessonsRepository: FakeLessonsRepository;

let removeLessonService: RemoveLessonService;

describe('Remove Lesson', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonsRepository();

    removeLessonService = new RemoveLessonService(fakeLessonsRepository);
  });

  it('should be able to remove a lesson', async () => {
    const removeLesson = jest.spyOn(fakeLessonsRepository, 'remove');

    const lesson = await fakeLessonsRepository.create({
      course_id: 'course_id',
      name: 'Lesson 1',
    });

    await removeLessonService.execute({
      lesson_id: lesson.id,
    });

    expect(removeLesson).toHaveBeenCalledWith(lesson.id);
  });

  it('should not be able to remove a lesson if it not found', async () => {
    await expect(
      removeLessonService.execute({ lesson_id: 'lesson_id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
