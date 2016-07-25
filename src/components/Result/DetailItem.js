import { get, map } from '../../utils/lodash';
import React, { PropTypes } from 'react';

const Link = ({ value }) => <a href={value}>{value}</a>;
Link.propTypes = { value: PropTypes.string.isRequired };

const ListItem = ({ value }) => (value ? <li>{value}</li> : null);
ListItem.propTypes = { value: PropTypes.string };

const AddressList = ({ value }) => {
  if (!value) return null;

  const ordered = map(value, (address, i) => (
    <li key={i}>
      <ul>
        <ListItem value={address.address} />
        <ListItem value={address.city} />
        <ListItem value={address.state} />
        <ListItem value={address.post_code} />
        <ListItem value={address.country} />
      </ul>
    </li>
  ));
  return (
    <ol className="explorer__result-item__addresses">{ordered}</ol>
  );
};
AddressList.propTypes = { value: PropTypes.array };

const UnorderedList = ({ value }) => {
  if (!value) return null;
  const unordered = map(value, (item, i) => (
    <li key={i}>{item}</li>
  ));
  return <ul>{unordered}</ul>;
};
UnorderedList.propTypes = { value: PropTypes.array };

const Row = ({ label, children }) => {
  if (typeof children === 'undefined' || children === null) return null;
  // null if children is a react component but with no value as props
  if (typeof children.type === 'function' &&
      typeof get(children, ['props', 'value']) === 'undefined') return null;
  return (
    <tr>
      <td>{label}</td>
      <td>{children}</td>
    </tr>
  );
};
Row.propTypes = { label: PropTypes.string.isRequired, children: PropTypes.any };

export {
  AddressList,
  Link,
  ListItem,
  Row,
  UnorderedList,
};
