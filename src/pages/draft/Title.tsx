import React, { useCallback, useState, useMemo } from 'react';
import { Button, Input, Tag, Popover, Space, message } from 'antd';
import { CheckCircleOutlined, DownOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { StoreState, storeActions } from '@store/index';
import styles from './index.less';

const defaultInput = {
  key: '',
  name: '',
  belong: '',
};
interface DraftTitleProps {
  onSubmit: () => void;
}
const DraftTitle: React.FC<DraftTitleProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState(defaultInput);
  const { title, belong, belongs, belongList } = useSelector((state: StoreState) => state.draft);

  const belongName = useMemo(() => {
    return belongList.find((item) => item.key === belong)?.name || '请选择';
  }, [belong, belongList]);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(storeActions.draft.reducers.save({ title: e.target.value }));
    },
    [dispatch]
  );

  const handleItemClick = useCallback(
    (item: string, name) => {
      dispatch(storeActions.draft.reducers.save({ belong: item, belongName: name }));
      setVisible(false);
    },
    [dispatch]
  );

  const handleInputBlur = useCallback(() => {
    const { key, name } = input;
    if (key === '' && name === '') {
      setInput(defaultInput);
    } else if (key !== '' && name !== '') {
      const father = belongs.find((item) => item.key === input.belong);
      // setInput(defaultInput);
      const fatherSort = father?.sort;
      const sort = father?.children?.length || 0;
      console.log({ ...input, sort: `${fatherSort}${sort}` });
      dispatch(
        storeActions.draft.effects.addBelong({ ...input, sort: `${fatherSort}${sort}` })
      ).then(() => {
        message.success('成功添加');
        dispatch(storeActions.draft.effects.getBlogBelongs());
        setInput(defaultInput);
      });
    }
  }, [input, belongs, dispatch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, key) => {
    console.log(e.target.value);
    // setInputVisible('');
    setInput((v) => ({ ...v, [key]: e.target.value }));
  }, []);

  const content = useMemo(() => {
    return (
      <div style={{ maxWidth: 260 }}>
        {belongs.map((item) => (
          <div key={item.key}>
            <div>{item.name}</div>
            {item.children.map(({ key, name }) => (
              <Tag
                key={key}
                style={{ cursor: 'pointer', marginBottom: 7 }}
                onClick={() => {
                  handleItemClick(key, name);
                }}
                icon={belong === key ? <CheckCircleOutlined /> : null}
              >
                {name}
              </Tag>
            ))}
            {input.belong === item.key ? (
              // <div className={styles.tagInput}>
              <Space>
                {['key', 'name'].map((key) => (
                  <Input
                    key={key}
                    placeholder={`输入${key}`}
                    onBlur={handleInputBlur}
                    value={input[key as 'key' | 'name']}
                    onChange={(e) => handleInputChange(e, key)}
                    autoFocus={key === 'key'}
                  />
                ))}
              </Space>
            ) : (
              <Tag onClick={() => setInput((v) => ({ ...v, belong: item.key }))}>添加</Tag>
            )}
          </div>
        ))}
      </div>
    );
  }, [belong, belongs, input, handleInputBlur, handleInputChange, handleItemClick]);

  return (
    <div className={styles.title}>
      <Input placeholder="请输入标题" value={title} onChange={handleTitleChange} />
      <Popover
        // placement="topRight"
        visible={visible}
        content={content}
        onVisibleChange={setVisible}
        trigger="click"
      >
        <Button type="primary" style={{ marginRight: 20 }}>
          {belongName} <DownOutlined />
        </Button>
      </Popover>
      <Button type="primary" onClick={onSubmit}>
        发布
      </Button>
    </div>
  );
};

export default DraftTitle;
