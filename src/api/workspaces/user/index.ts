import { ApiSubroute, ApiFunctionalProtocol } from '../../../subroute';
import { CKLId } from '../../../interfaces/id.type';
import { UserTimeEntriesSubroute } from './time-entries';

export class WorkspaceUserRoute extends ApiSubroute implements ApiFunctionalProtocol {
  __call__(userId: CKLId) {
    const uri = `${this.uri}/${userId}`;

    return {
      timeEntries: new UserTimeEntriesSubroute(`${uri}/time-entries`, this.main)
    };
  }
}