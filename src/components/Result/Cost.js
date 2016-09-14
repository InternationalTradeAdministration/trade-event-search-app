import React, { PropTypes } from 'react';
import numeral from 'numeral';

const Cost = ({ cost }) => {
  let text = numeral(cost).format('$0,0[.]00');
  if (cost === 0) text = 'Free';
  else if (!cost) text = 'Undisclosed';
  return (
    <div>{text}</div>
  );
};
Cost.propTypes = {
  cost: PropTypes.number,
};

export default Cost;
