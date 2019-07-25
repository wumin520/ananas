import { orderComplain, orderComplainList, orderComplainDetail } from '@/services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'complaint',

  state: {
    complaintData: {
      list: [],
      verify_num_info: {},
      state_select: [],
      page_info: {},
    },
    complaintDetail: {},
  },

  effects: {
    *orderComplain({ payload }, { call }) {
      const res = yield call(orderComplain, payload);
      if (res && res.code === 200) {
        routerRedux.push('/complaint/complaintList');
      }
    },
    *getOrderComplainList({ payload }, { call, put }) {
      const res = yield call(orderComplainList, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            complaintData: res.payload,
          },
        });
      }
    },
    *getOrderComplainDetail({ payload }, { call, put }) {
      const res = yield call(orderComplainDetail, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            complaintDetail: res.payload,
          },
        });
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
