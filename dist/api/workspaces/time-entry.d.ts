import { ApiSubroute } from '../../subroute';
import { CKLError } from '../../errors/clockify.error';
import { CKLId } from '../../interfaces/id.type';
import { CKLTimeEntryImpl, CKLTimeEntriesDurationRequest } from '../../interfaces/time-entry.interface';
export declare class CKLTimeEntryExistsError extends CKLError {
    constructor();
}
export declare class CKLTimeEntryExistsPutError extends CKLError {
    constructor();
}
export declare class CKLTimeEntryDeleteError extends CKLError {
    constructor();
}
export interface CKLTimeEntryPostRequest {
    id?: CKLId;
    userId?: CKLId;
    taskId?: CKLId;
    projectId?: CKLId;
    workspaceId?: CKLId;
    end: string;
    start: string;
    billable: boolean;
    description: string;
    tagIds?: Array<CKLId>;
    timeInterval?: CKLTimeEntriesDurationRequest;
    isLocked?: boolean;
}
export interface CKLTimeEntryPutRequest {
    taskId: CKLId;
    projectId: CKLId;
    tagIds: Array<CKLId>;
    end: string;
    start: string;
    billable: boolean;
    description: string;
}
export declare class TimeEntryRoute extends ApiSubroute {
    /** Get time entry on workspace */
    get(timeEntryId: CKLId): Promise<CKLTimeEntryImpl>;
    /** Add a new time entry to workspace */
    post(body: CKLTimeEntryPostRequest): Promise<CKLTimeEntryImpl>;
    /** Update time entry on workspace */
    put(body: CKLTimeEntryPutRequest): Promise<CKLTimeEntryImpl>;
    /** Delete time entry from workspace */
    delete(id: CKLId): Promise<CKLTimeEntryImpl>;
}
