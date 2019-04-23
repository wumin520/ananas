import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  fakeSubmitForm,
  queryGoodsDetail,
  queryPayInfoByTaskId,
  publishTask,
  pay,
  getCategoryList,
  taskDetail,
  checkPrivige,
} from '@/services/api';

export default {
  namespace: 'form',

  state: {
    pddGoodUrl: '',
    goodsDetail: {
      goods_id: '',
      cate_name: '',
      title: '',
      detailImgRecordUrl: [],
      coupon_info: {
        coupon_discount: 0,
      }, // 优惠券信息
      commission_rate: '', // 佣金比率
      commission: '',
      price: '',
      coupon_price: 0, // 券后价
    },
    category_list: [], // 商品分类
    category_id: '', // 分类id
    taskPayInfo: {
      rebate_money: '',
      num: '',
      total_money: '',
      wait_pay: '',
      balance: '',
      can_pay: '',
    },
    schedules: [],
    startTime: '',
    endTime: '',
    taskId: '',
  },

  effects: {
    *queryGoodsDetail({ payload }, { call, put }) {
      const res = yield call(queryGoodsDetail, payload);
      console.log('queryGoodsDetail -> res ', res, payload);
      if (res && res.status === 'ok') {
        yield put({
          type: 'saveState',
          payload: {
            goodsDetail: res.payload.goods_detail,
            pddGoodUrl: payload.goods_id,
          },
        });
        if (payload.auto_redirect !== 0) {
          yield put(routerRedux.push('/fangdan/step-form/confirm'));
        }
      }
    },
    *queryPayInfoByTaskId({ payload }, { call, put }) {
      const res = yield call(queryPayInfoByTaskId, payload);
      yield put({
        type: 'saveState',
        payload: {
          taskPayInfo: res.payload.data,
        },
      });
    },
    *publishTask({ payload }, { call, put }) {
      const res = yield call(publishTask, payload);
      console.log('publishTask -> res -> ', res);
      if (res && res.status === 'ok') {
        const taskId = res.payload.task_id;
        yield put(
          routerRedux.push(`/fangdan/step-form/pay?task_id=${taskId}&goods_id=${payload.goods_id}`)
        );
        yield put({
          type: 'saveState',
          payload: {
            taskId,
          },
        });
      }
    },
    *pay({ payload }, { call, put }) {
      const res = yield call(pay, payload);
      if (res && res.status === 'ok') {
        yield put(routerRedux.push(`/fangdan/step-form/result?task_id=${payload.task_id}`));
      }
    },
    *checkPrivige({ payload }, { call }) {
      const res = yield call(checkPrivige, payload);
      return res;
    },
    *queryCategoryList({ payload }, { call, put }) {
      const res = yield call(getCategoryList, payload);
      yield put({
        type: 'saveState',
        payload: {
          category_list: res.payload.category_list,
        },
      });
    },
    *queryTaskDetail({ payload }, { call, put }) {
      const res = yield call(taskDetail, payload);
      if (res && res.status === 'ok') {
        /* eslint-disable */
        console.log('queryTaskDetail -> res -> ', res);
        const { plan_list, data } = res.payload;
        const arr = [];
        const len = plan_list.length;
        const start_time = len > 0 && plan_list[0].plan_time;
        const end_time = len > 0 && plan_list[len - 1].plan_time;
        for (let i = 0; i < len; i += 1) {
          const item = plan_list[i];
          arr.push({
            day: item.plan_time,
            amount: item.total_amount,
          });
        }

        yield put({
          type: 'saveState',
          payload: {
            taskId: data.task_id || '',
            startTime: start_time,
            endTime: end_time,
            category_id: data.category_id,
            schedules: arr,
          },
        });
      }
    },
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/fangdan/step-form/schedule'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *saveSchedules({ payload }, { put }) {
      yield put({
        type: 'saveSchedulesData',
        payload,
      });
    },
    *setScheduleTime({ payload }, { put }) {
      yield put({
        type: 'saveScheduleTime',
        payload,
      });
    },
    *updateState({ payload }, { put }) {
      yield put({
        type: 'saveState',
        payload,
      });
    },
  },

  reducers: {
    saveState(state, { payload }) {
      console.log('saveState -> payload -> ', payload);
      return {
        ...state,
        ...payload,
      };
    },
    saveScheduleTime(state, { payload }) {
      return {
        ...state,
        startTime: payload.startTime,
        endTime: payload.endTime,
        schedules: [...payload.schedules],
      };
    },
    saveSchedulesData(state, { payload }) {
      return {
        ...state,
        schedules: [...state.schedules, payload],
      };
    },
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        goodsDetail: {
          ...state.goodsDetail,
          ...payload,
        },
      };
    },
  },
};
