import { ApiSubroute, ApiFunctionalProtocol } from '../../subroute';
import { CKLId } from '../../interfaces/id.type';
import { WebTimeEntries } from './time-entries';
export declare class WebWorkspaces extends ApiSubroute implements ApiFunctionalProtocol {
    __call__(workspaceId: CKLId): {
        timeEntries: WebTimeEntries;
    };
}
