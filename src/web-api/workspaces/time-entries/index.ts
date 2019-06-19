import { ApiSubroute, makeFunctionalSubroute } from '../../../subroute';
import { WebUser } from './user';

export class WebTimeEntries extends ApiSubroute {
  user = makeFunctionalSubroute(new WebUser(`${this.uri}/user`, this.main));
}
