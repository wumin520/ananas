import { homeList, promotionList } from '@/services/api';

export default {
  namespace: 'homedata',

  state: {
    homeInfo: {
      today_info: {},
      sh_info: {},
      income_info: {},
      bd_info: {},
    },
    listData: {
      // 推广列表
      list: [
        {
          task_id: '',
          task_plan_id: '',
        },
      ],
      state_select: [],
      page_info: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const res = yield call(homeList, payload);
      console.log(res, 'res 1');
      if (res.status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            homeInfo: res.payload,
          },
        });
      }
    },

    *planList({ payload }, { call, put }) {
      const res = yield call(promotionList, payload);
      yield put({
        type: 'saveState',
        payload: {
          listData: res.payload,
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
