import { creditRecord } from '@/services/api';

export default {
  namespace: 'creditlist',

  state: {
    data: {},
  },

  effects: {
    *getListData({ payload }, { call, put }) {
      const response = yield call(creditRecord, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
