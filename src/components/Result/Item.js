import React, { PropTypes } from 'react';
import moment from 'moment';
import Cost from './Cost';
import Hashtag from './Hashtag';
import './Item.scss';

const dateFormat = (date) => moment(date, 'YYYY-MM-DD').format('ddd, MMM DD, YYYY').toUpperCase();
const datePeriod = (startDate, endDate) => {
  if (startDate === endDate) {
    return dateFormat(startDate);
  }
  return `${dateFormat(startDate)} - ${dateFormat(endDate)}`;
};
const Item = ({ result }) => {
  const {
    name, description, cost, url,
    venues, industries,
    event_type: type, hosted_url: hostedURL,
    start_date: startDate, end_date: endDate } = result;
  return (
    <div className="explorer__result-item">
      <div className="explorer__result-item__name">
        {name}
      </div>
      <div className="explorer__result-item__description">
        {description}
      </div>
      <div className="explorer__result-item__datetime">
        Date: {datePeriod(startDate, endDate)}
      </div>
      <div className="explorer__result-item__location">
        Date: {datePeriod(startDate, endDate)}
      </div>
      <a href={hostedURL} className="explorer__result-item__body">
        <div className="explorer__result-item__url">
          {url}
        </div>
      </a>
      <div className="explorer__result-item__footer">
        <div className="explorer__result-item__cost">
          <Cost cost={cost} />
        </div>
        <div className="explorer__result-item__hashtags">
          <ul>
            <li><Hashtag items={industries} /></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
Item.propTypes = {
  result: PropTypes.object.isRequired,
};

export default Item;
