import { rechargeSubmit, rechargeGetQrcode, rechargeCheck, rechargeActivity } from '@/services/api';
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
    rechargeActivity: {
      reward_list: [],
    },
  },

  effects: {
    *rechargeSubmit({ payload }, { call, put }) {
      const res = yield call(rechargeSubmit, payload);
      if (res && res.code === 200) {
        let url = `/CapitalManage/RechargePay?paymentId=${res.payload.payment_id}`;
        if (payload.backTo) {
          url = `/CapitalManage/RechargePay?paymentId=${
            res.payload.payment_id
          }&backTo=${encodeURIComponent(payload.backTo)}`;
        }
        yield put(routerRedux.push(url));
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
    *rechargeActivity({ payload }, { call, put }) {
      const res = yield call(rechargeActivity, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            rechargeActivity: res.payload,
          },
        });
      }
      return res;
    },
    *rechargeCheck({ payload }, { call, put }) {
      const res = yield call(rechargeCheck, payload);
      if (res && res.code === 200) {
        if (res.payload.state === 1) {
          let url = `/CapitalManage/RechargePaySuccess?money=${res.payload.money}`;
          if (payload.backTo) {
            url = payload.backTo;
          }
          yield put(routerRedux.push(url));
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
