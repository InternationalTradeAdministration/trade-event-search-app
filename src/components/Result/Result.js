import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import Item from './SimpleCard';
import './Result.scss';

const Result = ({ results }) => {
  if (results.isFetching) return null;

  const items = map(results.items, result => (
    <Item key={result.id} result={result} />
  ));

  return (
    <div className="explorer__result">
      {items}
    </div>
  );
};
Result.propTypes = {
  results: PropTypes.object.isRequired,
};

export default Result;
