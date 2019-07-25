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
// 关注列表
export async function fansList(params) {
  return request(`/v1/web/order/fans/list?${stringify(params)}`);
}
// 关注详情
export async function fansDetail(params) {
  return request(`/v1/web/order/fans/detail?${stringify(params)}`);
}
// 终止
export async function taskFinish(params) {
  return request(`/v1/web/task/finish?${stringify(params)}`);
}

// 下架
export async function planDown(params) {
  return request(`/v1/web/task/plan/down?${stringify(params)}`);
}

//上架
export async function planUp(params) {
  return request(`/v1/web/task/plan/up?${stringify(params)}`);
}

//订单详情
export async function orderDetail(params) {
  return request(`/v1/web/order/detail?${stringify(params)}`);
}

// 排期列表
export async function planList(params) {
  return request(`/v1/web/task/plan_list?${stringify(params)}`);
}

// 资金明细
export async function getAssetList(params) {
  return request(`/v1/web/account/asset_list?${stringify(params)}`);
}

// 提现明细
export async function getExchangeList(params) {
  return request(`/v1/web/account/exchange_list?${stringify(params)}`);
}
// 提现明细
export async function getRewardList(params) {
  return request(`/v1/web/account/asset_reward_list?${stringify(params)}`);
}

// 冻结明细
export async function frozenTaskList(params) {
  return request(`/v1/web/account/frozen_task_list?${stringify(params)}`);
}

// 充值活动
export async function rechargeActivity() {
  return request(`/v1/web/activity/recharge`);
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
// 检测是否有权
export async function checkPrivige(params) {
  return request(api_pre + `check_privige?${stringify(params)}`);
}

// 官网选品库商品
export async function tsTaskList(params) {
  return request(api_pre + `ts/task/list?${stringify(params)}`);
}

// 官网选品库商品 移除收藏
export async function tsRemoveCollect(params) {
  return request(api_pre + `ts/task/collection/remove`, {
    method: 'POST',
    data: params,
  });
}

// 官网选品库商品 加入收藏
export async function tsAddCollect(params) {
  return request(api_pre + `ts/task/collection/add`, {
    method: 'POST',
    data: params,
  });
}

// 官网选品库商品
export async function tsTaskGoodsUrl(params) {
  return request(api_pre + `ts/task/goods/uri?${stringify(params)}`);
}

// 提交申诉
export async function orderComplain(params) {
  return request(api_pre + `order/complain`, {
    method: 'POST',
    data: params,
  });
}

// 订单申诉列表
export async function orderComplainList(params) {
  return request(api_pre + `order/complain/list?${stringify(params)}`);
}

// 订单申诉详情
export async function orderComplainDetail(params) {
  return request(api_pre + `order/complain/detail?${stringify(params)}`);
}

// 代理-商家推广排期列表
export async function promotionList(params) {
  return request(`/work/v1/task/plan_list?${stringify(params)}`);
}

// 代理-排期详情信息
export async function promotionDetail(params) {
  return request(`/work/v1/task/plan_detail?${stringify(params)}`);
}

// 代理 订单列表
export async function promotionOrder(params) {
  return request(`/work/v1/order/list?${stringify(params)}`);
}

// 代理-订单详情
export async function proOrderDetail(params) {
  return request(`/work/v1/order/detail?${stringify(params)}`);
}

// 收藏列表
export async function collectList(params) {
  return request(`/work/v1/order/fans/list?${stringify(params)}`);
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

export async function login(params) {
  return request(api_pre + 'sign_in', {
    method: 'POST',
    data: params,
  });
}

export async function register(params) {
  return request(api_pre + 'sign_up', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}
// 获取短信验证码
export async function getCaptcha(params) {
  return request(api_pre + `send_sms`, {
    method: 'POST',
    data: params,
  });
}
// 认证
export async function settleIn(params) {
  return request(api_pre + 'settle_in', {
    method: 'POST',
    data: params,
  });
}
// 登出
export async function signout(params) {
  return request(api_pre + 'sign_out', {
    method: 'POST',
    data: params,
  });
}
// 自动登录
export async function autoLogin(params) {
  return request(api_pre + 'sign_in/interior', {
    method: 'POST',
    data: params,
  });
}

// 招商代理---资产统计
export async function assetsInfo() {
  return request('/work/v1/assets/info');
}

// 招商代理---提现记录
export async function withdrawRecord(params) {
  return request(`/work/v1/assets/withdraw/record?${stringify(params)}`);
}

// 招商代理---结算记录
export async function settledRecord(params) {
  return request(`/work/v1/assets/settled/record?${stringify(params)}`);
}

// 招商代理---申请提现
export async function withdrawApply(params) {
  return request('/work/v1/assets/withdraw/apply', {
    method: 'POST',
    data: params,
  });
}

// 招商代理---提现账号信息
export async function withdrawAccount(params) {
  return request(`/work/v1/assets/withdraw/account?${stringify(params)}`);
}

// 招商代理--- 更新提现账号信息
export async function withdrawAccountUpdate(params) {
  return request('/work/v1/assets/withdraw/account', {
    method: 'POST',
    data: params,
  });
}
