import { compose, withProps } from 'recompose';

import withSeason from '../../queries/withSeason';
import Season from '../../templates/Season';

export default compose(
  withProps(props => {
    const tvId = parseInt(props.match.params.tvId);
    const season = parseInt(props.match.params.season);
    return { tvId, season }
  }),
  withSeason(),
)(Season);