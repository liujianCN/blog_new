import React, { useCallback, useMemo } from 'react';
import { Input, Popover, Tag } from 'antd';
import { FlagOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { actionSaveDraftBelong, actionSaveDraftTitle } from '@/store/thunk/models/draft/actions';

import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@/store/thunk/reducer';

const Belong = () => {
  const dispatch = useDispatch();
  const { belong, title } = useSelector((state: StoreState) => state.draft);
  const handleItemClick = useCallback(
    (text: string) => {
      dispatch(actionSaveDraftBelong(text));
    },
    [dispatch]
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actionSaveDraftTitle(e.target.value));
    },
    [dispatch]
  );

  const popTitle = useMemo(() => {
    return <Input className="draft-title" value={title} onChange={handleTitleChange} />;
  }, [handleTitleChange, title]);

  const content = useMemo(() => {
    return (
      <div style={{ maxWidth: 260 }}>
        {[
          { text: 'html', color: 'magenta' },
          { text: 'css', color: 'red' },
          { text: 'js', color: 'volcano' },
          { text: 'react', color: 'orange' },
          { text: 'redux', color: 'gold' },
          { text: 'router', color: 'lime' },
          { text: 'axios', color: 'green' }
        ].map(({ text, color }) => (
          <Tag
            color={color}
            key={text}
            style={{ cursor: 'pointer', marginBottom: 7 }}
            onClick={() => {
              handleItemClick(text);
            }}
            icon={belong === text ? <CheckCircleOutlined /> : null}
          >
            {text}
          </Tag>
        ))}
      </div>
    );
  }, [belong, handleItemClick]);
  return (
    <span className="button" title="belong">
      <Popover title={popTitle} content={content} trigger="click">
        <FlagOutlined />
      </Popover>
    </span>
  );
};

Belong.align = 'left';
Belong.pluginName = 'belong';

export default Belong;
