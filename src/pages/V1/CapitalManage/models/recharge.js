import { rechargeSubmit, rechargeGetQrcode, rechargeCheck } from '@/services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'recharge',

  state: {
    qrcodeInfo: {
      left_time: 0,
      money: 0,
      imgCode: '',
    },
    state: '',
  },

  effects: {
    *rechargeSubmit({ payload }, { call, put }) {
      const res = yield call(rechargeSubmit, payload);
      if (res && res.code === 200) {
        yield put(
          routerRedux.push(`/CapitalManage/RechargePay?paymentId=${res.payload.payment_id}`)
        );
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
      return res;
    },
    *rechargeCheck({ payload }, { call, put }) {
      const res = yield call(rechargeCheck, payload);
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
