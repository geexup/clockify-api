import { ApiSubroute } from '../../subroute';
import { CKLError } from '../../errors/clockify.error';
import { CKLTag } from '../../interfaces/tag.interface';

export class CKLTagExistsError extends CKLError {
  constructor() {
    super(400, 'Tag with that name already exists on workspace');
  }
}

export interface CKLTagGetRequest {
  /** If provided, tags will be filtered by name */
  name?: string;
  page?: number;
  'page-size'?: number;
}

export interface CKLTagPostRequest {
  /** Contains a new tag name. */
  name: string;
}

export class TagsRoute extends ApiSubroute {
  /** Find tags on workspace */
  get(params: CKLTagGetRequest = {
    page: 1,
    'page-size': 50
  }): Promise<Array<CKLTag>> {
    return this.makeApiRequest('', 'GET', params);
  }

  /** Add a new tag to workspace */
  async post(body: CKLTagPostRequest): Promise<CKLTag> {
    try {
      return await this.makeApiRequest('', 'POST', body);
    } catch (e) {
      if ((e as CKLError).code === 400) throw new CKLTagExistsError();
      throw e;
    }
  }
}