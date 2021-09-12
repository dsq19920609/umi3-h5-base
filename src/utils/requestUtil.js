import * as axios from 'axios';
import { getDvaApp, history } from 'umi';
import { isEmpty } from 'lodash';
import { Toast } from 'antd-mobile';
import CryptoJS from 'crypto-js/crypto-js';

// 维护一个请求序列
// 1、当序列为空时，隐藏PageLoading, 当不为空时，显示PageLoading
// 2、节流控制
// 3、当路由切换时 取消上个路由未完成请求
let urlsMap = new Map();

function hiddenLoading() {
  getDvaApp()._store.dispatch({
    type: 'global/save',
    payload: {
      isLoading: false,
    },
  });
}

function showLoading() {
  getDvaApp()._store.dispatch({
    type: 'global/save',
    payload: {
      isLoading: true,
    },
  });
}

function qryToString(params) {
  let buffix = '';
  if (params) {
    const arr = Object.entries(params);
    buffix = buffix + '?';
    arr.forEach(item => {
      buffix = buffix + `${item[0]}=${item[1]}`
    });
  }
  return buffix;
}

function removeReq(config) {
  const { url, method, params } = config;
  let allUrl = method === 'get' ? url + qryToString(params) : url;
  if (urlsMap.has(allUrl)) {
    const cancel = urlsMap.get(allUrl);
    cancel(url);
    urlsMap.delete(allUrl);
  }
}

function addReq(config) {
  const { url, method, params } = config;
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      let allUrl = method === 'get' ? url + qryToString(params) : url;
      if (!urlsMap.has(allUrl)) {
        urlsMap.set(allUrl, cancel);
      }
    });
}

function clearReqs() {
  if (urlsMap.size === 0) {
    return;
  }
  for (const [url, cancel] of urlsMap) {
    cancel(url);
  }
  hiddenLoading();
  urlsMap.clear();
}

const instance = axios.create({
  baseURL: '/',
  timeout: 30000,
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认的 状态码在200-300间才resolve,其他reject
  },
});

instance.interceptors.request.use((config) => {
  removeReq(config);
  addReq(config);
  if (urlsMap.size === 1 && !config.noLoading) {
    showLoading();
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (!response) {
      // 特殊的相应
      hiddenLoading();
      urlsMap.clear();
      Toast.info('Sorry, the server is abnormal');
      return Promise.reject('Sorry, the server is abnormal');
    } else {
      if (response.status === 200) {
        const result = response.data;
        const { url, method, params } = response.config;
        let allUrl = method === 'get' ? url + qryToString(params) : url;
        urlsMap.delete(allUrl);
        if (urlsMap.size === 0) {
          hiddenLoading();
        }
        Promise.resolve(result.resultData);
      }
    }
  },
  (error) => {
    let errorMsg = null;
    // 特殊的报错
    if (!error.response && !error.message) {
      errorMsg = 'operation failed';
      hiddenLoading();
    }
    // 取消请求 或超时
    if (!error.response && error.message) {
      if (urlsMap.has(error.message)) {
        urlsMap.delete(error.message);
        if (urlsMap.size === 0) {
          hiddenLoading();
        }
      } else {
        hiddenLoading();
      }
    }
    if (error && error.response) {
      const {
        response: {
          status,
          statusText,
          config,
        },
      } = error;
      const { url, method, params } = config;
      let allUrl = method === 'get' ? url + qryToString(params) : url;
      urlsMap.delete(allUrl);
      if (urlsMap.size === 0) {
        hiddenLoading();
      }
      switch (status) {
        case 500:
        case 502:
        case 401:
        case 403:
          errorMsg = statusText;
          break;
        case 404:
          errorMsg = 'Failed to load data';
          break;
        case 503:
          history.push('/network/fail');
          break;
        default:
          errorMsg = 'Server exception';
          break;
      }
      Toast.info(errorMsg);
    }
    return Promise.reject(errorMsg ? errorMsg : '');
  },
);

function get(options) {
  const { url, params, ...config } = options;
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params,
        ...config,
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function post(options) {
  const { url, data, ...config } = options;
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        ...config,
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

//并发请求 必须全部请求成功, 才返回成功, 返回结果顺序和请求顺序相同
function all(options) {
  if (!Array.isArray(options) || options.length === 0) {
    throw new TypeError('params must be an array');
  }
  return new Promise((resolve, reject) => {
    axios
      .all(options)
      .then(
        axios.spread(function (...result) {
          resolve(result);
        }),
      )
      .catch((error) => {
        reject(error);
      });
  });
}

export { get, post, all, clearReqs };
