import { ApiSubroute, ApiFunctionalProtocol } from '../../subroute';
import { CKLId } from '../../interfaces/id.type';
import { ClientsRoute } from './clients';
import { ProjectsRoute } from './projects';
import { TagsRoute } from './tags';
import { TimeEntryRoute } from './time-entry';
import { CKLWorkspace } from '../../interfaces/workspace.interface';
import { CKLError } from '../../errors/clockify.error';
import { CLKUser } from '../../interfaces/user.interface';
import { WorkspaceUserRoute } from './user';
export declare class CKLWorkspacesExistsError extends CKLError {
    constructor();
}
export interface CKLWorkspacesPostRequest {
    name: string;
}
export declare class WorkspacesRoute extends ApiSubroute implements ApiFunctionalProtocol {
    /** Get sub routes (if call instance as a function) */
    __call__(workspaceId: CKLId): {
        clients: ClientsRoute;
        projects: ((projectId: string) => {
            task: import("./projects/task").TasksRoute;
        }) & ProjectsRoute;
        tags: TagsRoute;
        timeEntry: TimeEntryRoute;
        user: ((userId: string) => {
            timeEntries: import("./user/time-entries").UserTimeEntriesSubroute;
        }) & WorkspaceUserRoute;
        users(): Promise<CLKUser[]>;
    };
    /** Find workspaces for currently logged in user */
    get(): Promise<Array<CKLWorkspace>>;
    /** Add a new workspace */
    post(body: CKLWorkspacesPostRequest): Promise<CKLWorkspace>;
}
