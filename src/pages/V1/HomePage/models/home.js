import { getHomeData, taskPlanUp, taskPlanDown } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'homedata',

  state: {
    head_info: {
      task_info: {
        day_task_amount: 0, // 今日放单量
        total_amount: 0, // 总放单量
        statistics_info: [],
      },
      order_info: {
        total_order_num: 0, // 总订单量
        day_order_num: 0, // 今日订单量
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
      fans_info: {
        day_order_num: 0,
        total_order_num: 0,
        statistics_info: [],
      },
    },
    task_plan_list: [],
    hot_rank: [],
    order_list: [],
    notice_info: '',
    day_order_info: {
      list: [],
      page_info: {},
    },
    task_report_info: {
      great_review: [],
      fans: [],
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const res = yield call(getHomeData, payload);
      console.log(res, 'res 1');
      if (res.status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            ...res.payload,
          },
        });
      }
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
