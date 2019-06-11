import { ApiSubroute } from '../../../subroute';
import { CKLTimeEntryImpl } from '../../../interfaces/time-entry.interface';
import { CKLError } from '../../../errors/clockify.error';
import { CKLTimeEntryPostRequest } from '../time-entry';

export class CKLTimeEntryExistsError extends CKLError {
  constructor() {
    super(400, 'Project/Tag/User doesn\'t exist or doesn\'t belong to workspace; Task doesn\'t exist or doesn\'t belong to project; Start datetime is after end datetime;Time entry requires additional info (check workspace settings)');
  }
}

export class CKLTimeEntryPatchError extends CKLError {
  constructor() {
    super(400, 'Required information is not present on currently running time entry. Check your workspace settings.');
  }
}

export interface CKLTimeEntryGetGeneralRequest {
  /** If provided, time entries will be filtered by description. */
  description?: string;
  /** If provided, only time entries that ended before specified datetime will be returned. Datetime must be in ISO-8601 format. Example: '2019-04-16T05:15:32.998Z'. */
  end?: string
  /** If provided, all other filters will be ignored and, if present, currently running time entry will be returned. */
  'in-progress'?: boolean;
  /** page */
  page?: number;
  /** page size */
  'page-size'?: number;
  /** If provided, time entries will be filtered by project. */
  project?: string;
  /** If provided, only time entries that started after specified datetime will be returned. Datetime must be in ISO-8601 format. Example: '2019-04-16T05:15:32.998Z'. */
  start?: string;
  /** If provided, time entries will be filtered by tags. This parameter is an array of tag ids. */
  tags?: Array<string>;
  /** If provided, time entries will be filtered by task. */
  task?: string;
}

export interface CKLTimeEntryPatchRequest {
  end: string;
}

export class UserTimeEntriesSubroute extends ApiSubroute {
  /**
   * Find time entries for user on workspace
   *
   * Requires `WORKSPACE_OWN` or `WORKSPACE_ADMIN` permissions to see other user's time entries.
   */
  get(
    params: CKLTimeEntryGetGeneralRequest = {}
  ): Promise<Array<CKLTimeEntryImpl>> {
    return this.makeApiRequest('', 'GET', params);
  }

  /** Add a new time entry for another user on workspace */
  async post(body: CKLTimeEntryPostRequest): Promise<CKLTimeEntryImpl> {
    try {
      return await this.makeApiRequest('', 'POST', body);
    } catch (e) {
      if ((e as CKLError).code === 400) throw new CKLTimeEntryExistsError();
      throw e;
    }
  }

  /** Add a new time entry for another user on workspace */
  async patch(body: CKLTimeEntryPatchRequest): Promise<CKLTimeEntryImpl> {
    try {
      return await this.makeApiRequest('', 'PATCH', body);
    } catch (e) {
      if ((e as CKLError).code === 400) throw new CKLTimeEntryPatchError();
      throw e;
    }
  }
}
