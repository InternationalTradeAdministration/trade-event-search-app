import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
const styles = { fontSize: 12 };

const TextField = ({ description, field, label }) => (
  <div className="form-group">
    <label htmlFor={field.name}>{label}</label>
    {description ? <p>{description}</p> : null}
    <div className={styles.inputGroup}>
      <input type="text" className="form-control" id={field.name} {...field} />
    </div>
  </div>
);
TextField.propTypes = {
  description: PropTypes.string,
  field: PropTypes.object.isRequired,
  label: PropTypes.string,
  styles: PropTypes.object,
};

const Form = ({
  fields: { keyword, name, fuzzyName, address, sources, countries },
  handleSubmit,
}) => (
  <form className="csl__form pure-form" onSubmit={handleSubmit}>
    <fieldset>
      <TextField
         styles={styles} field={keyword} label="keyword"
         description="Search for words in the name, alternative names (aliases), title of the entity, and additional remarks regarding the entity."
         />
      <TextField
         styles={styles} field={name} label="Name"
         description="Search for an entity’s name or one of its alternative names."
         />

      <div className="form-group">
        <label htmlFor="fuzzyName">Fuzzy Name</label>
        <p>When set to off, the spelling of the Name you search for must be correct to get results. When set to on, the spelling for the Name you search for may be slightly off. Check the score for each result to determine how close a match it is to the entity's name or its alternative names. A score of 100 is an exact match. Results are returned with the highest scores first.</p>
        <div>
          <select id="fuzzyName" {...fuzzyName}>
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
        </div>
      </div>

      <TextField
         styles={styles} field={address} label="Address"
         description="Search for the street address, city, province, and postal code of an entity."
         />
      <TextField
         styles={styles} field={sources} label="Sources"
         description="Choose which of the eleven screening lists that you want to search."
         />
      <TextField
         styles={styles} field={countries} label="Countries"
         description="Choose which countries that you want to search. Note, the Nonproliferation Sanctions and ITAR Debarred lists do not include the country with an entity. If you choose to search for entities by country then you will not be searching these two lists."
         />

      <div className="form-group">
        <button className="csl__form__submit pure-button pure-button-primary" onClick={handleSubmit}>
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
  fields: ['keyword', 'name', 'fuzzyName', 'address', 'sources', 'countries'],
})(Form);
