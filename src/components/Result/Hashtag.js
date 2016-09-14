import { map } from 'lodash';
import React, { PropTypes } from 'react';
import './Hashtag.scss';

const Hashtag = ({ items }) => {
  const hashtags = map(items, (item, index) => (
    <a key={index} className="explorer__result-hashtag__link" href="">{item}</a>
  ));
  return (
    <div className="explorer__result-hashtag">
      {hashtags}
    </div>
  );
};
Hashtag.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Hashtag;
