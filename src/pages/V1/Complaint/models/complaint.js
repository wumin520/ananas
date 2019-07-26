import { orderComplain, orderComplainList, orderComplainDetail } from '@/services/api';
import router from 'umi/router';

export default {
  namespace: 'complaint',

  state: {
    complaintData: {
      list: [],
      verify_num_info: {},
      state_select: [],
      page_info: {},
    },
    complaintDetail: {
      compain_data: {},
      order_data: {},
      task_data: {},
    },
  },

  effects: {
    *orderComplain({ payload }, { call }) {
      const res = yield call(orderComplain, payload);
      if (res && res.code === 200) {
        router.push('/complaint/complaintList');
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
