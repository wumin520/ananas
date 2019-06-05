import { queryOrder } from '@/services/tuishou_api';

export default {
  namespace: 'order',

  state: {
    orderData: {
      list: [],
      stat: {},
      state: [],
      terminal: [],
      page_info: {},
    },
  },

  effects: {
    *queryOrder({ payload }, { put, call }) {
      const res = yield call(queryOrder, payload);
      if (res.status === 'ok') {
        yield put({
          type: 'saveState',
          payload: res.payload,
        });
      }
    },
  },

  reducers: {
    saveState(state, { payload }) {
      return {
        ...state,
        orderData: payload,
      };
    },
  },
};
