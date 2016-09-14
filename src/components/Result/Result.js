import React, { PropTypes } from 'react';

import { isEmpty, map, omit } from '../../utils/lodash';
import Item from './Item';
import Pages from './Pages';
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

const Result = ({ onPaging, query = {}, results }) => {
  const items = map(results.items, (result) => (
    <Item key={result.id} result={result} onClick={() => { window.location.href = result.hosted_url; }} />
  ));

  const pagesProps = {
    current: Math.ceil((query.offset ? query.offset : 0) / 10) + 1,
    displayed: 5,
    total: Math.ceil(results.total / 10),
    handleClick: onPaging,
  };

  return (
    <div className="explorer__result">
      {items}
    </div>
  );
};
Result.propTypes = {
  query: PropTypes.object,
  results: PropTypes.object,
};

export default Result;
