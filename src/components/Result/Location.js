import { compact } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

const formatter = ({ city, state, country }) => (
  compact([city, state, country]).join(', ')
);
const Location = ({ item }) => (
  <div className="explorer__result_location">
    <div>{formatter(item)}</div>
  </div>
);
Location.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Location;
