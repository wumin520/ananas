import { promotionList, promotionDetail, promotionOrder, collectList } from '@/services/api';

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
      list: [
        {
          task_id: '',
          task_plan_id: '',
        },
      ],
      state_select: [],
      page_info: {},
    },
    detailData: {
      data: {},
      plan_info: [],
    },
    collectData: {
      list: [],
      state_select: [],
      page_info: {},
    },
    orderData: {
      list: [
        {
          ordered_datetime: '',
        },
      ],
      state_select: [],
      page_info: {},
    },
    // finishData: {},
    // planDownData: {},
    // planUpData: {},
    // planData: {
    //   list: [],
    //   header_info: {},
    //   state_select: [],
    //   type_select: [],
    //   page_info: {},
    // },
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
    *collectData({ payload }, { call, put }) {
      const res = yield call(collectList, payload);
      yield put({
        type: 'saveState',
        payload: {
          collectData: res.payload,
        },
      });
    },
    // *finishMessage({ payload }, { call, put }) {
    //   const res = yield call(taskFinish, payload);
    //   yield put({
    //     type: 'saveState',
    //     payload: {
    //       finishData: res.finishData,
    //     },
    //   });
    //   if (res.code === 200) {
    //     message.success(res.payload.msg);
    //   } else {
    //     message.success(res.payload.message);
    //   }
    // },
    // *planDownData({ payload }, { call, put }) {
    //   const res = yield call(planDown, payload);
    //   yield put({
    //     type: 'saveState',
    //     payload: {
    //       planDownData: res.planDownData,
    //     },
    //   });
    //   if (res.code === 200) {
    //     message.success(res.payload.msg);
    //   } else {
    //     message.success(res.message);
    //   }
    // },
    // *planUpData({ payload }, { call, put }) {
    //   const res = yield call(planUp, payload);
    //   yield put({
    //     type: 'saveState',
    //     payload: {
    //       planUpData: res.planUpData,
    //     },
    //   });
    //   if (res.code === 200) {
    //     message.success(res.payload.msg);
    //   } else {
    //     message.success(res.message);
    //   }
    // },
    // *planList({ payload }, { call, put }) {
    //   const res = yield call(planList, payload);
    //   yield put({
    //     type: 'saveState',
    //     payload: {
    //       planData: res.payload,
    //     },
    //   });
    // },
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
