import { stringify } from 'qs';
import request from '@/utils/request';
/* eslint-disable */
const api_pre = `/v1/web`;

export async function queryHomeData(params) {
  return request(`${api_pre}/ts/home?${stringify(params)}`);
}
// 查询pid绑定列表
export async function queryPidTaskList(params) {
  return request(`${api_pre}/ts/pid/list?${stringify(params)}`);
}
// 授权
export async function jumpToAuthorize(params) {
  return request(`${api_pre}/ts/oauth/ddk/open?${stringify(params)}`);
}
// 查询授权结果 {code}
export async function queryAuthorizeResult(params) {
  return request(`${api_pre}/ts/oauth/ddk/result?${stringify(params)}`);
}
// 查询授权结果 {}
export async function queryAuthorizeState(params) {
  return request(`${api_pre}/ts/oauth/ddk/state?${stringify(params)}`);
}
// 查询订单
export async function queryOrder(params) {
  return request(`${api_pre}/ts/order/list?${stringify(params)}`);
}
// 收藏列表
export async function queryCollectList(params) {
  return request(`${api_pre}/ts/task/collection/list?${stringify(params)}`);
}
const postData = function(url, params) {
  return request(`${api_pre}${url}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
};
// 添加收藏
export async function addFavorite(params) {
  return postData(`/ts/task/collection/add`, params);
}
// 删除收藏
export async function removeFavorite(params) {
  return postData(`/ts/task/collection/remove`, params);
}
// pid绑定
export async function bindPid(params) {
  return postData(`/ts/pid/bind`, params);
}
