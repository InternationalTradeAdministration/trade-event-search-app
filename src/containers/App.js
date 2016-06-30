import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'querystring';
import { compact, filter } from 'lodash';
import { Form, ResultList } from '../components';
import styles from './App.scss';
import { fetchResultsIfNeeded } from 'actions';


const App = ({ handleSubmit, results }) => (
  <div className="csl">
    <div className="csl__header">
      <div id="banner" className="csl__header__banner">
      </div>
      <h1 className="csl__header__title">
        Search the Consolidated Screening List
      </h1>
      <h2 className="csl__header__description">
        Search <a href="http://export.gov/ecr/eg_main_023148.asp">eleven screening lists</a> at one time by filling in the search boxes below. If you get too many results, try including more information to the additional fields. If you get too few results, try searching one field at a time.
      </h2>
    </div>

    <div className="csl__form">
      <Form onSubmit={handleSubmit} />
    </div>

    <div className="csl__result-list">
      <p className="csl__result-list__label">
        Complete Consolidated Screening List
      </p>

      <ResultList results={results} />
    </div>
  </div>
);
App.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  results: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    results: state.results,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (form) => {
      const params = compact(filter(form, field => !field));
      dispatch(fetchResultsIfNeeded(stringify(params)));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
