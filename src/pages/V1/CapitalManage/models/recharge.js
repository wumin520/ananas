import { rechargeSubmit, rechargeGetQrcode } from '@/services/api';

export default {
  namespace: 'recharge',

  state: {
    recharge: {},
  },

  effects: {
    *rechargeSubmit({ payload }, { call }) {
      yield call(rechargeSubmit, payload);
    },
    *rechargeGetQrcode({ payload }, { call, put }) {
      yield call(rechargeGetQrcode, payload);
      yield put({
        type: 'saveRechargeGetQrcode',
        payload,
      });
    },
  },

  reducers: {
    saveRechargeGetQrcode(state, { payload }) {
      return {
        ...state,
        recharge: payload,
      };
    },
  },
};
