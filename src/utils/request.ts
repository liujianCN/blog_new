import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { notification } from 'antd';

// 重写
interface AxiosResponseData<T = any> {
  ok: boolean;
  code?: number;
  message: string;
  data: T;
}

interface MyAxiosInstance extends AxiosInstance {
  request<T = any, R = AxiosResponseData<T>>(config: AxiosRequestConfig): Promise<R>;
  get<T = any, R = AxiosResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  delete<T = any, R = AxiosResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  head<T = any, R = AxiosResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  options<T = any, R = AxiosResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T = any, R = AxiosResponseData<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  put<T = any, R = AxiosResponseData<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  patch<T = any, R = AxiosResponseData<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
}

const request: MyAxiosInstance = axios.create({
  baseURL: 'https://liujiancn.cn/api/v1',
  withCredentials: true,
  timeout: 1000 * 20
});

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // return config or
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  ({ data }: AxiosResponse<AxiosResponseData>): any => {
    // 统一的错误处理
    if (data.ok === false) {
      if (data.message) {
        notification.error({ message: data.message });
      }
      // 登录拦截
      if (data.code === 30001) {
        window.location.href = '/app/login';
      }
      return Promise.reject(new Error(data.message || '系统错误'));
    }
    if (data.ok === true) {
      return data;
    }
    return Promise.reject(new Error('格式错误'));
  },
  (err) => {
    return Promise.reject(err.message);
  }
);

export * from 'axios';
export default request;

interface GithubResponse extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export const githubRequest: GithubResponse = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: 'token 7228f2a03ca8bd3c00b3983eb7b04728c5395f8e'
  }
});

githubRequest.interceptors.response.use(
  (res) => {
    const { message: err } = res.data;
    if (err) {
      notification.error(err);
      return Promise.reject(err);
    }
    return res.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
