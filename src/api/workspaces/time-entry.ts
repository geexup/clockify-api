import { ApiSubroute } from '../../subroute';
import { CKLError } from '../../errors/clockify.error';
import { CKLId } from '../../interfaces/id.type';
import { CKLTimeEntryImpl, CKLTimeEntriesDurationRequest } from '../../interfaces/time-entry.interface';

export class CKLTimeEntryExistsError extends CKLError {
  constructor() {
    super(400, 'Project//Tag doesn\'t exist or doesn\'t belong to workspace; Task doesn\'t exist or doesn\'t belong to project; Start datetime is after end datetime;Time entry requires additional info (check workspace settings);');
  }
}

export class CKLTimeEntryExistsPutError extends CKLError {
  constructor() {
    super(400, 'Project/Tag doesn\'t exist or doesn\'t belong to workspace; Task doesn\'t exist or doesn\'t belong to project; Start datetime is after end datetime');
  }
}

export class CKLTimeEntryDeleteError extends CKLError {
  constructor() {
    super(400, 'Time entry with given ID doesn\'t exist or doesn\'t belong to workspace');
  }
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

export class TimeEntryRoute extends ApiSubroute {
  /** Get time entry on workspace */
  get(timeEntryId: CKLId): Promise<CKLTimeEntryImpl> {
    return this.makeApiRequest(`${timeEntryId}`, 'GET');
  }

  /** Add a new time entry to workspace */
  async post(body: CKLTimeEntryPostRequest): Promise<CKLTimeEntryImpl> {
    try {
      return await this.makeApiRequest('', 'POST', body);
    } catch (e) {
      if ((e as CKLError).code === 400) throw new CKLTimeEntryExistsError();
      throw e;
    }
  }

  /** Update time entry on workspace */
  async put(body: CKLTimeEntryPutRequest): Promise<CKLTimeEntryImpl> {
    try {
      return await this.makeApiRequest('', 'POST', body);
    } catch (e) {
      if ((e as CKLError).code === 400) throw new CKLTimeEntryExistsPutError();
      throw e;
    }
  }

  /** Delete time entry from workspace */
  async delete(id: CKLId): Promise<CKLTimeEntryImpl> {
    try {
      return await this.makeApiRequest(`${id}`, 'DELETE');
    } catch (e) {
      if ((e as CKLError).code === 400) throw new CKLTimeEntryDeleteError();
      throw e;
    }
  }
}