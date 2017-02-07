import React, { PropTypes } from 'react';
import Select from 'react-select';

const onChangeFn = (fn, input) => (value) => {
  fn({ value, name: input.name });
  input.onChange(value);
};

const SelectField = ({
  handleChange, hidden = false, input, isLoading, label = 'Untitled', options, multi = false,
}) => {
  if (hidden) return null;
  return (
    <div className="explorer__form__group">
      <div className="explorer__form__label-container">
        <label>{label}</label>
      </div>
      <div className="explorer__form__input-container">
        <Select
          {...input}
          isLoading={isLoading}
          disabled={isLoading}
          options={options}
          multi={multi} autoBlur
          onBlur={() => input.onBlur(input.value)}
          onChange={onChangeFn(handleChange, input)}
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
  options: PropTypes.array,
  multi: PropTypes.bool,
};

export default SelectField;
