import React, { PropTypes } from 'react';
import './TextField.scss';

const TextField = ({ input, label, name, placeholder }) => (
  <div className="explorer__form__group">
    <div className="explorer__form__label-container">
      <label htmlFor={name}>{label}</label>
    </div>
    <div className="explorer__form__input-container">
      <input type="text" className="explorer__form__text" id={name} placeholder={placeholder} {...input} />
    </div>
  </div>
);
TextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default TextField;
