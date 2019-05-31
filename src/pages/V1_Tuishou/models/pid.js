import {
  queryPidTaskList,
  jumpToAuthorize,
  queryAuthorizeResult,
  queryAuthorizeState,
  bindPid,
} from '@/services/tuishou_api';

export default {
  namespace: 'pid',

  state: {
    list: [],
    state: {},
    p_id: 0,
  },

  effects: {
    *queryPidTaskList({ payload }, { put, call }) {
      const res = yield call(queryPidTaskList, payload);
      if (res.status === 'ok') {
        yield put({
          type: 'saveState',
          payload: res.payload,
        });
      }
      return res;
    },
    *jumpToAuthorize({ payload }, { call }) {
      const res = yield call(jumpToAuthorize, payload);
      return res;
    },
    *queryAuthorizeResult({ payload }, { put, call }) {
      const res = yield call(queryAuthorizeResult, payload);
      if (res.status === 'ok') {
        yield put({
          type: 'saveState',
          payload: res.payload,
        });
      }
      return res;
    },
    *queryAuthorizeState({ payload }, { call }) {
      const res = yield call(queryAuthorizeState, payload);
      return res;
    },
    *bindPid({ payload }, { call }) {
      const res = yield call(bindPid, payload);
      return res;
    },
  },

  reducers: {
    saveState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
