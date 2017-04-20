import { isEmpty, map } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

const List = ({ className = '', component, items }) => {
  if (isEmpty(items)) return null;
  const listItems = map(items, (item, index) => (
    <li key={index}>{component({ item })}</li>
  ));
  return <ul className={className}>{listItems}</ul>;
};
List.propTypes = {
  className: PropTypes.string,
  component: PropTypes.func.isRequired,
  items: PropTypes.array,
};

export default List;
