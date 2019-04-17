// import { routerRedux } from 'dva/router';
// import { message } from 'antd';
import { taskList, taskDetail, orderList, taskFinish, planDown, orderDetail } from '@/services/api';

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
      list: [
        {
          task_id: '',
        },
      ],
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
      list: [
        {
          ordered_datetime: '',
          harvest_time: '',
          proof_time: '',
          paid_datetime: '',
        },
      ],
      order_num_info: {},
      state_select: [],
      page_info: {},
    },
    finishData: {},
    planDownData: {},
    orderDetail: {
      data: {},
    },
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
    *planDownData({ payload }, { call, put }) {
      const res = yield call(planDown, payload);
      yield put({
        type: 'saveState',
        payload: {
          planDownData: res.planDownData,
        },
      });
    },
    *orderDetail({ payload }, { call, put }) {
      const res = yield call(orderDetail, payload);
      console.log('res', res);
      yield put({
        type: 'saveState',
        payload: {
          orderDetail: res.payload,
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
