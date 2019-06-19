import { ApiSubroute, ApiFunctionalProtocol } from '../../../subroute';
import { CKLId } from '../../../interfaces/id.type';
import { CKLTimeEntriesDurationRequest, CKLWebTimeEntryInRange } from '../../../interfaces/time-entry.interface';
export declare class WebUser extends ApiSubroute implements ApiFunctionalProtocol {
    __call__(userId: CKLId): {
        entriesInRange(body: CKLTimeEntriesDurationRequest): Promise<CKLWebTimeEntryInRange[]>;
    };
}
