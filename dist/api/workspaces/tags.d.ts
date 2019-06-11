import { ApiSubroute } from '../../subroute';
import { CKLError } from '../../errors/clockify.error';
import { CKLTag } from '../../interfaces/tag.interface';
export declare class CKLTagExistsError extends CKLError {
    constructor();
}
export interface CKLTagGetRequest {
    /** If provided, tags will be filtered by name */
    name?: string;
    page?: number;
    'page-size'?: number;
}
export interface CKLTagPostRequest {
    /** Contains a new tag name. */
    name: string;
}
export declare class TagsRoute extends ApiSubroute {
    /** Find tags on workspace */
    get(params?: CKLTagGetRequest): Promise<Array<CKLTag>>;
    /** Add a new tag to workspace */
    post(body: CKLTagPostRequest): Promise<CKLTag>;
}
