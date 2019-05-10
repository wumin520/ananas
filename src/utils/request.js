/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */
import { extend } from 'umi-request';
import router from 'umi/router';
import { notification, message } from 'antd';
import { configs } from '@/defaultSettings';
import { getStorage, setUserToken, setShState } from './authority';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  if (status === 401) {
    notification.error({
      message: '未登录或登录已过期，请重新登录。',
    });
    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    return;
  }
  console.error('errorHandler -> ', error);
  if (!status) {
    return;
  }
  notification.error({
    message: `请求错误 ${status}: ${url}`,
    description: errortext,
  });
  // environment should not be used
  if (status === 403) {
    // router.push('/exception/403');
    return;
  }
  if (status <= 504 && status >= 500) {
    // router.push('/exception/500');
    return;
  }
  if (status >= 404 && status < 422) {
    // router.push('/exception/404');
  }
};

/**
 * 配置request请求时的默认参数
 */
console.log('request -> init -> ');
const request = extend({
  headers: {
    platform: 'web',
  },
  errorHandler, // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
});
// request interceptor, change url or options.
request.interceptors.request.use((url, options) => {
  // const origin  = 'http://chaoduoke.com/cdk'
  const origin = `${configs[process.env.API_ENV].API_SERVER}/cdk`;
  const token = window.cdk_token || getStorage('token');
  console.log('request -> url -> ', url, 'options -> ', options, token);
  return {
    url: `${origin}${url}`,
    options: {
      ...options,
      headers: {
        ...options.headers,
        token,
        timestamp: Date.now(),
      },
    },
  };
});

// response interceptor, handling response
request.interceptors.response.use(async response => {
  // response.headers.append('interceptors', 'yes yo');
  const { status } = response;
  if (status === 200) {
    const res = await response.clone().json();
    if (res.code === 40301) {
      message.error('请先登录');
      setUserToken('');
      setShState('');
      router.push('/user/login');
    } else if (res.code >= 40000) {
      message.error(res.message);
    }
  }
  return response;
});
export default request;
