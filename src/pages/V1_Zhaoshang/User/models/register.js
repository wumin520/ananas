import { signup } from '@/services/zhaoshang_api';

export default {
  namespace: 'register',

  state: {
    status: undefined,
    payload: {},
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(signup, payload);
      if (response && response.status === 'ok') {
        yield put({
          type: 'registerHandle',
          payload: response,
        });
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
