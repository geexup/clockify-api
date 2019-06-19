import { UserRoute, WorkspacesRoute } from './api';
import { WebApi } from './web-api';
export declare type APIRequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
export declare class ClockifyApi {
    private apiKey;
    private debugMode;
    private basePoint;
    private basePointWebApi;
    webApi: WebApi;
    user: UserRoute;
    workspaces: ((workspaceId: string) => {
        clients: import("./api/workspaces/clients").ClientsRoute;
        projects: ((projectId: string) => {
            task: import("./api/workspaces/projects/task").TasksRoute;
        }) & import("./api/workspaces/projects").ProjectsRoute;
        tags: import("./api/workspaces/tags").TagsRoute;
        timeEntry: import("./api/workspaces/time-entry").TimeEntryRoute;
        user: ((userId: string) => {
            timeEntries: import("./api/workspaces/user/time-entries").UserTimeEntriesSubroute;
        }) & import("./api/workspaces/user").WorkspaceUserRoute;
        users(): Promise<import("./interfaces/user.interface").CLKUser[]>;
    }) & WorkspacesRoute;
    constructor(apiKey: string);
    private parseParams;
    /** Formats Date object to Clockify string date format */
    static formatDate(date: Date): string;
    private prepareUri;
    makeApiRequest(uri: string, method: APIRequestMethod, params?: any): Promise<any>;
}
