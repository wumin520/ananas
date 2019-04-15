import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  fakeSubmitForm,
  queryGoodsDetail,
  queryPayInfoByTaskId,
  publishTask,
  pay,
  getCategoryList,
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
      console.log('queryGoodsDetail -> res ', res);
      if (res && res.status === 'ok') {
        yield put(routerRedux.push('/fangdan/step-form/confirm'));
      }
      yield put({
        type: 'saveState',
        payload: {
          goodsDetail: res.payload.goods_detail,
        },
      });
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
        yield put(routerRedux.push(`/fangdan/step-form/pay?taskId=${taskId}`));
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
        yield put(routerRedux.push('/fangdan/step-form/result'));
      }
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
