import { map } from '../../utils/lodash';
import React, { PropTypes } from 'react';

const AddressList = ({ addresses }) => {
  const ordered = map(addresses, (address, i) => (
    <li key={i}>
      <ul>
        {map(address, (item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    </li>
  ));
  return (
    <ol className="explorer__result-item__addresses">{ordered}</ol>
  );
};
AddressList.propTypes = {
  addresses: PropTypes.array.isRequired,
};

export default AddressList;
