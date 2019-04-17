import { stringify } from 'qs';
import request from '@/utils/request';
/* eslint-disable */
const api_pre = `/v1/web/`;

// server api
export async function queryServerTest(params) {
  return request(`/v1/wechat/register/reward?${stringify(params)}`);
}
// 放单列表
export async function taskList(params) {
  return request(`/v1/web/task/list?${stringify(params)}`);
}
// 推广详情
export async function taskDetail(params) {
  return request(`/v1/web/task/detail?${stringify(params)}`);
}
// 订单列表
export async function orderList(params) {
  return request(`/v1/web/order/list?${stringify(params)}`);
}

// 终止
export async function taskFinish(params) {
  return request(`/v1/web/task/finish?${stringify(params)}`);
}

// 下架
export async function planDown(params) {
  return request(`/v1/web/task/plan/down?${stringify(params)}`);
}

//订单详情
export async function orderDetail(params) {
  return request(`/v1/web/order/detail?${stringify(params)}`);
}

// 资金明细
export async function getAssetList(params) {
  return request(`/v1/web/account/asset_list?${stringify(params)}`);
}

// 提现明细
export async function getExchangeList(params) {
  return request(`/v1/web/account/exchange_list?${stringify(params)}`);
}

// 冻结明细
export async function frozenTaskList(params) {
  return request(`/v1/web/account/frozen_task_list?${stringify(params)}`);
}

// 充值提交
export async function rechargeSubmit(params) {
  return request('/v1/web/account/recharge_submit', {
    method: 'POST',
    data: params,
  });
}

// 获得支付二维码
export async function rechargeGetQrcode(params) {
  return request(`/v1/web/account/recharge_get_qrcode?${stringify(params)}`);
}

// 检测是否充值成功
export async function rechargeCheck(params) {
  return request('/v1/web/account/recharge_check', {
    method: 'POST',
    data: params,
  });
}

// 提现页面信息获取
export async function exchangePage() {
  return request(`/v1/web/account/exchangePage`);
}

// 申请提现
export async function exchange(params) {
  return request('/v1/web/account/exchange', {
    method: 'POST',
    data: params,
  });
}
// 获取商品分类
export async function getCategoryList(params) {
  return request(api_pre + `task/category?${stringify(params)}`);
}

// 主页数据
export async function getHomeData() {
  return request(`${api_pre}home`);
}

// 信用记录
export async function creditRecord(params) {
  return request(`${api_pre}credit_score/list?${stringify(params)}`);
}

// 上架排期
export async function taskPlanUp(params) {
  return request(`${api_pre}task/plan/up?${stringify(params)}`);
}

// 下架排期
export async function taskPlanDown(params) {
  return request(`${api_pre}task/plan/down?${stringify(params)}`);
}

export async function queryGoodsDetail(params) {
  return request(api_pre + `get_goods_detail?${stringify(params)}`);
}
export async function queryPayInfoByTaskId(params) {
  return request(api_pre + `task/topay_info?${stringify(params)}`);
}
export async function publishTask(params) {
  return request(api_pre + `task/publish`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function pay(params) {
  return request(api_pre + `task/pay`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
