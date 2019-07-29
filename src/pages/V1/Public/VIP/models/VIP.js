import { memberList } from '@/services/api';

export default {
  namespace: 'VIP',

  state: {
    memberListData: [],
  },

  effects: {
    *getMemberList({ payload }, { call, put }) {
      const res = yield call(memberList, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            memberListData: res.payload,
          },
        });
      }
    },
  },

  reducers: {
    saveData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
