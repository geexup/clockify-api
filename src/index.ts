import moment from 'moment';

import { get, post, delete as deleteReq, put, patch, CoreOptions } from 'request';
import { UserRoute, WorkspacesRoute } from './api';
import { CKLError } from './errors/clockify.error';
import { CKLUnauthorizedError } from './errors/unauthorized.error';
import { CKLForbiddenError } from './errors/forbidden.error';
import { CKLNotFoundError } from './errors/not-found.error';
import { makeFunctionalSubroute } from './subroute';
import { WebApi } from './web-api';

export type APIRequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

// Clockify time in MomentJS format string
const CLOCKIFY_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

const PRODUCER_MAP = {
  'GET': get,
  'POST': post,
  'DELETE': deleteReq,
  'PUT': put,
  'PATCH': patch
};

export class ClockifyApi {
  private debugMode = process.env['CLOCKIFY_DEBUG'] === 'true';
  private basePoint = 'https://api.clockify.me/api/v1';
  private basePointWebApi = 'https://global.api.clockify.me';

  webApi = new WebApi(`${this.basePointWebApi}`, this);

  user = new UserRoute(`${this.basePoint}/user`, this);
  workspaces = makeFunctionalSubroute(new WorkspacesRoute(`${this.basePoint}/workspaces`, this));

  constructor(
    private apiKey: string
  ) {}

  private parseParams(params: any): string {
    const parts: Array<string> = [];

    const makePart = (key: string, val: string): string => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;

    for (const key in params) {
      const val = params[key];
      if (Array.isArray(val)) parts.push(...val.map(item => makePart(key, item)));
      parts.push(makePart(key, val));
    }

    return parts.join('&');
  }

  /** Formats Date object to Clockify string date format */
  static formatDate(date: Date) {
    return moment(date).format(CLOCKIFY_DATE_FORMAT);
  }

  private prepareUri(uri: string): string {
    const parts = uri.split('/');
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === '.') {
        parts.splice(i, 1);
        i -= 1;
        continue;
      }

      if (parts[i] === '..') {
        parts.splice(i - 1, 2);
        i -= 2;
        continue;
      }

      if (i < 0) throw new Error('Wrong uri: ' + uri);
    }

    return parts.join('/');
  }

  makeApiRequest(uri: string, method: APIRequestMethod, params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = `${this.prepareUri(uri)}`;
      const requestProducer = PRODUCER_MAP[method];
      const requestParams: CoreOptions = {
        headers: {
          'X-Api-Key': this.apiKey
        }
      };

      if (method === 'GET') {
        url += '?' + this.parseParams(params);
      } else if (method === 'POST') {
        requestParams.json = params;
      }

      if (this.debugMode) {
        console.log(`[Clockify] [${method}]`, url);
        console.log(`[Clockify] [${method}] body:`, params);
      }

      requestProducer(url, requestParams, (err, resp, body) => {
        if (err) return reject(err);
        if (resp.statusCode < 200 || resp.statusCode >= 300) {
          if (resp.statusCode === 401) return reject(new CKLUnauthorizedError());
          if (resp.statusCode === 403) return reject(new CKLForbiddenError());
          if (resp.statusCode === 404) return reject(new CKLNotFoundError());

          return reject(new CKLError(resp.statusCode));
        }

        try {
          resolve(JSON.parse(body));
        } catch {
          resolve(body);
        }
      });
    });
  }
}
