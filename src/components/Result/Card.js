import React, { PropTypes } from 'react';
import Row from './Row';
import List from '../List/List';
import Contact from './Contact';
import Industry from './Industry';
import Location from './Location';
import { costFormatter, dateFormatter } from '../../utils/formatter';
import './Card.scss';

const Card = ({ result }) => {
  const {
    name, description, contacts, cost, venues, industries, source,
    registration_url: registrationURL, event_type: type, hosted_url: hostedURL,
    start_date: startDate, end_date: endDate,
    start_time: startTime, end_time: endTime, time_zone: timeZone,
  } = result;
  return (
    <div className="explorer__card">
      <div className="explorer__card__main">
        <div className="explorer__card__date">{dateFormatter(startDate, endDate)}</div>
        <div className="explorer__card__name">{name}</div>
        <div className="explorer__card__link"><a href={hostedURL}>{hostedURL}</a></div>
        <div className="explorer__card__desc">{description}</div>
        <a href={registrationURL} className="explorer__card__cost">{costFormatter(cost)}</a>
      </div>
      <div className="explorer__card__detail">
        <Row value={type}>
          <div className="explorer__card__label">Event Type</div>
          <div className="explorer__card__value">{type}</div>
        </Row>

        <Row value={startTime}>
          <div className="explorer__card__label">Start Time</div>
          <div className="explorer__card__value">{startTime}</div>
        </Row>

        <Row value={endTime}>
          <div className="explorer__card__label">End Time</div>
          <div className="explorer__card__value">{endTime}</div>
        </Row>

        <Row value={timeZone}>
          <div className="explorer__card__label">Time Zone</div>
          <div className="explorer__card__value">{timeZone}</div>
        </Row>

        <Row value={industries}>
          <div className="explorer__card__label">Industries</div>
          <div className="explorer__card__value">
            <List className="explorer__card__list" component={Industry} items={industries} />
          </div>
        </Row>

        <Row value={registrationURL}>
          <div className="explorer__card__label">Registration URL</div>
          <div className="explorer__card__value">
            <a className="explorer__card__link" href={registrationURL}>{registrationURL}</a>
          </div>
        </Row>

        <Row value={contacts}>
          <div className="explorer__card__label">Contacts</div>
          <div className="explorer__card__value">
            <List className="explorer__card__list" component={Contact} items={contacts} />
          </div>
        </Row>

        <Row value={venues}>
          <div className="explorer__card__label">Location</div>
          <div className="explorer__card__value">
            <List className="explorer__card__list" component={Location} items={venues} />
          </div>
        </Row>

        <Row value={source} nohr>
          <div className="explorer__card__label">Source</div>
          <div className="explorer__card__value">{source}</div>
        </Row>
      </div>
    </div>
  );
};
Card.propTypes = {
  result: PropTypes.object.isRequired,
};

export default Card;
