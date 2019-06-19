import { ApiSubroute } from '../../../subroute';
import { WebUser } from './user';
export declare class WebTimeEntries extends ApiSubroute {
    user: ((userId: string) => {
        entriesInRange(body: import("../../../interfaces/time-entry.interface").CKLTimeEntriesDurationRequest): Promise<import("../../../interfaces/time-entry.interface").CKLWebTimeEntryInRange[]>;
    }) & WebUser;
}
