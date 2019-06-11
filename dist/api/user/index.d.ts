import { ApiSubroute } from '../../subroute';
import { CLKUser } from '../../interfaces/user.interface';
export declare class UserRoute extends ApiSubroute {
    /** Get currently logged in user's info */
    get(): Promise<CLKUser>;
}
