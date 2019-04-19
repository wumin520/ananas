import { getHomeData, taskPlanUp, taskPlanDown } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'homedata',

  state: {
    head_info: {
      task_info: {
        task_amount: 0,
        total_money: 0,
        statistics_info: [],
      },
      order_info: {
        total_order_num: 0,
        daily_order_num: 0,
        statistics_info: [],
      },
      comment_info: {
        good_comment_num: 0,
        good_comment_rate: '',
        statistics_info: [],
      },
      credit_info: {
        credit_score: 0,
        limit_info: '',
        credit_level: 0,
      },
    },
    task_plan_list: [],
    hot_rank: [],
    order_list: [],
    notice_info: '',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const res = yield call(getHomeData, payload);
      yield put({
        type: 'save',
        payload: {
          head_info: res.payload.head_info,
          task_plan_list: res.payload.task_plan_list,
          hot_rank: res.payload.hot_rank,
          order_list: res.payload.order_list,
          notice_info: res.payload.notice_info,
        },
      });
    },
    *toPlanUp({ payload }, { call }) {
      const res = yield call(taskPlanUp, payload);
      if (res && res.status === 'ok') {
        message.success('操作成功');
      }
    },
    *toPlanDown({ payload }, { call }) {
      const res = yield call(taskPlanDown, payload);
      if (res && res.status === 'ok') {
        message.success('操作成功');
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
