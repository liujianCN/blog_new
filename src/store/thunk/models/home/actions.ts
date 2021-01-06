import * as homeTypes from './types';

export const add = (number?: number) => {
  return {
    type: homeTypes.HOME_ADD,
    number
  };
};
export const min = (number?: number) => ({
  type: homeTypes.HOME_MIN,
  number
});
