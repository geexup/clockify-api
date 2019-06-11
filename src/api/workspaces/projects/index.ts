import { CKLError } from '../../../errors/clockify.error';
import { CKLId } from '../../../interfaces/id.type';
import { CKLHourlyRate, CKLMembership } from '../../../interfaces/membership.interface';
import { ApiSubroute, ApiFunctionalProtocol } from '../../../subroute';
import { CKLProject } from '../../../interfaces/project.interface';
import { TasksRoute } from './task';
import { CKLEstimateRequest } from '../../../interfaces/estimate.interface';
import { CKLTaskRequest } from '../../../interfaces/task.interface';

export class CKLProjectExistsError extends CKLError {
  constructor() {
    super(400, 'Project with that name already exists on workspace.');
  }
}

export class CKLProjectNoIdError extends CKLError {
  constructor() {
    super(400, 'Project with that name already exists on workspace.');
  }
}

export interface CKLProjectGetRequest {
  /** If provided, projects will be filtered by name */
  name?: string;
  page?: number;
  'page-size'?: number;
}

export interface CKLProjectPostRequest {
  name: string;
  clientId: CKLId;
  isPublic: boolean;
  estimate: CKLEstimateRequest;
  color: string;
  billable: boolean;
  hourlyRate: CKLHourlyRate;
  memberships: Array<CKLMembership>;
  tasks: CKLTaskRequest;
}

export class ProjectsRoute extends ApiSubroute implements ApiFunctionalProtocol {
  /** Get sub routes (if call instance as a function) */
  __call__(projectId: CKLId) {
    const uri = `${this.uri}/${projectId}`;

    return {
      task: new TasksRoute(`${uri}/tasks`, this.main)
    }
  }

  /** Find projects on workspace */
  get(params: CKLProjectGetRequest = {
    page: 1,
    'page-size': 50
  }): Promise<Array<CKLProject>> {
    return this.makeApiRequest('', 'GET', params);
  }

  /** Add a new project to workspace */
  async post(
    /** Contains info about new project. */
    body: CKLProjectPostRequest
  ): Promise<CKLProject> {
    try {
      return await this.makeApiRequest('', 'POST', body);
    } catch (e) {
      if ((e as CKLError).code === 400) throw new CKLProjectExistsError();
      throw e;
    }
  }

  /** Delete project from workspace */
  async delete(id: CKLId): Promise<CKLProject> {
    try {
      return await this.makeApiRequest(`${id}`, 'DELETE');
    } catch (e) {
      if ((e as CKLError).code === 400) throw new CKLProjectNoIdError();
      throw e;
    }
  }
}