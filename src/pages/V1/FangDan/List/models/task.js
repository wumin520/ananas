import { taskList, taskDetail, taskFinish, planDown, planUp } from '@/services/api';
import { message } from 'antd';

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
    planUpData: {},
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
    *finishMessage({ payload }, { call, put }) {
      const res = yield call(taskFinish, payload);
      yield put({
        type: 'saveState',
        payload: {
          finishData: res.finishData,
        },
      });
      if (res.code === 200) {
        message.success(res.msg);
      } else {
        message.success(res.message);
      }
    },
    *planDownData({ payload }, { call, put }) {
      const res = yield call(planDown, payload);
      yield put({
        type: 'saveState',
        payload: {
          planDownData: res.planDownData,
        },
      });
      if (res.code === 200) {
        message.success(res.payload.msg);
      } else {
        message.success(res.message);
      }
    },
    *planUpData({ payload }, { call, put }) {
      const res = yield call(planUp, payload);
      yield put({
        type: 'saveState',
        payload: {
          planUpData: res.planUpData,
        },
      });
      if (res.code === 200) {
        message.success(res.payload.msg);
      } else {
        message.success(res.message);
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
