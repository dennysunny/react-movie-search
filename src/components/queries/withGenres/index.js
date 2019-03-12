import { graphql } from 'react-apollo';
import { query } from './query';

const withGenres = () => graphql(query, {
  options: () => ({
    fetchPolicy: 'cache-and-network',
  }),
  props: ({
    data: {
      genres = [],
      loading,
    },
  }) => ({
    genresLoading: loading,
    genres,
  }),
});

export default withGenres;
