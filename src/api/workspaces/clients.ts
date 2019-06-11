import { ApiSubroute } from '../../subroute';
import { CKLClient } from '../../interfaces/client.interface';
import { CKLError } from '../../errors/clockify.error';

export class CKLClientExistsError extends CKLError {
  constructor() {
    super(400, 'Client with that name already exists on workspace');
  }
}

export interface CKLClientGetRequest {
  /** If provided, clients will be filtered by name */
  name?: string;
  page?: number;
  'page-size'?: number;
}

export interface CKLClientPostRequest {
  /** Contains a new client name */
  name: string;
}

export class ClientsRoute extends ApiSubroute {
  /** Find clients on workspace */
  get(params: CKLClientGetRequest = {
    page: 1,
    'page-size': 50
  }): Promise<Array<CKLClient>> {
    return this.makeApiRequest('', 'GET', params);
  }

  /** Add a new client to workspace */
  async post(body: CKLClientPostRequest): Promise<CKLClient> {
    try {
      return await this.makeApiRequest('', 'POST', body);
    } catch (e) {
      if ((e as CKLError).code === 400) throw new CKLClientExistsError();
      throw e;
    }
  }
}