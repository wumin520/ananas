import { exchangePage, exchange } from '@/services/api';
import router from 'umi/router';

export default {
  namespace: 'withdraw',

  state: {
    withdrawData: {
      balance: 0,
      bank_list: [],
    },
    withdrawInfo: {
      bank_name: '',
      real_name: '',
      card_number: 0,
      money: 0,
    },
  },

  effects: {
    *exchangePage({ payload }, { call, put }) {
      const res = yield call(exchangePage, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            withdrawData: res.payload,
          },
        });
      }
    },
    *exchange({ payload }, { call, put }) {
      const res = yield call(exchange, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            withdrawInfo: res.payload,
          },
        });
        router.push('/CapitalManage/WithdrawSuccess');
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
