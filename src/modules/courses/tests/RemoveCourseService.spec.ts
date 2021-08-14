import AppError from '@shared/errors/AppError';
import { FakeCoursesRepository } from '../repositories/fakes/FakeCoursesRepository';
import { RemoveCourseService } from '../services/RemoveCourseService';

let fakeCoursesRepository: FakeCoursesRepository;

let removeCourseService: RemoveCourseService;

describe('Remove Course', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();

    removeCourseService = new RemoveCourseService(fakeCoursesRepository);
  });

  it('should be able to remove a course', async () => {
    const removeCourse = jest.spyOn(fakeCoursesRepository, 'remove');

    const createdCourse = await fakeCoursesRepository.create({
      image: 'course1.png',
      stars: 5,
      title: 'Course 1',
    });

    await removeCourseService.execute({
      course_id: createdCourse.id,
    });

    expect(removeCourse).toHaveBeenCalledWith(createdCourse.id);
  });

  it('should not be able to remove a course if it not exists', async () => {
    await expect(
      removeCourseService.execute({
        course_id: 'not-exist-course',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
