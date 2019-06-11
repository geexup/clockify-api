import { ClockifyApi, APIRequestMethod } from '.';

export class ApiSubroute {
  constructor(
    protected uri: string,
    protected main: ClockifyApi
  ) {}

  protected makeApiRequest<T = any>(
    uri: string,
    method: APIRequestMethod,
    params?: any
  ): Promise<T> {
    return this.main.makeApiRequest(
      `${this.uri}/${uri}`,
      method,
      params
    );
  }
}

export interface ApiFunctionalProtocol {
  __call__(...args: Array<any>): any;
}

export function makeFunctionalSubroute<T extends ApiFunctionalProtocol>(self: T): T['__call__'] & T {
  const fn = new Function('...args', 'return this.__call__(...args)');
  const result = fn.bind(self);

  // @ts-ignore
  Object.setPrototypeOf(result, self.__proto__)
  Object.assign(result, self);

  return result;
}

export type ApiWrapSubroute<T> = (
  uri: string,
  main: ClockifyApi
) => T;
