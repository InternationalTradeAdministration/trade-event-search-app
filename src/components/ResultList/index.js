import { isEmpty, map } from 'lodash';
import React, { PropTypes } from 'react';
import Item from './Item';
import Pages from './Pages';
import './ResultList.scss';

const Label = ({ count, query }) => {
  let text = 'Complete Consolidated Screening List';
  if (!isEmpty(query)) {
    text = count < 2 ? `${count} result.` : `${count} results.`;
  }
  return <p className="explorer__result-list__label">{text}</p>;
};
Label.propTypes = {
  count: PropTypes.number.isRequired,
  query: PropTypes.object,
};

const ResultList = ({ onPaging, query = {}, results }) => {
  if (results.isFetching) return null;
  const items = map(results.items, result => (
    <Item key={result.id} result={result} />
  ));

  const pagesProps = {
    current: 1,
    displayed: 5,
    total: Math.ceil(results.total / 10),
    handleClick: onPaging,
  };

  return (
    <div className="explorer__result-list">
      <Label count={results.total} query={query} />
      {items}
      <Pages {...pagesProps} />
    </div>
  );
};
ResultList.propTypes = {
  onPaging: PropTypes.func.isRequired,
  query: PropTypes.object,
  results: PropTypes.object,
};

export default ResultList;
