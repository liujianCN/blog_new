import { IBlogDetail } from '@/store/thunk/models/draft';
import request from '@utils/request';

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
  return request.get<IBlogDetail>(`/blog/${id}`);
};
