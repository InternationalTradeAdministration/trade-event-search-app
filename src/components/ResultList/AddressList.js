import { map } from 'lodash';
import React from 'react';

const AddressList = ({ addresses }) => {
  const ordered = map(addresses, address => (
    <li>
      <ul>
        { map(address, item => (
          <li>{item}</li>
        ))}
      </ul>
    </li>
  ));
  return (
    <ol className="csl__result-item__addresses">{ordered}</ol>
  );
};

export default AddressList;
