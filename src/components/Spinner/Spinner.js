import React, { PropTypes } from 'react';
import Spinkit from 'react-spinkit';
import './Spinner.scss';

const Spinner = (props) => {
  if (!props.active) return null;
  return (
    <div className="explorer__spinner">
      <Spinkit {...props} />
    </div>
  );
};

Spinner.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default Spinner;
