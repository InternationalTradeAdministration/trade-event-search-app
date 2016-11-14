import React, { PropTypes } from 'react';

import { isEmpty, map, omit } from '../../utils/lodash';
import Item from './SimpleCard';
import './Result.scss';

const Label = ({ count, query }) => {
  let text = 'Events';
  if (!isEmpty(omit(query, 'offset'))) {
    if (count === 0) text = 'No result.';
    else if (count === 1) text = `${count} result.`;
    else text = `${count} results.`;
  }
  return <p className="explorer__result__label">{text}</p>;
};
Label.propTypes = {
  count: PropTypes.number.isRequired,
  query: PropTypes.object,
};

const Result = ({ results }) => {
  if (results.isFetching) return null;

  const items = map(results.items, (result) => (
    <Item key={result.id} result={result} />
  ));

  return (
    <div className="explorer__result">
      {items}
    </div>
  );
};
Result.propTypes = {
  onPaging: PropTypes.func,
  query: PropTypes.object,
  results: PropTypes.object,
};

export default Result;
