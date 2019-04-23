import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login, getCaptcha, signout } from '@/services/api';
import { setUserToken, setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

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
        yield put(routerRedux.replace(redirect || '/'));
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
        setUserToken(payload.res.payload.token);
      }
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
