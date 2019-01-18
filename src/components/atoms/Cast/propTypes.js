import { object } from 'prop-types';

export const contextTypes = {
  router: object.isRequired,
};

export const propTypes = {
  cast: object.isRequired,
};

export const defaultProps = {
  cast: {},
};
