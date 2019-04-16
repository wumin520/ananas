import { rechargeSubmit, rechargeGetQrcode } from '@/services/api';
import router from 'umi/router';
import { message } from 'antd';

export default {
  namespace: 'recharge',

  state: {
    qrcodeInfo: {},
    paymentId: 0,
  },

  effects: {
    *rechargeSubmit({ payload }, { call, put }) {
      const res = yield call(rechargeSubmit, payload);
      console.log('rechargeSubmit', res);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            paymentId: res.payload.payment_id,
          },
        });
        router.push('/CapitalManage/RechargePay');
      } else {
        message.error(res.message);
      }
    },
    *rechargeGetQrcode({ payload }, { call, put }) {
      const res = yield call(rechargeGetQrcode, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            qrcodeInfo: res.payload,
          },
        });
      }
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
