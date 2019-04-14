import { getAssetList, getExchangeList, frozenTaskList } from '@/services/api';

export default {
  namespace: 'capital',

  state: {
    assetData: {},
    exchangeData: {},
    freezeData: {},
  },

  effects: {
    *getAssetList({ payload }, { call }) {
      yield call(getAssetList, payload);
    },
    *getExchangeList({ payload }, { call, put }) {
      yield call(getExchangeList, payload);
      yield put({
        type: 'saveChangeFormData',
        payload,
      });
    },
    *frozenTaskList({ payload }, { call, put }) {
      yield call(frozenTaskList, payload);
      yield put({
        type: 'saveFrozenTaskList',
        payload,
      });
    },
  },

  reducers: {
    saveFormData(state, { payload }) {
      return {
        ...state,
        assetData: payload,
      };
    },
    saveExchangeFormData(state, { payload }) {
      return {
        ...state,
        exchangeData: payload,
      };
    },
    saveFrozenTaskList(state, { payload }) {
      return {
        ...state,
        freezeData: payload,
      };
    },
  },
};
