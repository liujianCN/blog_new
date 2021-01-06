import * as draftApi from '@/server/draft';
import { AppThunk } from '@/store/thunk';
import * as draftTypes from './types';

export const actionSaveDraftTitle = (title: string) => {
  return {
    type: draftTypes.SAVE_DRAFT_TITLE,
    title
  };
};
export const actionSaveDraftBelong = (belong: string) => {
  return {
    type: draftTypes.SAVE_DRAFT_BELONG,
    belong
  };
};
export const actionSaveDraftContent = (content: string) => {
  return {
    type: draftTypes.SAVE_DRAFT_CONTENT,
    content
  };
};

export const asyncActionAddBlog = (
  data: draftApi.IAddBlogParams
): AppThunk<Promise<any>> => async () => {
  await draftApi.addBlog(data);
};

export const asyncActionUpdateBlog = (data: draftApi.IModifyBlogParams) => async () => {
  await draftApi.modifyBlog(data);
};

export const asyncActionGetBlogDetail = (
  data: draftApi.IGetBlogDetailParams
): AppThunk<Promise<any>> => async (dispatch) => {
  const res = await draftApi.getBlogDetail(data);
  dispatch(actionSaveDraftTitle(res.data.title));
  dispatch(actionSaveDraftBelong(res.data.belong));
  dispatch(actionSaveDraftContent(res.data.content));
};
