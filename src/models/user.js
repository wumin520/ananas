import { query as queryUsers, queryCurrent } from '@/services/user';
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
      const response = yield call(queryCurrent);
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
      if (payload.state && payload.ts_state) {
        localStorage.setItem('superUser', 1);
        // 即是推手也是商家
        if (window.location.href.indexOf('tuishou') > -1 && getAuthority()[0] !== 'tuishou') {
          setAuthority('tuishou');
          window.location.reload();
        } else if (window.location.href.indexOf('zhaoshang') > -1) {
          setAuthority('zhaoshang');
          // window.location.reload();
        } else if (
          window.location.href.indexOf('tuishou') === -1 &&
          getAuthority()[0] !== 'admin'
        ) {
          setAuthority('admin');
          window.location.reload();
        }
        console.log(window.location.href, '1');
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
