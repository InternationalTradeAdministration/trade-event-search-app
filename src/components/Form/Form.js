import assign from 'object-assign';
import { omit, trim } from 'lodash';
import qs from 'qs';
import moment from 'moment';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reset, reduxForm, Field, getFormValues, formValueSelector } from 'redux-form';
import { fetchAggregationsIfNeeded, fetchResultsIfNeeded } from '../../actions';
import DateRangeField from './DateRangeField';
import SelectField from './SelectField';
import TextField from './TextField';
import './Form.scss';

const Form = ({
  aggregations,
  handleAggregationChange, handleReset, handleSubmit,
  hidden, reset, submitting,
}) => (
  <div className="explorer__form-container">
    <form className="explorer__form" onSubmit={handleSubmit}>
      <fieldset>
        <Field
          component={SelectField} options={aggregations.countries}
          name="countries" label="Country" isLoading={aggregations.isFetching}
          handleChange={handleAggregationChange}
        />
        <Field
          component={SelectField} options={aggregations.states} hidden={hidden.state}
          name="states" label="State" isLoading={aggregations.isFetching}
          handleChange={handleAggregationChange}
        />
        <Field
          component={SelectField} options={aggregations.industries}
          name="industries" label="Industry" isLoading={aggregations.isFetching}
          handleChange={handleAggregationChange}
        />
        <Field
          component={SelectField} options={aggregations.eventTypes}
          name="event_types" label="Event Type" isLoading={aggregations.isFetching}
          handleChange={handleAggregationChange}
        />
        <Field component={TextField} name="q" label="Keyword" placeholder="Search with keyword" />
        <DateRangeField label={{ from: 'Start Date From', to: 'To' }} name="start_date_range" />
        <div className="explorer__form__group">
          <div className="explorer__form__label-container" />
          <div className="explorer__form__input-container">
            <input
              type="submit"
              className="explorer__form__btn explorer__form__btn--submit"
              disabled={submitting}
              value="Search"
            />
            <input
              type="reset"
              className="explorer__form__btn explorer__form__btn--reset"
              value="Reset"
              onClick={() => { handleReset() && reset(); }}
            />
          </div>
        </div>
      </fieldset>
    </form>
  </div>
);
Form.propTypes = {
  aggregations: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hidden: PropTypes.object,
};

const processQuerystring = querystring => qs.parse(trim(querystring, '?'));
const selector = formValueSelector('form');
function mapStateToProps(state) {
  const { aggregations, routing } = state;
  return {
    aggregations: { ...aggregations.items, isFetching: aggregations.isFetching },
    values: getFormValues(state),
    hidden: {
      state: selector(state, 'countries') !== 'United States',
    },
    initialValues: assign(
      { start_date_range: {
        from: moment().format('YYYY-MM-01'),
        to: moment().clone()
          .add(2, 'year')
          .endOf('month')
          .format('YYYY-MM-DD'),
      } },
      processQuerystring(routing.locationBeforeTransitions.search),
    ),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (params) => {
      dispatch(fetchResultsIfNeeded(omit(params, 'offset')));
    },
    handleAggregationChange: ({ name, value }) => {
      dispatch(fetchAggregationsIfNeeded({ [name]: value }));
    },
    handleReset: () => {
      dispatch(fetchAggregationsIfNeeded({ countries: '', industries: '', event_types: '' }));
      return true;
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'form',
})(Form));
