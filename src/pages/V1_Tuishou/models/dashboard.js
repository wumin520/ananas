import { queryHomeData } from '@/services/tuishou_api';

export default {
  namespace: 'dashboard',

  state: {
    head_info: {
      visitor_info: {
        aver_visitor_amount: 0,
        day_visitor_amount: 0,
        statistics_info: [],
      },
      order_info: {
        aver_order_num: 0,
        day_order_num: 0,
        statistics_info: [],
      },
    },
    today_rebate: 0,
    month_rebate: 0,
    last_month_rebate: 0,
    total_rebate: 0,
  },

  effects: {
    *queryHomeData({ payload }, { put, call }) {
      const res = yield call(queryHomeData, payload);
      if (res.status === 'ok') {
        yield put({
          type: 'saveState',
          payload: res.payload,
        });
      }
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
