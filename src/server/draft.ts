import { Belong } from '@/store/thunk/models/draft/types';
import { Blog } from '@/store/thunk/models/home/types';
import request from '@/utils/request';

export interface IAddBlogParams {
  title: string;
  belong: string;
  content: string;
}
export const addBlog = (data: IAddBlogParams) => {
  return request.post('/blog/create', data);
};

export interface IModifyBlogParams extends IAddBlogParams {
  id: string;
}
export const modifyBlog = ({ id, ...other }: IModifyBlogParams) => {
  return request.put(`/blog/${id}`, other);
};

export interface IGetBlogDetailParams {
  id: string;
}
export const getBlogDetail = ({ id }: IGetBlogDetailParams) => {
  return request.get<Blog>(`/blog/${id}`);
};

export interface GetBlogPageParams {
  current?: number;
  size?: number;
  // TODO 模糊查询
}
export const getBlogPage = (data: GetBlogPageParams) => {
  return request.post<{ records: Blog[]; total: number }>(`/blog/page`, data);
};
export const getBelongs = () => {
  return request.get<Belong[]>(`/belongs`);
};
export type AddBelongParams = Omit<Belong, '_id'>;
export const addBelong = (data: AddBelongParams) => {
  return request.post(`/belongs/add`, data);
};
