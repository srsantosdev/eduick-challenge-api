import { FakeCoursesRepository } from '../repositories/fakes/FakeCoursesRepository';
import { ListCoursesService } from '../services/ListCoursesService';

let fakeCoursesRepository: FakeCoursesRepository;

let listCoursesService: ListCoursesService;

describe('List Courses', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();

    listCoursesService = new ListCoursesService(fakeCoursesRepository);
  });

  it('should be able to list all courses', async () => {
    await fakeCoursesRepository.create({
      image: 'course1.png',
      stars: 5,
      title: 'Course 1',
    });

    await fakeCoursesRepository.create({
      image: 'course2.png',
      stars: 2,
      title: 'Course 2',
    });

    const courses = await listCoursesService.execute();

    expect(courses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Course 1',
        }),
        expect.objectContaining({
          title: 'Course 2',
        }),
      ]),
    );
  });
});
