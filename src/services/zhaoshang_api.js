import { stringify } from 'qs';
import request from '@/utils/request';
import { configs } from '@/defaultSettings';
/* eslint-disable */
const api_pre = `/work/v1/`;

const _request = (uri, params) => {
  return request(`${api_pre}${uri}?${stringify(params)}`);
};
export async function accountInfo(params) {
  return _request('account/info', params);
}
// 查询pid绑定列表
export async function home(params) {
  return _request('home', params);
}
// 商户列表
export async function shlist(params) {
  return _request('sh_list', params);
}
// 排期列表
export async function planlist(params) {
  return _request('task/plan_list', params);
}
export function getImgCodeUri(rand) {
  return `${configs[process.env.API_ENV].API_SERVER}/cdk/phrase?_version=${rand}`;
}
// post method
const postData = function(url, params) {
  return request(`${api_pre}${url}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
};
// 登录
export async function login(params) {
  return postData(`sign_in`, params);
}
// 注册
export async function signup(params) {
  return postData(`sign_up`, params);
}
// 登出
export async function zsSignout(params) {
  return postData(`sign_out`, params);
}
// sms code
export async function getCaptcha(params) {
  return postData(`send_sms`, params);
}
