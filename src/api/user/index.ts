import { ApiSubroute } from '../../subroute';
import { CLKUser } from '../../interfaces/user.interface';

export class UserRoute extends ApiSubroute {
  /** Get currently logged in user's info */
  get(): Promise<CLKUser> {
    return this.makeApiRequest('', 'GET');
  }
}
