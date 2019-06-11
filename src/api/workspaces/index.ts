import { ApiSubroute, makeFunctionalSubroute, ApiFunctionalProtocol } from '../../subroute';
import { CKLId } from '../../interfaces/id.type';
import { ClientsRoute } from './clients';
import { ProjectsRoute } from './projects';
import { TagsRoute } from './tags';
import { TimeEntryRoute } from './time-entry';
import { CKLWorkspace } from '../../interfaces/workspace.interface';
import { CKLError } from '../../errors/clockify.error';
import { CLKUser } from '../../interfaces/user.interface';
import { WorkspaceUserRoute } from './user';

export class CKLWorkspacesExistsError extends CKLError {
  constructor() {
    super(400, 'Workspace with that name already exists, or workspace name is not valid');
  }
}

export interface CKLWorkspacesPostRequest {
  name: string;
}

export class WorkspacesRoute extends ApiSubroute implements ApiFunctionalProtocol{
  /** Get sub routes (if call instance as a function) */
  __call__(workspaceId: CKLId) {
    const self = this;
    const uri = `${this.uri}/${workspaceId}`;

    return {
      clients: new ClientsRoute(`${uri}/clients`, this.main),
      projects: makeFunctionalSubroute(new ProjectsRoute(`${uri}/projects`, this.main)),
      tags: new TagsRoute(`${uri}/tags`, this.main),
      timeEntry: new TimeEntryRoute(`${uri}/time-entries`, this.main),
      user: makeFunctionalSubroute(new WorkspaceUserRoute(`${uri}/user`, this.main)),

      users(): Promise<Array<CLKUser>> {
        return self.makeApiRequest(`../workspace/${workspaceId}/users`, 'GET');
      }
    };
  }

  /** Find workspaces for currently logged in user */
  get(): Promise<Array<CKLWorkspace>> {
    return this.makeApiRequest('', 'GET');
  }

  /** Add a new workspace */
  async post(body: CKLWorkspacesPostRequest): Promise<CKLWorkspace> {
    try {
      return await this.makeApiRequest('', 'POST', body);
    } catch (e) {
      if ((e as CKLError).code === 400) throw new CKLWorkspacesExistsError();
      throw e;
    }
  }
}
