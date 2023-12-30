// const BASE_URL = "http://api.007law.test:800/api";
const BASE_URL = 'https://law.longbao.wang/api';

// 请求拦截器
const requestInterceptor = (headers) => {
  const token = uni.getStorageSync("TOKEN");
  // 在请求前做一些处理，例如添加通用的请求头
  headers = {
    "Content-Type": "application/json",
    ...headers,
    Authorization: "Bearer " + token,
  };
  return headers;
};

// 响应拦截器
const responseInterceptor = (url, response) => {
  console.log("===>", url, response?.data);
  // 在收到响应后做一些处理
  if (response?.statusCode === 200) {
    console.log("ok");
    return response.data;
  } else {
    console.log("failed");
    return Promise.reject(response?.data);
  }
};

// 封装请求方法
export const request = (url, method = "GET", data = {}, headers = {}) => {
  // 应用请求拦截器
  headers = requestInterceptor(headers);

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method: method || "GET",
      data: data || {},
      header: headers || {},
      success: (res) => {
        // 应用响应拦截器
        const result = responseInterceptor(url, res);
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

// 封装请求方法
export const streamRequest = (
  url,
  method = "GET",
  data = {},
  headers = {},
  receivedCallback = null
) => {
  // 应用请求拦截器
  headers = requestInterceptor(headers);
  console.log("request", headers);
  const requestTask = uni.request({
    url: BASE_URL + url,
    timeout: 15000,
    responseType: "text",
    method: method || "GET",
    data: data || {},
    header: headers || {},
    enableChunked: true,
    success: (res) => {
      console.log("result", res);
    },
    fail: (err) => {
      uni.showToast({
        title: err,
        duration: 5000,
      });
      console.log(err);
    },
  });

  // 监听消息
  requestTask.onChunkReceived(function (res) {
    console.log("callback");
    const uint8Array = new Uint8Array(res.data);

    let text = String.fromCharCode.apply(null, uint8Array);

    text = decodeURIComponent(escape(text));

    for (const iterator of text.split(`\n`)) {
      let str = iterator.trim(`\n`);
      str = iterator.trim();
      console.log(str);
      // JSON 数据
      if (str[0] === "{" && str[iterator.length - 1] === "}") {
        const data = JSON.parse(str);
        receivedCallback(data);
      }
    }
  });
};

// 上传
export const uploadRequest = (url, filePath, name) => {
  const header = requestInterceptor({ "Content-Type": "multipart/form-data","Accept":"application/json" });

  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: BASE_URL + url,
      filePath: filePath,
      name: name,
      header: header,
      success: function (res) {
        resolve(JSON.parse(res.data))
      },
      fail: function (err) {
        reject(err)
      },
    });
  });
};

export default request;
