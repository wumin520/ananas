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
    pddZSId: '', // 招商团长ID
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
      comment_limit: 0,
      comment_keyword: '',
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
      pay_notice: '',
    },
    schedules: [],
    startTime: '',
    endTime: '',
    taskId: '',
    zs_duo_id: '',
  },

  effects: {
    *queryGoodsDetail({ payload }, { call, put }) {
      const res = yield call(queryGoodsDetail, payload);
      console.log('queryGoodsDetail -> res ', res, payload);
      if (res && res.status === 'ok') {
        /* eslint-disable */
        let { mall_detail, goods_detail } = res.payload;
        if (mall_detail.mall_id) {
          goods_detail = {
            goods_id: mall_detail.mall_id,
            title: mall_detail.mall_name,
            detailImgRecordUrl: [mall_detail.url],
          };
        }
        yield put({
          type: 'saveState',
          payload: {
            goodsDetail: goods_detail,
            pddGoodUrl: payload.goods_id,
            pddZSId: payload.zs_duo_id,
          },
        });
        if (payload.auto_redirect !== 0) {
          let path = `/fangdan/step-form/confirm`;
          if (payload.qf !== undefined) {
            path = `/fangdan/qf/confirm?qf=${payload.qf}`;
          }
          yield put(routerRedux.push(path));
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
      if (res && res.status === 'ok') {
        const taskId = res.payload.task_id;
        let path = `/fangdan/step-form/pay?task_id=${taskId}&goods_id=${payload.goods_id}`;
        if (payload.qf !== '') {
          path += `&qf=${payload.qf}`;
        }
        console.log(path, 'publishTask 1');
        yield put(routerRedux.push(path));
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
        yield put(
          routerRedux.push(
            `/fangdan/step-form/result?task_id=${payload.task_id}&type=${payload.type}`
          )
        );
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
        // console.log('queryTaskDetail -> res -> ', res);
        const { plan_list, data } = res.payload;
        const arr = [];
        const len = plan_list.length;
        const start_time = len > 0 && plan_list[0].plan_time.split(' ')[0];
        const end_time = len > 0 && plan_list[len - 1].plan_time.split(' ')[0];
        for (let i = 0; i < len; i += 1) {
          const item = plan_list[i];
          const times = item.plan_time.split(' ');
          let hour = 0;
          if (item.hour.substr(0, 1) === '0') {
            hour = item.hour.substr(1);
          }
          arr.push({
            day: times[0],
            amount: item.total_amount,
            hour: parseInt(hour),
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
      // console.log('saveState -> payload -> ', payload);
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
