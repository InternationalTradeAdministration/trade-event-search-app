import { map } from 'lodash';
import React from 'react';

const AddressList = ({ addresses }) => {
  const ordered = map(addresses, (address, i) => (
    <li key={i}>
      <ul>
        { map(address, (item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    </li>
  ));
  return (
    <ol className="explorer__result-item__addresses">{ordered}</ol>
  );
};

export default AddressList;
