import { getHomeData } from '@/services/api';

export default {
  namespace: 'homedata',

  state: {
    head_info: {
      task_info: {},
      order_info: {},
      comment_info: {},
      credit_info: {},
    },
    task_list: [],
    hot_rank: [],
    order_list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const res = yield call(getHomeData, payload);
      yield put({
        type: 'save',
        payload: {
          head_info: res.payload.head_info,
          task_list: res.payload.task_list,
          hot_rank: res.payload.hot_rank,
          order_list: res.payload.order_list,
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
