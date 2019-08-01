import { home, planlist } from '@/services/zhaoshang_api';

export default {
  namespace: 'dashboard',
  state: {
    today_info: {},
    sh_info: {},
    sharing_rules: '',
    income_info: {
      week_expect_income_list: [],
    },
    bd_info: {},
    notice_info: '',
    list: [],
    page_info: {},
  },
  effects: {
    *queryHomeData({ payload }, { call, put }) {
      const res = yield call(home, payload);

      if (res.status === 'ok') {
        yield put({
          type: 'saveState',
          payload: {
            ...res.payload,
          },
        });
      }
    },
    *planlist({ payload }, { call, put }) {
      const res = yield call(planlist, payload);
      if (res.status === 'ok') {
        yield put({
          type: 'saveState',
          payload: {
            ...res.payload,
          },
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
