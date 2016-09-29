import React, { PropTypes } from 'react';
import Select from 'react-select';

const SelectField = ({
  hidden = false, input, isLoading, label = 'Untitled', name, options, multi = false,
}) => {
  if (hidden) return null;
  return (
    <div className="explorer__form__group">
      <div className="explorer__form__label-container">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="explorer__form__input-container">
        <Select
          {...input}
          isLoading={isLoading}
          options={options}
          multi={multi} autoBlur
          onBlur={() => input.onBlur(input.value)}
          simpleValue
          value={input.value}
        />
      </div>
    </div>
  );
};
SelectField.propTypes = {
  hidden: PropTypes.bool,
  input: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  multi: PropTypes.bool,
};

export default SelectField;
