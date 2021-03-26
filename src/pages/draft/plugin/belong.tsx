import React, { useCallback, useMemo, useState } from 'react';
import { Popover, Tag } from 'antd';
import { FlagOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { StoreState, storeActions } from '@store/index';

const Belong = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { belong } = useSelector((state: StoreState) => state.draft);
  const handleItemClick = useCallback(
    (text: string) => {
      dispatch(storeActions.draft.reducers.save({ belong: text }));
      setVisible(false);
    },
    [dispatch]
  );

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
          { text: 'axios', color: 'green' },
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
      <Popover visible={visible} content={content} onVisibleChange={setVisible} trigger="click">
        <FlagOutlined />
      </Popover>
    </span>
  );
};

Belong.align = 'left';
Belong.pluginName = 'belong';

export default Belong;
