import { register, settleIn } from '@/services/api';
import { setAuthority, setUserToken, setShState } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { routerRedux } from 'dva/router';

const homePath = '/web/index';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *settleIn({ payload }, { call, put }) {
      const response = yield call(settleIn, payload);
      if (response && response.status === 'ok') {
        yield put({
          type: 'settleInHandle',
          payload: {
            sh_state: 1,
          },
        });
        yield put(routerRedux.push(homePath));
      }
    },
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
      if (response && response.status === 'ok') {
        yield put({
          type: 'registerHandle',
          payload: response,
        });
        yield put(routerRedux.push('/user/selectSettleIn'));
      }
    },
  },

  reducers: {
    settleInHandle(state, { payload }) {
      setAuthority('admin');
      setShState(payload.sh_state);
      reloadAuthorized();
    },
    registerHandle(state, { payload }) {
      // setAuthority('user');
      setUserToken(payload.payload.token);
      setShState(payload.payload.sh_state);
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
