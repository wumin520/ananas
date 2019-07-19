import {
  promotionList,
  promotionDetail,
  promotionOrder,
  proOrderDetail,
  collectList,
} from '@/services/api';

export default {
  namespace: 'promotion',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    listData: {
      // 推广列表
      list: [
        {
          task_id: '',
          task_plan_id: '',
        },
      ],
      state_select: [],
      page_info: {},
    },
    // 推广详情
    detailData: {
      data: {},
      plan_info: [],
    },
    // 收藏列表
    collectData: {
      list: [],
      state_select: [],
      page_info: {},
    },
    // 订单列表
    orderData: {
      list: [
        {
          ordered_datetime: '',
        },
      ],
      state_select: [],
      page_info: {},
    },
    // 订单详情
    proDetailData: {
      order_info: {},
      product_info: {},
      shop_info: {},
    },
  },

  effects: {
    *planList({ payload }, { call, put }) {
      const res = yield call(promotionList, payload);
      yield put({
        type: 'saveState',
        payload: {
          listData: res.payload,
        },
      });
    },
    *detailData({ payload }, { call, put }) {
      const res = yield call(promotionDetail, payload);
      yield put({
        type: 'saveState',
        payload: {
          detailData: res.payload,
        },
      });
    },
    *orderData({ payload }, { call, put }) {
      const res = yield call(promotionOrder, payload);
      yield put({
        type: 'saveState',
        payload: {
          orderData: res.payload,
        },
      });
    },
    *proDetailData({ payload }, { call, put }) {
      const res = yield call(proOrderDetail, payload);
      yield put({
        type: 'saveState',
        payload: {
          proDetailData: res.payload,
        },
      });
    },
    *collectData({ payload }, { call, put }) {
      const res = yield call(collectList, payload);
      yield put({
        type: 'saveState',
        payload: {
          collectData: res.payload,
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
