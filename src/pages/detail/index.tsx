import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Space } from 'antd';
import gfm from 'remark-gfm';
import moment from 'moment';
import { storeActions, StoreState } from '@/store/thunk';
// import styles from './index.less';

interface Props {}
const Detail: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { content, updatedAt } = useSelector((state: StoreState) => state.detail);
  useEffect(() => {
    dispatch(storeActions.detail.effects.getBlogDetail({ id }));
    return () => {
      dispatch(storeActions.detail.reducers.save({ content: '' }));
    };
  }, [dispatch, id]);
  return (
    <Card>
      <Space split="·">
        <span>{moment(updatedAt).format('LL')}</span>
        <Link to={`/draft/${id}`}>编辑</Link>
      </Space>
      <ReactMarkdown className="custom-html-style" plugins={[gfm]}>
        {content}
      </ReactMarkdown>
    </Card>
  );
};

export default Detail;
