import { manageList } from '@/services/api';

export default {
  namespace: 'manage',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    manageData: {
      list: [],
      page_info: {},
      state_select: [],
    },
  },

  effects: {
    *manageData({ payload }, { call, put }) {
      const res = yield call(manageList, payload);
      yield put({
        type: 'saveState',
        payload: {
          manageData: res.payload,
        },
      });
    },
  },

  reducers: {
    saveState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
