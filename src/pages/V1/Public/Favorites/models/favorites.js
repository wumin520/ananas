import { tsTaskList, tsRemoveCollect, tsAddCollect, tsTaskGoodsUrl } from '@/services/api';

export default {
  namespace: 'favorites',
  state: {
    tsTaskData: {
      list: [],
      page_info: {},
    },
    shortUrl: '',
  },

  effects: {
    *tsTaskList({ payload }, { call, put }) {
      const res = yield call(tsTaskList, payload);
      yield put({
        type: 'saveState',
        payload: {
          tsTaskData: res.payload,
        },
      });
    },
    *tsAddCollect({ payload }, { call }) {
      yield call(tsAddCollect, payload);
    },
    *tsRemoveCollect({ payload }, { call }) {
      yield call(tsRemoveCollect, payload);
    },
    *tsTaskGoodsUrl({ payload }, { call, put }) {
      const res = yield call(tsTaskGoodsUrl, payload);
      yield put({
        type: 'saveState',
        payload: {
          shortUrl: res.payload.short_url,
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
  },
};
