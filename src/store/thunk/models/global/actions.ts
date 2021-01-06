import * as globalTypes from './types';

export const toggleMenuVisible = (menuVisible: boolean) => {
  return {
    type: globalTypes.GLOBAL_TOGGLE_MENU_VISIBLE,
    menuVisible
  };
};
export const min = (number?: number) => ({
  type: globalTypes.HOME_MIN,
  number
});
