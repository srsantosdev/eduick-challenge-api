import AppError from '@shared/errors/AppError';
import { FakeCoursesRepository } from '../repositories/fakes/FakeCoursesRepository';
import { ShowCourseService } from '../services/ShowCourseService';

let fakeCoursesRepository: FakeCoursesRepository;

let showCourseService: ShowCourseService;

describe('Show Course', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();

    showCourseService = new ShowCourseService(fakeCoursesRepository);
  });

  it('should be able to show a course', async () => {
    const createdCourse = await fakeCoursesRepository.create({
      image: 'course1.png',
      stars: 5,
      title: 'Course 1',
    });

    const course = await showCourseService.execute({
      course_id: createdCourse.id,
    });

    expect(course).toEqual(
      expect.objectContaining({
        title: 'Course 1',
      }),
    );
  });

  it('should not be able to show a course if it not exists', async () => {
    await expect(
      showCourseService.execute({
        course_id: 'not-exist-course',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
