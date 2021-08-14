import { FakeCoursesRepository } from '../repositories/fakes/FakeCoursesRepository';
import { CreateCourseService } from '../services/CreateCourseService';

let fakeCoursesRepository: FakeCoursesRepository;

let createCourseService: CreateCourseService;

describe('Create Course', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();

    createCourseService = new CreateCourseService(fakeCoursesRepository);
  });

  it('should be able to create a course', async () => {
    const course = await createCourseService.execute({
      image: 'course1.png',
      stars: 5,
      title: 'Course 1',
    });

    expect(course).toHaveProperty('id');
    expect(course.title).toBe('Course 1');
    expect(course.stars).toEqual(5);
  });
});
