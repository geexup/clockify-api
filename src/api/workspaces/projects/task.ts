import { CKLError } from '../../../errors/clockify.error';
import { ApiSubroute } from '../../../subroute';
import { CKLTask } from '../../../interfaces/task.interface';

export class CKLTaskExistsError extends CKLError {
  constructor() {
    super(400, 'Task with that name already exists on project, or specified project doesn\'t exist');
  }
}

export interface CKLTaskGetRequest {
  /** If provided, tasks will be filtered by name */
  name?: string;
  /** If provided and true, only active tasks will be returned. Otherwise only finished tasks will be returned. */
  'is-active'?: boolean;
  page?: number;
  'page-size'?: number;
}

export class TasksRoute extends ApiSubroute {
  /** Find tasks on project */
  get(params: CKLTaskGetRequest = {
    page: 1,
    'page-size': 50
  }): Promise<Array<CKLTask>> {
    return this.makeApiRequest('', 'GET', params);
  }

  /** Add a new task on project */
  async post(body: CKLTask): Promise<CKLTask> {
    try {
      return await this.makeApiRequest('', 'POST', body);
    } catch (e) {
      if ((e as CKLError).code === 400) throw new CKLTaskExistsError();
      throw e;
    }
  }
}