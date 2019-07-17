import { shlist } from '@/services/zhaoshang_api';

export default {
  namespace: 'businesses',

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
      data: {
        coupon_info: {},
      },
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
    planData: {
      list: [],
      header_info: {},
      state_select: [],
      type_select: [],
      page_info: {},
    },
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const res = yield call(shlist, payload);
      yield put({
        type: 'saveState',
        payload: {
          listData: res.payload,
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
