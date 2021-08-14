import { CreateCourseService } from '@modules/courses/services/CreateCourseService';
import { ListCoursesService } from '@modules/courses/services/ListCoursesService';
import { RemoveCourseService } from '@modules/courses/services/RemoveCourseService';
import { ShowCourseService } from '@modules/courses/services/ShowCourseService';
import { UpdateCourseService } from '@modules/courses/services/UpdateCourseService';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CoursesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { image, stars, title } = request.body;

    const createCourseService = container.resolve(CreateCourseService);

    const course = await createCourseService.execute({ image, stars, title });

    return response.json(course).status(201);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCoursesService = container.resolve(ListCoursesService);

    const courses = await listCoursesService.execute();

    return response.json(courses);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { course_id } = request.params;

    const showCourseService = container.resolve(ShowCourseService);

    const course = await showCourseService.execute({ course_id });

    return response.json(course);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { course_id } = request.params;
    const { image, stars, title } = request.body;

    const updateCourseService = container.resolve(UpdateCourseService);

    const course = await updateCourseService.execute({
      course_id,
      image,
      stars,
      title,
    });

    return response.json(course);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { course_id } = request.params;

    const deleteCourseService = container.resolve(RemoveCourseService);

    await deleteCourseService.execute({ course_id });

    return response.status(204).send();
  }
}
