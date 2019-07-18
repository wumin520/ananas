import { query as queryUsers, queryCurrent } from '@/services/user';
import { accountInfo } from '@/services/zhaoshang_api';
import { setAuthority, getAuthority } from '@/utils/authority';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {
      bd_info: {
        name: '',
        avatar: '',
        nickname: '',
        label: '',
        qrcode: '',
        qq: '',
        qq_url: '',
      },
      info: {}, // 招商代理
    },
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const queryUserInfo = _.payload.zs === 1 ? accountInfo : queryCurrent;
      const response = yield call(queryUserInfo);
      if (response.status === 'ok') {
        yield put({
          type: 'saveCurrentUser',
          payload: response && response.payload,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      const { payload } = action;
      const role = getAuthority()[0];
      const setAuthorityAndReload = val => {
        setAuthority(val);
        window.location.reload();
      };
      if (
        window.location.href.indexOf('work/') > -1 &&
        payload.info &&
        payload.info.type === 1 &&
        role !== 'zhaoshang'
      ) {
        setAuthorityAndReload('zhaoshang');
      } else if (payload.state && payload.ts_state) {
        localStorage.setItem('superUser', 1);
        // 即是推手也是商家
        if (window.location.href.indexOf('tuishou') > -1 && role !== 'tuishou') {
          setAuthorityAndReload('tuishou');
        } else if (window.location.href.indexOf('tuishou') === -1 && role !== 'admin') {
          setAuthorityAndReload('admin');
        }
      }
      return {
        ...state,
        currentUser: payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
