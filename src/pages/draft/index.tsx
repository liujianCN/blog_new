import { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Editor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
// import { StoreState } from '@/store/thunk';
import gfm from 'remark-gfm';
import { storeActions, StoreState } from '@/store/thunk';
import { notification } from 'antd';
import styles from './index.less';
import Title from './Title';

const Draft: React.FC = () => {
  const dispatch = useDispatch();
  const mdEditor = useRef<Editor>(null);
  const { content: detail, title, belong } = useSelector((state: StoreState) => state.draft);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      dispatch(storeActions.draft.effects.getBlogDetail({ id }));
    }
    dispatch(storeActions.draft.effects.getBlogBelongs());
    return () => {
      dispatch(storeActions.draft.reducers.resetDraft());
    };
  }, [dispatch, id]);

  useEffect(() => {
    mdEditor.current?.setText(detail);
  }, [detail]);

  const handleSubmit = useCallback(() => {
    if (!title.trim()) {
      notification.warn({ message: '请输入标题' });
      return;
    }
    if (!belong.trim()) {
      notification.warn({ message: '请输入所属' });
      return;
    }
    const content = mdEditor.current?.getMdValue();
    if (!content?.trim()) {
      notification.warn({ message: '请输入所属' });
      return;
    }
    const data = {
      title,
      belong,
      content,
    };
    if (id) {
      dispatch(storeActions.draft.effects.modifyBlog({ id, ...data })).then(() => {
        notification.success({ message: '修改成功', duration: 2 });
      });
      return;
    }
    dispatch(storeActions.draft.effects.addBlog(data)).then(() => {
      notification.success({ message: '创建成功', duration: 2 });
    });
  }, [belong, dispatch, id, title]);
  return (
    <div className={styles.draftContainer}>
      <Title onSubmit={handleSubmit} />
      <Editor
        ref={mdEditor}
        renderHTML={(text) => <ReactMarkdown source={text} plugins={[gfm]} />}
        config={{
          view: { menu: true, md: true, html: false },
        }}
      />
    </div>
  );
};

export default Draft;
