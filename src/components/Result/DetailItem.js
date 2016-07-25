import { get, map } from '../../utils/lodash';
import React, { PropTypes } from 'react';

const Link = ({ value }) => <a href={value}>{value}</a>;
Link.propTypes = { value: PropTypes.string.isRequired };

const ListItem = ({ value }) => (value ? <li>{value}</li> : null);
ListItem.propTypes = { value: PropTypes.string };

const AddressList = ({ value }) => {
  if (!value) return null;

  const items = map(value, (item, i) => (
    <li key={i}>
      <ul>
        <ListItem value={item.address} />
        <ListItem value={item.city} />
        <ListItem value={item.state} />
        <ListItem value={item.post_code} />
        <ListItem value={item.country} />
      </ul>
    </li>
  ));
  return (
    <ol className="explorer__result-item__addresses">{items}</ol>
  );
};
AddressList.propTypes = { value: PropTypes.array };

const IdentificationList = ({ value }) => {
  if (!value) return null;

  const items = map(value, (item, i) => (
    <li key={i}>
      <table>
        <tbody>
          <Row label="Type">{item.type}</Row>
          <Row label="Number">{item.number}</Row>
          <Row label="Country">{item.country}</Row>
          <Row label="Issue Date">{item.issue_date}</Row>
          <Row label="Expiration Date">{item.expiration_date}</Row>
        </tbody>
      </table>
    </li>
  ));

  return (
    <ol className="explorer__result-item__identifications">{items}</ol>
  );
};
IdentificationList.propTypes = { value: PropTypes.array };

const UnorderedList = ({ value }) => {
  if (!value) return null;
  const items = map(value, (item, i) => (
    <li key={i}>{item}</li>
  ));
  return <ul>{items}</ul>;
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
  IdentificationList,
  Link,
  ListItem,
  Row,
  UnorderedList,
};
