import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Calendar from 'rc-calendar/lib/Calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';
import 'rc-calendar/assets/index.css';
import './DateRangeField.scss';

const format = 'MMMM DD, YYYY';
const calendar = (<Calendar />);
const now = moment();
const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

function handleDateChange(onChange) {
  return (value) => {
    onChange(value.format('YYYY-MM-DD'));
  };
}
const datePickerInput = () => ({ value }) => ( // eslint-disable-line
  <div style={{ position: 'relative' }}>
    <input
      className="explorer__form__text"
      readOnly
      value={value && value.format(format)}
      placeholder="Select a date"
    />
  </div>
  );
datePickerInput.propTypes = { value: PropTypes.object.isRequired };
const DateField = ({ input }) => (
  <DatePicker
    calendar={calendar}
    name={input.name}
    onChange={handleDateChange(input.onChange)}
    value={input.value ? moment(input.value, 'YYYY-MM-DD') : ''}
  >{datePickerInput()}</DatePicker>
);
DateField.propTypes = {
  input: PropTypes.object.isRequired,
};
const DateRangeField = ({ label, name }) => (
  <div className="explorer__form__group">
    <div className="explorer__form__label-container">
      <label htmlFor={name.from}>{label.from}</label>
    </div>
    <div className="explorer__form__input-container explorer__form__daterange">
      <div className="explorer__form__daterange__from">
        <Field component={DateField} field="from" name={`${name}[from]`} />
      </div>
      <div className="explorer__form__daterange__label__to">
        <label htmlFor={name.to}>{label.to}</label>
      </div>
      <div className="explorer__form__daterange__to">
        <Field component={DateField} field="to" name={`${name}[to]`} />
      </div>
    </div>
  </div>
);
DateRangeField.propTypes = {
  label: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default DateRangeField;
