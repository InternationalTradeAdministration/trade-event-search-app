import { map } from 'lodash';
import React, { PropTypes } from 'react';
import Item from './Item';

const ResultList = ({ results }) => {
  const items = map(results.items, result => (
    <Item result={result} />
  ));

  return (
    <div>{items}</div>
  );
};
ResultList.propTypes = {
  results: PropTypes.object,
};

export default ResultList;
