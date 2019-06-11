import { ClockifyApi, APIRequestMethod } from '.';
export declare class ApiSubroute {
    protected uri: string;
    protected main: ClockifyApi;
    constructor(uri: string, main: ClockifyApi);
    protected makeApiRequest<T = any>(uri: string, method: APIRequestMethod, params?: any): Promise<T>;
}
export interface ApiFunctionalProtocol {
    __call__(...args: Array<any>): any;
}
export declare function makeFunctionalSubroute<T extends ApiFunctionalProtocol>(self: T): T['__call__'] & T;
export declare type ApiWrapSubroute<T> = (uri: string, main: ClockifyApi) => T;
