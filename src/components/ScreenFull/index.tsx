import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import useScreenfull from '@/hooks/useScreenfull';

interface ScreenFullProps {
  style?: React.CSSProperties;
}
const ScreenFull: React.FC<ScreenFullProps> = ({ style = {} }) => {
  const [isScreenfull, toggle] = useScreenfull();

  return (
    <div style={{ cursor: 'pointer', width: 48, textAlign: 'center', ...style }} onClick={toggle}>
      {isScreenfull ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
    </div>
  );
};
export default ScreenFull;
