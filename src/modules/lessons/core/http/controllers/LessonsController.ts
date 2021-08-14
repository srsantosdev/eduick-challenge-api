import { CreateLessonService } from '@modules/lessons/services/CreateLessonService';
import { ListLessonsService } from '@modules/lessons/services/ListLessonsService';
import { RemoveLessonService } from '@modules/lessons/services/RemoveLessonService';
import { ShowLessonService } from '@modules/lessons/services/ShowLessonService';
import { UpdateLessonService } from '@modules/lessons/services/UpdateLessonService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class LessonsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { course_id } = request.query;
    const { name } = request.body;

    const createLessonService = container.resolve(CreateLessonService);

    const lesson = await createLessonService.execute({
      course_id: String(course_id),
      name,
    });

    return response.json(lesson).status(201);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { course_id } = request.query;

    const listLessonsService = container.resolve(ListLessonsService);

    const lessons = await listLessonsService.execute({
      course_id: String(course_id),
    });

    return response.json(lessons);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { lesson_id } = request.params;

    const showLessonService = container.resolve(ShowLessonService);

    const lesson = await showLessonService.execute({ lesson_id });

    return response.json(lesson);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { lesson_id } = request.params;
    const { name } = request.body;

    const updateLessonService = container.resolve(UpdateLessonService);

    const lesson = await updateLessonService.execute({ lesson_id, name });

    return response.json(lesson);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { lesson_id } = request.params;

    const removeLessonService = container.resolve(RemoveLessonService);

    await removeLessonService.execute({ lesson_id });

    return response.status(204).send();
  }
}
