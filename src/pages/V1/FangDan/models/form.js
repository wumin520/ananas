import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  fakeSubmitForm,
  queryGoodsDetail,
  queryPayInfoByTaskId,
  publishTask,
  pay,
} from '@/services/api';

export default {
  namespace: 'form',

  state: {
    pddGoodUrl: 'http://',
    goodsDetail: {
      goods_id: '',
      cate_name: '',
      title: 'd',
      detailImgRecordUrl: [
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
      ],
      coupon_info: {
        coupon_discount: 0,
      }, // 优惠券信息
      commission_rate: '', // 佣金比率
      commission: 12,
      price: '',
      coupon_price: 0, // 券后价
    },
    category_list: [{ id: 1, cate_name: '汽车', key: 1 }], // 商品分类
    taskPayInfo: {
      rebate_money: '',
      num: '',
      total_money: '',
      wait_pay: '',
      balance: '',
      can_pay: '',
    },
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    schedules: [{ day: '2019-04-11', amount: 12 }],
    startTime: '',
    endTime: '',
    taskId: '',
  },

  effects: {
    *queryGoodsDetail({ payload }, { call, put }) {
      const res = yield call(queryGoodsDetail, payload);
      console.log('queryGoodsDetail -> res ', res);
      if (res && res.status === 'ok') {
        yield put(routerRedux.push('/fangdan/form-step/confirm'));
      }
      yield put({
        type: 'saveState',
        payload: {
          goodsDetail: res.payload.goods_detail,
          category_list: res.payload.category_list,
        },
      });
    },
    *queryPayInfoByTaskId({ payload }, { call, put }) {
      const res = yield call(queryPayInfoByTaskId, payload);
      yield put({
        type: 'saveState',
        payload: {
          taskPayInfo: res.payload,
        },
      });
    },
    *publishTask({ payload }, { call, put }) {
      console.log('publishTask -> payload -> ', payload);
      const res = yield call(publishTask, payload);
      yield put({
        type: 'saveState',
        payload: {
          taskId: res.payload.task_id,
        },
      });
    },
    *pay({ payload }, { call }) {
      const res = yield call(pay, payload);
      if (res && res.status === 'ok') {
        routerRedux.push('/fangdan/step-form/result');
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
