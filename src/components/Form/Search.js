import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import './Search.scss';

const Search = ({ handleSubmit, q = '' }) => (
  <form className="explorer__form__search" onSubmit={handleSubmit}>
    <Field
      component="input" type="text" placeholder="Search for events"
      name="q" value={q} className="explorer__form__search__input"
    />
  </form>
);
Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  q: PropTypes.string,
};

export default reduxForm({
  form: 'search',
})(Search);
