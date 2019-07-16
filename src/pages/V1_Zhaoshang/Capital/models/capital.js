import {
  withdrawRecord,
  settledRecord,
  withdrawApply,
  withdrawAccount,
  withdrawAccountUpdate,
} from '@/services/api';
import { message } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'capital',
  state: {
    assetInfo: {
      settled_balance: 0, // 已结算金额
      balance: 0, // 余额
    },
    withdrawData: {
      list: [],
      page_info: {},
    },
    settledData: {
      list: [],
      page_info: {},
    },
    payeeInfo: {
      name: '',
      bank_name: '',
      bank_address: '',
      bank_card: '',
      blis_no: '',
      blis_img: '',
    },
    withdrawSuccessInfo: {
      info: {
        bank_address: '',
        bank_card: '',
        bank_name: '',
        blis_img: '',
        blis_no: '',
        name: '',
      },
      money: 0,
    },
  },

  effects: {
    *getWithdrawRecord({ payload }, { call, put }) {
      const res = yield call(withdrawRecord, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            withdrawData: res.payload,
            assetInfo: res.payload.assets,
          },
        });
      }
    },
    *getSettledRecord({ payload }, { call, put }) {
      const res = yield call(settledRecord, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            settledData: res.payload,
            assetInfo: res.payload.assets,
          },
        });
      }
    },
    *withdrawApply({ payload }, { call, put }) {
      const res = yield call(withdrawApply, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            withdrawSuccessInfo: res.payload,
          },
        });
        router.push('/zhaoshang-capital/withdrawSuccess');
      }
    },
    *withdrawAccount({ payload }, { call, put }) {
      const res = yield call(withdrawAccount, payload);
      const p = res.payload;
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            payeeInfo: p.info,
            assetInfo: p.assets,
          },
        });
      }
    },
    *withdrawAccountUpdate({ payload }, { call, put }) {
      const res = yield call(withdrawAccountUpdate, payload);
      if (res && res.code === 200) {
        message.success(`设置成功`);
        yield put({
          type: 'saveData',
          payload: {
            payeeInfo: res.payload.info,
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
