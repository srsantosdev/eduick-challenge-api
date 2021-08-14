import AppError from '@shared/errors/AppError';
import { FakeLessonsRepository } from '../repositories/fakes/FakeLessonsRepository';
import { ShowLessonService } from '../services/ShowLessonService';

let fakeLessonsRepository: FakeLessonsRepository;

let showLessonService: ShowLessonService;

describe('Show Lesson', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonsRepository();

    showLessonService = new ShowLessonService(fakeLessonsRepository);
  });

  it('should be able to show a lesson', async () => {
    const createdLesson = await fakeLessonsRepository.create({
      course_id: 'course_id',
      name: 'Lesson 1',
    });

    const lesson = await showLessonService.execute({
      lesson_id: createdLesson.id,
    });

    expect(lesson).toEqual(createdLesson);
  });

  it('should not be able to show a lesson if it not found.', async () => {
    await expect(
      showLessonService.execute({ lesson_id: 'lesson_id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
