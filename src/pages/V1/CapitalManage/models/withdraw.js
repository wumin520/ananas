import { exchangePage, exchange } from '@/services/api';

export default {
  namespace: 'withdraw',

  state: {
    withdrawData: {
      balance: 0,
      bank_list: [],
    },
  },

  effects: {
    *exchangePage({ call, put }) {
      const res = yield call(exchangePage);
      console.log('withdraw res', res);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            withdrawData: res.payload,
          },
        });
      }
    },
    *exchange({ payload }, { call }) {
      yield call(exchange, payload);
    },
  },

  reducers: {
    saveData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
