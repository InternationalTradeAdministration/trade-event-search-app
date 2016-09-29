import { compact } from 'lodash';
import React, { PropTypes } from 'react';
import './Contact.scss';

const formatter = {
  name: (firstName, lastName, post) => (
    compact([`${firstName || ''} ${lastName || ''}`.trim(), post]).join(', ')
  ),
};
const Contact = ({ item }) => (
  <div className="explorer__result__contact">
    <div>
      {formatter.name(item.first_name, item.last_name, item.post)}
    </div>
    <div>{item.person_title}</div>
    <div>{item.phone}</div>
    <div><a className="explorer__result__contact__mailto" href={`mailto:${item.email}`}>{item.email}</a></div>
  </div>
);
Contact.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Contact;
