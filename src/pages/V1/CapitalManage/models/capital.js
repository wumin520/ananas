import { getAssetList, getExchangeList, frozenTaskList } from '@/services/api';

export default {
  namespace: 'capital',

  state: {
    assetData: {
      asset_info: {
        balance: 0,
        frozen_balance: 0,
        expend_balance: 0,
      },
      list: [],
      type_select: [],
      page_info: {},
    },
    exchangeData: {
      asset_info: {
        balance: 0,
        forzen_balance: 0,
        expend_balance: 0,
      },
      list: [],
      type_select: [],
      page_info: {},
    },
    freezeData: {
      head_info: {
        forzen_balance: 0,
        forzen_num: 0,
      },
      list: [],
      type_select: [],
      page_info: {},
    },
  },

  effects: {
    *getAssetList({ payload }, { call, put }) {
      const res = yield call(getAssetList, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            assetData: res.payload,
          },
        });
      }
    },
    *getExchangeList({ payload }, { call, put }) {
      const res = yield call(getExchangeList, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            exchangeData: res.payload,
          },
        });
      }
    },
    *frozenTaskList({ payload }, { call, put }) {
      const res = yield call(frozenTaskList, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'saveData',
          payload: {
            freezeData: res.payload,
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
