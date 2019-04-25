import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login, getCaptcha, signout, autoLogin } from '@/services/api';
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
      const response = yield call(signout);
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
        if (window.location.pathname !== '/user/login') {
          yield put(
            routerRedux.replace({
              pathname: '/user/login',
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
