import { ApiSubroute } from '../../subroute';
import { CKLClient } from '../../interfaces/client.interface';
import { CKLError } from '../../errors/clockify.error';
export declare class CKLClientExistsError extends CKLError {
    constructor();
}
export interface CKLClientGetRequest {
    /** If provided, clients will be filtered by name */
    name?: string;
    page?: number;
    'page-size'?: number;
}
export interface CKLClientPostRequest {
    /** Contains a new client name */
    name: string;
}
export declare class ClientsRoute extends ApiSubroute {
    /** Find clients on workspace */
    get(params?: CKLClientGetRequest): Promise<Array<CKLClient>>;
    /** Add a new client to workspace */
    post(body: CKLClientPostRequest): Promise<CKLClient>;
}
