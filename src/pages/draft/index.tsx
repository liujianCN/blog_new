import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Editor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@/store/thunk';
import gfm from 'remark-gfm';
import { asyncActionGetBlogDetail } from '@/store/thunk/models/draft/actions';
import Belong from './plugin/belong';
import Submit from './plugin/submit';
import './draft.global.less';

Editor.use(Belong);
Editor.use(Submit);

const Draft: React.FC = () => {
  const dispatch = useDispatch();
  const mdEditor = useRef<Editor>(null);
  const { content } = useSelector((state: StoreState) => state.draft);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    document.querySelector<HTMLElement>('.button-type-fullscreen')?.click();
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(asyncActionGetBlogDetail({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    mdEditor.current?.setText(content);
  }, [content]);
  // const [value, setValue] = useState('xxx');

  // const handleClick = () => {
  //   if (mdEditor.current) {
  //     console.log((mdEditor.current as any).getMdValue());
  //   }
  // };

  // const handleEditorChange = ({ text }: { text: string }) => {
  //   const newValue = text.replace(/\d/g, '');
  //   setValue(newValue);
  // };

  return (
    <>
      <div style={{ height: 50 }} />
      <Editor
        ref={mdEditor}
        renderHTML={(text) => <ReactMarkdown source={text} plugins={[gfm]} />}
        config={{
          view: { menu: true, md: true, html: false }
        }}
      />
    </>
  );
};

export default Draft;
