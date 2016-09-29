import React, { PropTypes } from 'react';

const Industry = ({ item }) => (
  <div className="explorer__result__industry">{item}</div>
);
Industry.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Industry;
