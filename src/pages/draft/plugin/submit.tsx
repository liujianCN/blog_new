import React, { useCallback } from 'react';
import { SendOutlined } from '@ant-design/icons';

import { asyncActionAddBlog, asyncActionUpdateBlog } from '@/store/thunk/models/draft/actions';
import { StoreState } from '@/store/thunk/reducer';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PluginProps } from 'react-markdown-editor-lite';

const Submit = ({ editor }: PluginProps) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { belong, title } = useSelector((state: StoreState) => state.draft);
  const handleClick = useCallback(() => {
    const data = {
      title,
      belong,
      content: editor.getMdValue()
    };
    if (id) {
      (dispatch(asyncActionUpdateBlog({ id, ...data })) as any).then(() => {
        console.log('修改成功！');
      });
    }
    (dispatch(asyncActionAddBlog(data)) as any).then((res: any) => {
      console.log(res);
      message.success('创建成功');
    });
  }, [belong, dispatch, editor, id, title]);
  return (
    <span className="button button-draft-submit" title="submit" onClick={handleClick}>
      <SendOutlined rotate={-90} />
    </span>
  );
};

Submit.align = 'left';
Submit.pluginName = 'submit';

export default Submit;
