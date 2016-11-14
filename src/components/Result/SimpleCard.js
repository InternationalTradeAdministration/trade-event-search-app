import React, { PropTypes } from 'react';
import { costFormatter, dateFormatter } from '../../utils/formatter';
import List from '../List/List';
import Location from './Location';
import './Card.scss';

const SimpleCard = ({ result }) => {
  const {
    name, cost, venues,
    registration_url: registrationURL, hosted_url: hostedURL,
    start_date: startDate, end_date: endDate,
  } = result;
  return (
    <div className="explorer__card explorer__card--simple">
      <div className="explorer__card__main">
        <div className="explorer__card__date">{dateFormatter(startDate, endDate)}</div>
        <div className="explorer__card__name"><a href={hostedURL}>{name}</a></div>
        <div className="explorer__card__location">
          <List className="explorer__card__list" component={Location} items={venues} />
        </div>
        <a href={registrationURL} className="explorer__card__cost">{costFormatter(cost)}</a>
      </div>
    </div>
  );
};
SimpleCard.propTypes = {
  result: PropTypes.object.isRequired,
};

export default SimpleCard;
