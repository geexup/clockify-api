import { CKLProjectId, CKLProject } from './project.interface';
import { CKLTagId, CKLTag } from './tag.interface';
import { CKLTaskId, CKLTask } from './task.interface';
import { CKLTimeInterval } from './time-interval.interface';
import { CKLId } from './id.type';
import { CLKUser } from './user.interface';

export interface CKLTimeEntriesDurationRequest {
  start: string;
  end: string;
}

export interface CKLTimeEntry {
  billable: boolean
  locked: boolean
  projectId: CKLProjectId;
  tagIds:  Array<CKLTagId>;
  taskId: CKLTaskId;
  timeInterval: CKLTimeInterval;
}

export interface CKLTimeEntryImpl {
  id: CKLId;
  userId: CKLId;
  taskId: CKLId
  tagIds: Array<CKLId>;
  projectId: CKLId;
  workspaceId: CKLId;
  billable: boolean;
  description: string;
  isLocked: boolean;
  timeInterval: CKLTimeInterval;
}

export interface CKLWebTimeEntryInRange {
  id: CKLId;
  description: string;
  tags: Array<CKLTag>;
  user: CLKUser;
  billable: boolean;
  task: CKLTask;
  project: CKLProject;
  timeInterval: CKLTimeInterval;
  workspaceId: CKLId;
  totalBillable: null | any;
  hourlyRate: null | any;
  isLocked: boolean;
  userId: CKLId;
  projectId: CKLId;
}
