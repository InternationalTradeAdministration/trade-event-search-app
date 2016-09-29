import { isEmpty } from 'lodash';
import React, { PropTypes } from 'react';

const Row = ({ children, nohr, value }) => {
  if (isEmpty(value)) return null;
  const hr = !nohr ? (<hr className="explorer__card__hr" />) : null;
  return (
    <div>
      <div className="explorer__card__row">{children}</div>
      {hr}
    </div>
  );
};
Row.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  nohr: PropTypes.bool,
  value: PropTypes.any,
};

export default Row;
