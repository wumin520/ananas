import { shlist, memberRecord } from '@/services/zhaoshang_api';

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
      list: [
        {
          member_list: [
            {
              level: 0,
              name: '',
              start_time: '',
              end_time: '',
            },
          ],
        },
      ],
      type_select: [],
      state_select: [],
      task_info: {},
      page_info: {},
    },
    // 会员购买记录
    recordData: {
      list: [],
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
    *recordData({ payload }, { call, put }) {
      const res = yield call(memberRecord, payload);
      yield put({
        type: 'saveState',
        payload: {
          recordData: res.payload,
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
