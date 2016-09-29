import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import Calendar from 'rc-calendar/lib/MonthCalendar';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';
import 'rc-calendar/assets/index.css';
import './DateRangeField.scss';

const format = 'MMMM YYYY';
const calendar = (<Calendar />);
const now = moment();
const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const formatter = {
  from: (value) => value.format('YYYY-MM-01'),
  to: (value) => value.endOf('month').format('YYYY-MM-DD'),
};
function handleDateChange(onChange, field) {
  return (value) => {
    onChange(formatter[field](value));
  };
}
const datePickerInput = (onChange) => {
  const onClear = (e) => {
    e.stopPropagation();
    onChange('');
  };

  return ({ value }) => ( // eslint-disable-line
    <div style={{ position: 'relative' }}>
      <input className="explorer__form__text" readOnly value={value && value.format(format)} placeholder="Select a month" />
      <span onClick={onClear} className="explorer__form__text__clear" dangerouslySetInnerHTML={{ __html: '&times;' }} />
    </div>
  );
};
datePickerInput.propTypes = { value: PropTypes.object.isRequired };
const MonthField = ({ field, input }) => (
  <DatePicker
    calendar={calendar}
    name={input.name}
    onChange={handleDateChange(input.onChange, field)}
    value={input.value ? moment(input.value, 'YYYY-MM-DD') : ''}
  >{datePickerInput(input.onChange)}</DatePicker>
);
MonthField.propTypes = {
  field: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
};
const DateRangeField = ({ label, name }) => (
  <div className="explorer__form__group">
    <div className="explorer__form__label-container">
      <label htmlFor={name.from}>{label.from}</label>
    </div>
    <div className="explorer__form__input-container explorer__form__daterange">
      <div className="explorer__form__daterange__from">
        <Field component={MonthField} field="from" name={`${name}[from]`} />
      </div>
      <div className="explorer__form__daterange__label__to">
        <label htmlFor={name.to}>{label.to}</label>
      </div>
      <div className="explorer__form__daterange__to">
        <Field component={MonthField} field="to" name={`${name}[to]`} />
      </div>
    </div>
  </div>
);
DateRangeField.propTypes = {
  label: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default DateRangeField;
