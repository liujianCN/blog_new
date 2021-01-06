import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import useScreenfull from '@hooks/useScreenfull';

const ScreenFull = () => {
  const [isScreenfull, toggle] = useScreenfull();

  return (
    <div style={{ cursor: 'pointer' }} onClick={toggle}>
      {isScreenfull ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
    </div>
  );
};
export default ScreenFull;
