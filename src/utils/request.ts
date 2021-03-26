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
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}
// document.cookie =
//   'k.sess=eyJ1c2VyIjp7ImxvZ2luIjoibGl1amlhbkNOIiwibmFtZSI6IuWImOWBpSIsInJvbGUiOiJhZG1pbiJ9LCJfZXhwaXJlIjoxNjExMzI3Mjc2NjM3LCJfbWF4QWdlIjoyNTkyMDAwMDB9';
// document.cookie = 'k.sess.sig=jNLVDh2QDY9MYnsrkYo-D3ZXMak';
const request: MyAxiosInstance = axios.create({
  baseURL: 'https://liujiancn.cn/api/v1',
  // baseURL: '/api/v1',
  withCredentials: true,
  timeout: 1000 * 20,
  validateStatus: (status) => status >= 200,
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
        // TODO 登录地址
        window.location.href = '/login';
      }
      return Promise.reject(new Error(data.message || '系统错误'));
    }
    if (data.ok === true) {
      return data.data;
    }
    return Promise.reject(new Error('格式错误'));
  },
  (err) => {
    console.log(err);
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
    Authorization: 'token 7228f2a03ca8bd3c00b3983eb7b04728c5395f8e',
  },
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
