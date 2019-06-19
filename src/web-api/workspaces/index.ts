import { ApiSubroute, ApiFunctionalProtocol } from '../../subroute';
import { CKLId } from '../../interfaces/id.type';
import { WebTimeEntries } from './time-entries';

export class WebWorkspaces extends ApiSubroute implements ApiFunctionalProtocol {
  __call__(workspaceId: CKLId) {
    const uri = `${this.uri}/${workspaceId}`;

    return {
      timeEntries: new WebTimeEntries(`${uri}/timeEntries`, this.main)
    };
  }
}
