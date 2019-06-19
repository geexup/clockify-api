import { ApiSubroute, ApiFunctionalProtocol } from '../../../subroute';
import { CKLId } from '../../../interfaces/id.type';
import { CKLTimeEntriesDurationRequest, CKLWebTimeEntryInRange } from '../../../interfaces/time-entry.interface';

export class WebUser extends ApiSubroute implements ApiFunctionalProtocol {
  __call__(userId: CKLId) {
    const self = this;
    const uri = `${this.uri}/${userId}`;

    return {
      entriesInRange(body: CKLTimeEntriesDurationRequest): Promise<Array<CKLWebTimeEntryInRange>> {
        return self.main.makeApiRequest(`${uri}/entriesInRange`, 'POST', body);
      }
    };
  }
}
