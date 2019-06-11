import { ApiSubroute, ApiFunctionalProtocol } from '../../../subroute';
import { CKLId } from '../../../interfaces/id.type';
import { UserTimeEntriesSubroute } from './time-entries';
export declare class WorkspaceUserRoute extends ApiSubroute implements ApiFunctionalProtocol {
    __call__(userId: CKLId): {
        timeEntries: UserTimeEntriesSubroute;
    };
}
