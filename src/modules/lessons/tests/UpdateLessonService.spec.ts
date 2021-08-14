import AppError from '@shared/errors/AppError';
import { FakeLessonsRepository } from '../repositories/fakes/FakeLessonsRepository';
import { UpdateLessonService } from '../services/UpdateLessonService';

let fakeLessonsRepository: FakeLessonsRepository;

let updateLessonService: UpdateLessonService;

describe('Update Lesson', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonsRepository();

    updateLessonService = new UpdateLessonService(fakeLessonsRepository);
  });

  it('should be able to update a lesson', async () => {
    const createdLesson = await fakeLessonsRepository.create({
      course_id: 'course_id',
      name: 'Lesson 1',
    });

    const lesson = await updateLessonService.execute({
      lesson_id: createdLesson.id,
      name: 'Update Lesson',
    });

    expect(lesson).toEqual(
      expect.objectContaining({
        name: 'Update Lesson',
      }),
    );
  });

  it('should not be able to show a lesson if it not found.', async () => {
    await expect(
      updateLessonService.execute({
        lesson_id: 'lesson_id',
        name: 'Update Lesson',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
