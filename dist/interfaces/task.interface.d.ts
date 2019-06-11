import { CKLId } from './id.type';
export declare type CKLTaskStatus = 'ACTIVE' | 'DONE';
export interface CKLTaskId {
    id: CKLId;
}
export interface CKLTask {
    id: CKLId;
    projectId: CKLId;
    assigneeId: CKLId;
    name: string;
    estimate: string;
    status: CKLTaskStatus;
}
export interface CKLTaskRequest {
    id: CKLId;
    assigneeId: CKLId;
    name: string;
    status: CKLTaskStatus;
    estimate: string;
}
