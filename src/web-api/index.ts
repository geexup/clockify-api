import { ApiSubroute, makeFunctionalSubroute } from '../subroute';
import { WebWorkspaces } from './workspaces';

export class WebApi extends ApiSubroute {
  workspaces = makeFunctionalSubroute(new WebWorkspaces(`${this.uri}/workspaces`, this.main));
}
