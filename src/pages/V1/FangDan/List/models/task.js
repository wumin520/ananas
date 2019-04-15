// import { routerRedux } from 'dva/router';
// import { message } from 'antd';
import { taskList, taskDetail, orderList } from '@/services/api';

export default {
  namespace: 'task',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    list: [],
    task_info: {},
    state_select: {},
    type_select: [],
    page_info: [],
    order_num_info: {},
    data: {},
    plan_list: [],
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(taskList, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *detailData({ payload }, { call, put }) {
      const response = yield call(taskDetail, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *orderData({ payload }, { call, put }) {
      const response = yield call(orderList, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
