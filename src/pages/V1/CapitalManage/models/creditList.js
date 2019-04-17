import { creditRecord } from '@/services/api';

export default {
  namespace: 'creditlist',

  state: {
    list: [],
    sh_info: {},
    type_select: [],
    page_info: {},
  },

  effects: {
    *getListData({ payload }, { call, put }) {
      const res = yield call(creditRecord, payload);
      yield put({
        type: 'save',
        payload: {
          list: res.payload.list,
          sh_info: res.payload.sh_info,
          type_select: res.payload.type_select,
          page_info: res.payload.page_info,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
