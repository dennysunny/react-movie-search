import { compose, withProps } from 'recompose';

import withTvs from '../../queries/withTvs';
import withConfig from '../../queries/withConfig';
import withGenres from '../../queries/withGenres';
import Tvs from '../../templates/Tvs';

export default compose(
  withProps(props => {
    const params = props.location.search.slice(1);
    return { 'query': params }
  }),
  withTvs(),
  withConfig(),
  withGenres(),
)(Tvs);
