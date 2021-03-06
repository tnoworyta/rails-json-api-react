import imm from 'object-path-immutable';
import {
  get,
  map,
  keys,
  keyBy,
  isEmpty,
  without,
} from 'lodash';

import {
  GET_ONE,
  GET_LIST,
  GET_MANY,
  CREATE,
  UPDATE,
  DELETE,
} from './client';

import {
  STARTED,
  SUCCESS,
  FAILED,
  actionType,
} from './actions';

const initialState = {};

const addNormalized = (newState, payload) => {
  keys(payload.normalized).forEach(key => {
    payload.normalized[key].forEach(item => {
      newState = imm.assign(newState, [key, 'byId', item.id], item);
    });
  });
  return newState;
};

export default (state = initialState, action) => {
  const { type, payload, meta } = action;
  const { key } = meta || {};
  let newState = state;

  switch (type) {
    case actionType(GET_ONE, SUCCESS): {
      return addNormalized(newState, payload);
    }
    case actionType(GET_LIST, SUCCESS): {
      newState = addNormalized(newState, payload);
      newState = imm.set(newState, [key, 'list', 'ids'], map(payload.data, 'id'));
      newState = imm.set(newState, [key, 'list', 'links'], payload.links);
      newState = imm.set(newState, [key, 'list', 'meta'], payload.meta);
      return newState;
    }
    case actionType(GET_MANY, SUCCESS): {
      return addNormalized(newState, payload);
    }
    case actionType(CREATE, SUCCESS): {
      return addNormalized(newState, payload);
    }
    case actionType(UPDATE, SUCCESS): {
      return addNormalized(newState, payload);
    }
    case actionType(DELETE, SUCCESS): {
      newState = imm.del(newState, [key, 'byId', payload.data.id]);
      newState = imm.set(newState, [key, 'list', 'ids'],
        without(get(newState, [key, 'list', 'ids']), payload.data.id)
      );
      return newState;
    }
    default:
      return state
  }
};
