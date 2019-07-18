import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login, getCaptcha, signout, autoLogin } from '@/services/api';
import { zsSignout } from '@/services/zhaoshang_api';
import { settleIn } from '@/services/tuishou_api';
import { setUserToken, setAuthority, setShState } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

const getRedirectUrl = () => {
  reloadAuthorized();
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params;
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
    } else {
      redirect = null;
    }
  }
  return redirect;
};
const homePath = '/web/index';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    sh_id: '',
    sh_state: '',
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      // Login successfully
      if (response.status === 'ok') {
        let currentAuthority = 'admin';
        if (response.payload.ts_state) {
          currentAuthority = 'tuishou';
        }
        yield put({
          type: 'changeLoginStatus',
          payload: {
            res: response,
            currentAuthority,
            setToken: 1,
          },
        });
        const redirect = getRedirectUrl();
        yield put(routerRedux.replace(redirect || homePath));
      }
    },

    *tuishouSettleIn({ payload }, { call, put }) {
      const response = yield call(settleIn, payload);
      // Login successfully
      if (response.status === 'ok') {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            res: response,
            currentAuthority: 'tuishou',
          },
        });
        const redirect = getRedirectUrl();
        yield put(routerRedux.replace(redirect || homePath));
      }
    },

    *autoLogin({ payload }, { call, put }) {
      const response = yield call(autoLogin, payload);
      if (response && response.status === 'ok') {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            res: response,
            currentAuthority: 'admin',
            setToken: 1,
          },
        });
        const redirect = getRedirectUrl();
        yield put(routerRedux.replace(redirect || homePath));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getCaptcha, payload);
    },

    *logout(_, { call, put }) {
      const isZs = _.payload.zs;
      const logoutApi = isZs ? zsSignout : signout;
      const response = yield call(logoutApi);
      if (response && response.status === 'ok') {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
            delToken: 1,
          },
        });
        reloadAuthorized();
        // redirect
        let loginPath = '/user/login';
        if (isZs) {
          loginPath = '/work/user/login';
        }
        if (window.location.pathname !== loginPath) {
          yield put(
            routerRedux.replace({
              pathname: loginPath,
              search: stringify({
                redirect: window.location.href,
              }),
            })
          );
        }
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log('reducers -> changeLoginStatus -> payload -> ', payload);
      if (payload.setToken) {
        /* eslint-disable */
        const { token, sh_state } = payload.res.payload;
        window.cdk_token = token;
        setUserToken(token);
        setShState(sh_state);
      } else if (payload.delToken) {
        setUserToken('');
        setShState('');
      }
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
