import qs from 'qs';
import axios from 'axios';
import {
  castArray,
  get,
  groupBy,
  keys,
  pick,
  set,
  values,
  zipObject,
} from 'lodash';

import { normalize } from './normalize';

export { denormalize } from './normalize';

export const client = axios.create({
  baseURL: '/',
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});

client.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/#/login';
    }
    return Promise.reject(error);
  },
);

client.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user['access-token']) {
      config.headers['x-jwt-token'] = 'Bearer';
      config.headers.client = user.client;
      config.headers['access-token'] = user['access-token'];
      config.headers.uid = user.uid;
    }
    return config;
  },
  error => Promise.reject(error),
);

const stringifyParams = params => qs.stringify(params, { format: 'RFC1738', arrayFormat: 'brackets' });

export const withParams = (url, params) => `${url}?${stringifyParams(params)}`;

export const normalizeResponse = (response) => {
  const { data = [], included = [] } = response.data;
  const dataByType = groupBy(castArray(data).concat(included), 'type');

  const normalizeItems = (items = []) => Promise.all(items.map(item =>
    normalize(item.type, { data: item, included }),
  ));

  return Promise.all(values(dataByType).map(normalizeItems))
    .then(normalizedItems => ({
      ...response.data,
      normalized: zipObject(keys(dataByType), normalizedItems),
    }));
};

export const normalizeErrors = (response) => {
  throw get(response, 'response.data.errors')
    .reduce((errors, error) => {
      const attribute = /\/data\/[a-z]*\/(.*)$/.exec(get(error, 'source.pointer'))[1];
      set(errors, attribute.split('/'), error.title);
      return errors;
    }, {});
};
