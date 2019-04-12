import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '@/services/api';

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
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    schedules: [{ date: '2019-04-11', num: 12 }],
    startTime: '',
    endTime: '',
  },

  effects: {
    *updateState({ payload }, { put }) {
      yield put({
        type: 'saveState',
        payload,
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
