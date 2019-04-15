import { exchangePage, exchange } from '@/services/api';

export default {
  namespace: 'withdraw',

  state: {
    withdrawData: {},
  },

  effects: {
    *exchangePage({ payload }, { call }) {
      yield call(exchangePage, payload);
    },
    *exchange({ payload }, { call }) {
      yield call(exchange, payload);
    },
  },

  reducers: {
    saveRechargeGetQrcode(state, { payload }) {
      return {
        ...state,
        withdrawData: payload,
      };
    },
  },
};
