import { orderList, orderDetail } from '@/services/api';

export default {
  namespace: 'order',
  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
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
    orderDetail: {
      data: {},
    },
  },

  effects: {
    *orderData({ payload }, { call, put }) {
      const res = yield call(orderList, payload);
      yield put({
        type: 'saveState',
        payload: {
          orderData: res.payload,
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
