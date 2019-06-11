import { CKLProjectId } from './project.interface';
import { CKLTagId } from './tag.interface';
import { CKLTaskId } from './task.interface';
import { CKLTimeInterval } from './time-interval.interface';
import { CKLId } from './id.type';
export interface CKLTimeEntriesDurationRequest {
    start: string;
    end: string;
}
export interface CKLTimeEntry {
    billable: boolean;
    locked: boolean;
    projectId: CKLProjectId;
    tagIds: Array<CKLTagId>;
    taskId: CKLTaskId;
    timeInterval: CKLTimeInterval;
}
export interface CKLTimeEntryImpl {
    id: CKLId;
    userId: CKLId;
    taskId: CKLId;
    tagIds: Array<CKLId>;
    projectId: CKLId;
    workspaceId: CKLId;
    billable: boolean;
    description: string;
    isLocked: boolean;
    timeInterval: CKLTimeInterval;
}
