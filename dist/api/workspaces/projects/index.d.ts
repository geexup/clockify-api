import { CKLError } from '../../../errors/clockify.error';
import { CKLId } from '../../../interfaces/id.type';
import { CKLHourlyRate, CKLMembership } from '../../../interfaces/membership.interface';
import { ApiSubroute, ApiFunctionalProtocol } from '../../../subroute';
import { CKLProject } from '../../../interfaces/project.interface';
import { TasksRoute } from './task';
import { CKLEstimateRequest } from '../../../interfaces/estimate.interface';
import { CKLTaskRequest } from '../../../interfaces/task.interface';
export declare class CKLProjectExistsError extends CKLError {
    constructor();
}
export declare class CKLProjectNoIdError extends CKLError {
    constructor();
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
export declare class ProjectsRoute extends ApiSubroute implements ApiFunctionalProtocol {
    /** Get sub routes (if call instance as a function) */
    __call__(projectId: CKLId): {
        task: TasksRoute;
    };
    /** Find projects on workspace */
    get(params?: CKLProjectGetRequest): Promise<Array<CKLProject>>;
    /** Add a new project to workspace */
    post(
    /** Contains info about new project. */
    body: CKLProjectPostRequest): Promise<CKLProject>;
    /** Delete project from workspace */
    delete(id: CKLId): Promise<CKLProject>;
}
