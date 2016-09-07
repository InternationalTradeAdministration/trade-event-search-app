import React, { PropTypes } from 'react';

const Item = ({ result }) => {
  const {
    title, snippet, cost, url,
    country, state, city, industry,
    event_type: type,
    start_date: startDate, end_date: endDate } = result;
  return (
    <div className="explorer__result-item">
      <div className="explorer__result-item__datetime">
        {startDate} - {endDate}
      </div>
      <div className="explorer__result-item__title">
        {title}
      </div>
      <div className="explorer__result-item__url">
        {url}
      </div>
      <div className="explorer__result-item__snippet">
        {snippet}
      </div>
      <div className="explorer__result-item__cost">
        {cost}
      </div>
      <div className="explorer__result-item__industry">
        {industry}
      </div>
      <div className="explorer__result-item__location">
        {`${city}, ${state}, ${country}`}
      </div>
      <div className="explorer__result-item__type">
        {type}
      </div>
      <a className="explorer__result-item__label" onClick={this.onClick}>{title}</a>
    </div>
  );
};
Item.propTypes = {
  result: PropTypes.object.isRequired,
};

export default Item;
