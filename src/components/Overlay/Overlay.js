import React, { PropTypes } from 'react';
import './Overlay.scss';

const Overlay = ({ active, children }) => {
  if (!active) return null;
  return (
    <div className="explorer__overlay">
      {children}
    </div>
  );
};
Overlay.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.object,
};

export default Overlay;
