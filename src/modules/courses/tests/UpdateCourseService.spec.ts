import AppError from '@shared/errors/AppError';
import { FakeCoursesRepository } from '../repositories/fakes/FakeCoursesRepository';
import { UpdateCourseService } from '../services/UpdateCourseService';

let fakeCoursesRepository: FakeCoursesRepository;

let updateCourseService: UpdateCourseService;

describe('Update Course', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();

    updateCourseService = new UpdateCourseService(fakeCoursesRepository);
  });

  it('should be able to update a course', async () => {
    const createdCourse = await fakeCoursesRepository.create({
      image: 'course1.png',
      stars: 5,
      title: 'Course 1',
    });

    const course = await updateCourseService.execute({
      course_id: createdCourse.id,
      title: 'Update course',
    });

    expect(course).toEqual(
      expect.objectContaining({
        title: 'Update course',
      }),
    );
  });

  it('should not be able to update a course if it not exists', async () => {
    await expect(
      updateCourseService.execute({
        course_id: 'not-exist-course',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
