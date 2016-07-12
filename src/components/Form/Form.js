import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Select from 'react-select';
import countryList from '../../fixtures/countries';
import sourceList from '../../fixtures/sources';
import './Form.scss';

const TextField = ({ description, field, label }) => (
  <div className="explorer__form__group">
    <label htmlFor={field.name}>{label}</label>
    {description ? <p>{description}</p> : null}
    <input type="text" className="explorer__form__input" id={field.name} {...field} />
  </div>
);
TextField.propTypes = {
  description: PropTypes.string,
  field: PropTypes.object.isRequired,
  label: PropTypes.string,
};

const SelectField = ({ description, field, label, options, multi=false }) => (
  <div className="explorer__form__group">
    <label htmlFor={field.name}>{label}</label>
    {description ? <p>{description}</p> : null}
    <div>
      <Select
        {...field}
        options={options}
        multi={multi} autoBlur
        onBlur={() => field.onBlur(field.value)}
      />
    </div>
  </div>
);

const Form = ({
  fields: { q, name, fuzzyName, address, sources, countries },
  handleSubmit,
}) => (
  <form className="explorer__form" onSubmit={handleSubmit}>
    <fieldset>
      <TextField
        field={q} label="Keyword"
        description="Search for words in the name, alternative names (aliases), title of the entity, and additional remarks regarding the entity."
      />
      <TextField
        field={name} label="Name"
        description="Search for an entity’s name or one of its alternative names."
      />
      <SelectField
        field={fuzzyName} label="Fuzzy Name"
        options={[{ label: 'Off', value: '' }, { label: 'On', value: 'true' }]}
        description="When set to off, the spelling of the Name you search for must be correct to get results. When set to on, the spelling for the Name you search for may be slightly off. Check the score for each result to determine how close a match it is to the entity's name or its alternative names. A score of 100 is an exact match. Results are returned with the highest scores first." />

      <TextField
        field={address} label="Address"
        description="Search for the street address, city, province, and postal code of an entity."
      />
      <SelectField
        field={sources} label="Sources" options={sourceList} multi
        description="Choose which of the eleven screening lists that you want to search."
      />
      <SelectField
        field={countries} label="Countries" options={countryList} multi
        description="Choose which countries that you want to search. Note, the Nonproliferation Sanctions and ITAR Debarred lists do not include the country with an entity. If you choose to search for entities by country then you will not be searching these two lists."
      />

      <div className="explorer__form__group">
        <button className="explorer__form__submit pure-button pure-button-primary" onClick={handleSubmit}>
          <i className="fa fa-paper-plane" /> Search
        </button>
      </div>
    </fieldset>
  </form>
);
Form.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default reduxForm({
  form: 'form',
  fields: ['q', 'name', 'fuzzyName', 'address', 'sources', 'countries'],
})(Form);
