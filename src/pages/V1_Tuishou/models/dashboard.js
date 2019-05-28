import { queryHomeData } from '@/services/api';

export default {
  namespace: 'dashboard',

  state: {
    homeData: [],
  },

  effects: {
    *queryList({ payload }, { put, call }) {
      const res = yield call(queryHomeData, payload);
      if (res.status === 'ok') {
        yield put({
          type: 'saveState',
          payload: {
            homeData: res.payload,
          },
        });
      }
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
