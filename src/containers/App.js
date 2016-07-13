import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEmpty, map, omitBy, reduce, snakeCase } from 'lodash';
import { stringify } from 'querystring';
import { hashHistory as history } from 'react-router';
import { Form, Result, Spinner } from '../components';
import './App.scss';
import { fetchResultsIfNeeded } from '../actions';

function push(params) {
  history.push(`?${stringify(params)}`);
}

class App extends Component {
  componentDidMount() {
    const { dispatch, query } = this.props;
    dispatch(fetchResultsIfNeeded(query));
  }
  handlePaging = (e) => {
    e.preventDefault();
    if (!e.target.dataset.page) return;

    const { dispatch, query } = this.props;
    const offset = (parseInt(e.target.dataset.page, 10) - 1) * 10;
    const params = Object.assign({}, omitBy(query, isEmpty), { offset });
    dispatch(fetchResultsIfNeeded(params));
    push(params);
  }
  render() {
    const { handleSubmit, query, results } = this.props;
    return (
      <div className="explorer">
        <h1 className="Header-1"><b>Search the Consolidated Screening List</b></h1>
        <p className="DefaultParagraph-1">Search <a href="http://export.gov/ecr/eg_main_023148.asp">eleven screening lists</a> at one time by filling in the search boxes below.  If you get too many results, try including more information to the additional fields.  If you get too few results, try searching one field at a time.</p>

        <div className="explorer__content">
          <Form onSubmit={handleSubmit} initialValues={query} />
          <Spinner spinnerName="circle" noFadeIn active={results.isFetching} />
          <Result results={results} onPaging={this.handlePaging} query={query} />
        </div>
      </div>
    );
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  results: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const { results } = state;
  return {
    query: ownProps.location.query,
    results,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleSubmit: (form) => {
      const params = reduce(omitBy(form, isEmpty), (result, value, _key) => {
        const key = snakeCase(_key);
        return Object.assign(
          result, { [key]: Array.isArray(value) ? map(value, 'value').join(',') : value });
      }, {});
      dispatch(fetchResultsIfNeeded(params));
      push(params);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
