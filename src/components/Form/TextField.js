import React from 'react';
import PropTypes from 'prop-types';
import './TextField.scss';

const TextField = ({ input, label = '', placeholder = null }) => (
  <div className="explorer__form__group">
    <div className="explorer__form__label-container">
      <label htmlFor={input.name}>{label}</label>
    </div>
    <div className="explorer__form__input-container">
      <input
        id={input.name}
        type="text"
        className="explorer__form__text"
        placeholder={placeholder}
        {...input}
      />
    </div>
  </div>
);
TextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextField;
