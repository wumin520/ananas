import { queryH5OpenState } from '@/services/tuishou_api';

export default {
  namespace: 'platform',

  state: {
    state: 0,
    message: '',
    title: '',
    url: '',
    qr_code: '',
  },

  effects: {
    *queryH5OpenState({ payload }, { put, call }) {
      const res = yield call(queryH5OpenState, payload);
      if (res.status === 'ok') {
        yield put({
          type: 'saveState',
          payload: res.payload,
        });
      }
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
