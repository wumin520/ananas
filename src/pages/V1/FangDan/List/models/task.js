// import { routerRedux } from 'dva/router';
// import { message } from 'antd';
import { taskDetail } from '@/services/api';

export default {
  namespace: 'task',

  state: {
    // step: {
    //   payAccount: 'ant-design@alipay.com',
    //   receiverAccount: 'test@example.com',
    //   receiverName: 'Alex',
    //   amount: '500',
    // },
    list: [],
    task_info: {},
    state_select: {},
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(taskDetail, payload);
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
