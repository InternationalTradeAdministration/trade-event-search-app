import React, { PropTypes } from 'react';
import { costFormatter, dateFormatter } from '../../utils/formatter';
import List from '../List/List';
import Location from './Location';
import './Card.scss';

const SimpleCard = ({ result }) => {
  const {
    name, cost, venues, event_type: eventType,
    registration_url: registrationURL, hosted_url: hostedURL,
    start_date: startDate, end_date: endDate,
  } = result;
  return (
    <div className="explorer__card explorer__card--simple">
      <a href={hostedURL} className="explorer__card__main">
        <div className="explorer__card__date">{dateFormatter(startDate, endDate)}</div>
        <div className="explorer__card__name">{name}</div>
        <div className="explorer__card__type"><span>Event Type: {eventType || 'n/a'}</span></div>
        <div className="explorer__card__location">
          <List className="explorer__card__list" component={Location} items={venues} />
        </div>
      </a>
      <a href={registrationURL || hostedURL} className="explorer__card__cost">
        {costFormatter(cost)}
      </a>
    </div>
  );
};
SimpleCard.propTypes = {
  result: PropTypes.object.isRequired,
};

export default SimpleCard;
