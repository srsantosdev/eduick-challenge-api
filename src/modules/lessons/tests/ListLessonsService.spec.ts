import { FakeCoursesRepository } from '@modules/courses/repositories/fakes/FakeCoursesRepository';
import AppError from '@shared/errors/AppError';
import { FakeLessonsRepository } from '../repositories/fakes/FakeLessonsRepository';
import { ListLessonsService } from '../services/ListLessonsService';

let fakeLessonsRepository: FakeLessonsRepository;
let fakeCoursesRepository: FakeCoursesRepository;

let listLessonsService: ListLessonsService;

describe('List Lessons', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonsRepository();
    fakeCoursesRepository = new FakeCoursesRepository();

    listLessonsService = new ListLessonsService(
      fakeLessonsRepository,
      fakeCoursesRepository,
    );
  });

  it('should be able to list lessons', async () => {
    const course = await fakeCoursesRepository.create({
      image: 'course1.png',
      stars: 5,
      title: 'Course 1',
    });

    const lesson1 = await fakeLessonsRepository.create({
      course_id: course.id,
      name: 'Lesson 1',
    });

    const lesson2 = await fakeLessonsRepository.create({
      course_id: course.id,
      name: 'Lesson 2',
    });

    const lessons = await listLessonsService.execute({ course_id: course.id });

    expect(lessons).toEqual(expect.arrayContaining([lesson1, lesson2]));
  });

  it("should not be able to list course's lessons if course not found", async () => {
    await expect(
      listLessonsService.execute({ course_id: 'course_id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
