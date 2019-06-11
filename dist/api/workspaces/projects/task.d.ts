import { CKLError } from '../../../errors/clockify.error';
import { ApiSubroute } from '../../../subroute';
import { CKLTask } from '../../../interfaces/task.interface';
export declare class CKLTaskExistsError extends CKLError {
    constructor();
}
export interface CKLTaskGetRequest {
    /** If provided, tasks will be filtered by name */
    name?: string;
    /** If provided and true, only active tasks will be returned. Otherwise only finished tasks will be returned. */
    'is-active'?: boolean;
    page?: number;
    'page-size'?: number;
}
export declare class TasksRoute extends ApiSubroute {
    /** Find tasks on project */
    get(params?: CKLTaskGetRequest): Promise<Array<CKLTask>>;
    /** Add a new task on project */
    post(body: CKLTask): Promise<CKLTask>;
}
