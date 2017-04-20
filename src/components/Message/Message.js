import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import './Message.scss';

const Message = ({ results }) => {
  let style = {};
  if (results.total > 0) {
    style = { padding: '7px 4px' };
  }

  let html = `${results.total} results found.`;
  if (results.isFetching) {
    html = <Spinner active />;
  } else if (results.total === 0) {
    html = 'Your search did not match any events.';
  }
  return (
    <div className="explorer__message" style={style}>
      {html}
    </div>
  );
};
Message.propTypes = {
  results: PropTypes.object.isRequired,
};

export default Message;
