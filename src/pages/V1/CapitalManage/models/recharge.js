import { rechargeSubmit, rechargeGetQrcode, rechargeCheck } from '@/services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'recharge',

  state: {
    qrcodeInfo: {},
    paymentId: 0,
    state: '',
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
        yield put(routerRedux.push('/CapitalManage/RechargePay'));
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
    *rechargeCheck({ payload }, { call, put }) {
      const res = yield call(rechargeCheck, payload);
      console.log('rechargeCheck', res);
      if (res && res.code === 200) {
        if (res.payload.state === 1) {
          yield put(
            routerRedux.push(`/CapitalManage/RechargePaySuccess?money=${res.payload.money}`)
          );
        }
      } else {
        yield put(routerRedux.push('/CapitalManage/RechargePayError'));
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
