import AppError from '@shared/errors/AppError';

import { FakeCoursesRepository } from '@modules/courses/repositories/fakes/FakeCoursesRepository';
import { FakeLessonsRepository } from '../repositories/fakes/FakeLessonsRepository';
import { CreateLessonService } from '../services/CreateLessonService';

let fakeLessonsRepository: FakeLessonsRepository;
let fakeCoursesRepository: FakeCoursesRepository;

let createLessonService: CreateLessonService;

describe('Create Lesson', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonsRepository();
    fakeCoursesRepository = new FakeCoursesRepository();

    createLessonService = new CreateLessonService(
      fakeLessonsRepository,
      fakeCoursesRepository,
    );
  });

  it('should be able to create a lesson', async () => {
    const course = await fakeCoursesRepository.create({
      image: 'course1.png',
      stars: 5,
      title: 'Course 1',
    });

    const lesson = await createLessonService.execute({
      course_id: course.id,
      name: 'Lesson 1',
    });

    expect(lesson).toHaveProperty('id');
    expect(lesson.name).toBe('Lesson 1');
  });

  it('should not be able to create lesson if course not found', async () => {
    await expect(
      createLessonService.execute({
        course_id: 'course_id',
        name: 'Lesson 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
