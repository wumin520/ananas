import { getAssetList } from '@/services/api';

export default {
  namespace: 'capital',

  state: {
    data: {},
  },

  effects: {
    *getAssetList({ payload }, { call }) {
      yield call(getAssetList, payload);
    },
  },

  reducers: {
    saveFormData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
