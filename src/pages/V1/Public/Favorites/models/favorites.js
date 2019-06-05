import { tsTaskList, tsRemoveCollect, tsAddCollect, tsTaskGoodsUrl } from '@/services/api';
import { Modal, message } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'favorites',
  state: {
    tsTaskData: {
      list: [],
      page_info: {
        total_num: 0,
        current_page: 0,
        per_page: 0,
      },
    },
    shortUrl: '',
  },

  effects: {
    *tsTaskList({ payload }, { call, put }) {
      const res = yield call(tsTaskList, payload);
      yield put({
        type: 'saveState',
        payload: {
          tsTaskData: res.payload,
        },
      });
    },
    *tsAddCollect({ payload }, { call }) {
      const res = yield call(tsAddCollect, payload);
      if (res.code === 200) {
        message.destroy();
        message.success('已收藏');
        return;
      }
      if (res.code === 40302) {
        message.destroy();
        const modal = Modal.confirm();
        modal.update({
          title: '提示',
          content: res.message,
          cancelText: '放弃',
          okText: '去认证',
          onOk: () => {
            router.push('/user/tuishou-signin');
          },
        });
      }
    },
    *tsRemoveCollect({ payload }, { call }) {
      const res = yield call(tsRemoveCollect, payload);
      if (res.code === 200) {
        message.destroy();
        message.success('已取消');
        return;
      }
      if (res.code === 40302) {
        message.destroy();
        const modal = Modal.confirm();
        modal.update({
          title: '提示',
          content: res.message,
          cancelText: '放弃',
          okText: '去认证',
          onOk: () => {
            router.push('/user/tuishou-signin');
          },
        });
      }
    },
    *tsTaskGoodsUrl({ payload }, { call, put }) {
      const res = yield call(tsTaskGoodsUrl, payload);
      if (res.code === 40302) {
        message.destroy();
        const modal = Modal.confirm();
        modal.update({
          title: '提示',
          content: res.message,
          cancelText: '放弃',
          okText: '去认证',
          onOk: () => {
            router.push('/tuishou-account/pid');
          },
        });
        return;
      }
      if (res.code === 40303) {
        message.destroy();
        const modal = Modal.confirm();
        modal.update({
          title: '提示',
          content: res.message,
          cancelText: '放弃',
          okText: '去设置',
          onOk: () => {
            router.push('/tuishou-account/pid');
          },
        });
        return;
      }
      yield put({
        type: 'saveState',
        payload: {
          shortUrl: res.payload.short_url,
        },
      });
    },
    *setState({ payload }, { put }) {
      yield put({
        type: 'saveState',
        payload,
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
  },
};
