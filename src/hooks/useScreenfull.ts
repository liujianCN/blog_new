import { useEffect, useState } from 'react';
import screenfull from 'screenfull';

const useScreenfull = (target?: Element) => {
  const [isScreenfull, setScreenfull] = useState();

  const toggle = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(target);
    }
  };

  useEffect(() => {
    function screenChange() {
      if (screenfull.isEnabled) {
        screenfull.on('change', () => {
          setScreenfull((screenfull as any).isFullscreen);
        });
      }
    }
    screenChange();
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', screenChange);
      }
    };
  }, []);

  return [isScreenfull, toggle];
};

export default useScreenfull;
