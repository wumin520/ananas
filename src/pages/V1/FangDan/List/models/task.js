// import { routerRedux } from 'dva/router';
// import { message } from 'antd';
import { taskList, taskDetail, orderList, taskFinish } from '@/services/api';

export default {
  namespace: 'task',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    listData: {
      list: [],
      type_select: [],
      state_select: [],
      task_info: {},
      page_info: {},
    },
    detailData: {
      data: {},
      plan_list: [],
    },
    orderData: {
      list: [],
      order_num_info: {},
      state_select: [],
      page_info: {},
    },
    finishData: {},
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const res = yield call(taskList, payload);
      yield put({
        type: 'saveState',
        payload: {
          listData: res.payload,
        },
      });
    },
    *detailData({ payload }, { call, put }) {
      const res = yield call(taskDetail, payload);
      yield put({
        type: 'saveState',
        payload: {
          detailData: res.payload,
        },
      });
    },
    *orderData({ payload }, { call, put }) {
      const res = yield call(orderList, payload);
      yield put({
        type: 'saveState',
        payload: {
          orderData: res.payload,
        },
      });
    },
    *finishMessage({ payload }, { call, put }) {
      const res = yield call(taskFinish, payload);
      yield put({
        type: 'saveState',
        payload: {
          finishData: res.finishData,
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
