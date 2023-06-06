import React from 'react';
import PropTypes from 'prop-types';
import { dateFormatter } from '../../utils/formatter';
import List from '../List/List';
import Location from './Location';
import './Card.scss';

const SimpleCard = ({ result }) => {
  const hostedURL = result.registration_url || result.url;
  const {
    name, venues, event_type: eventType,
    start_date: startDate, end_date: endDate,
  } = result;
  return (
    <div className="explorer__card explorer__card--simple  col-4">
      <a href={hostedURL} className="explorer__card__main" target="_blank">
        <div className="explorer__card__date">{dateFormatter(startDate, endDate)}</div>
        <div className="explorer__card__name">{name}</div>
        <div className="explorer__card__type"><span>Event Type: {eventType || 'n/a'}</span></div>
        <div className="explorer__card__bottom">
          <div className="cta-button"><a href={hostedURL}><p>Learn more</p></a></div>
        </div>
        <div className="explorer__card__location">
          <List className="explorer__card__list" component={Location} items={venues} />
        </div>
      </a>
    </div>
  );
};
SimpleCard.propTypes = {
  result: PropTypes.object.isRequired,
};

export default SimpleCard;
