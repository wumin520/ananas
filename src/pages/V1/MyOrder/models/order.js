import { orderList, orderDetail, fansList, fansDetail } from '@/services/api';

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
          proof_images: [],
        },
      ],
      order_num_info: {
        pay_num: 0,
        wait_proof_num: 0,
      },
      state_select: [],
      page_info: {},
    },
    orderDetail: {
      data: {
        proof_images: [],
      },
    },
    fansData: {
      list: [
        {
          ordered_datetime: '',
          harvest_time: '',
          proof_time: '',
          paid_datetime: '',
          proof_images: [],
        },
      ],
      order_stat: {
        daily_num: 0,
        total_num: 0,
      },
      page_info: {},
    },
    fansDetail: {
      data: {
        proof_images: [],
      },
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
    *fansList({ payload }, { call, put }) {
      const res = yield call(fansList, payload);
      if (res.status === 'ok') {
        yield put({
          type: 'saveState',
          payload: {
            fansData: res.payload,
          },
        });
      }
    },
    *fansDetail({ payload }, { call, put }) {
      const res = yield call(fansDetail, payload);
      yield put({
        type: 'saveState',
        payload: {
          fansDetail: res.payload,
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
