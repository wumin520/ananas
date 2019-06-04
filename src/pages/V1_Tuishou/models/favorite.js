import {
  queryCollectList,
  removeFavorite,
  addFavorite,
  queryGoodsUrl,
} from '@/services/tuishou_api';

export default {
  namespace: 'favorite',

  state: {
    list: [],
    page_info: {
      total_num: 0,
    },
  },

  effects: {
    *queryFavoriteList({ payload }, { put, call }) {
      const res = yield call(queryCollectList, payload);
      if (res.status === 'ok') {
        yield put({
          type: 'saveState',
          payload: {
            list: res.payload.list,
            page_info: res.payload.page_info,
          },
        });
      }
    },
    *removeFavorite({ payload }, { call }) {
      const res = yield call(removeFavorite, payload);
      return res;
    },
    *addFavorite({ payload }, { call }) {
      const res = yield call(addFavorite, payload);
      return res;
    },
    *queryGoodsUrl({ payload }, { call }) {
      const res = yield call(queryGoodsUrl, payload);
      return res;
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
