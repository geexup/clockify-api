import { ApiSubroute } from '../subroute';
import { WebWorkspaces } from './workspaces';
export declare class WebApi extends ApiSubroute {
    workspaces: ((workspaceId: string) => {
        timeEntries: import("./workspaces/time-entries").WebTimeEntries;
    }) & WebWorkspaces;
}
