import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { propTypes } from './propTypes';
import Spinner from '../../atoms/Spinner';
import PageTransition from '../../atoms/PageTransition/index';
import SEO from '../../atoms/SEO';
import TopPeopleProfile from '../../organisms/TopPeople';

const TopPeople = ({ loading, toppeople }) => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const actPage = (parseInt(search.get('page'), 10)) || 1;

  const history = useHistory();
  const [page, setPage] = useState(actPage);

  const handlePageSelect = e => {
    if (e > 0) {
      setPage(e);
      history.push(`/person?page=${e}`);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <PageTransition>
      <SEO title="Popular people" />
      <div>
        <PageTransition>
          <TopPeopleProfile
            page={page}
            toppeople={toppeople}
            handlePageSelect={handlePageSelect}
            />
        </PageTransition>
      </div>
    </PageTransition>
  );
};

TopPeople.propTypes = propTypes;

export default TopPeople;