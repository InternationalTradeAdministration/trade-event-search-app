import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { camelCase, isEmpty, map, omitBy, reduce, snakeCase } from '../utils/lodash';
import { Search, Result, Spinner } from '../components';
import { fetchResultsIfNeeded } from '../actions';
import './App.scss';

class App extends Component {
  componentDidMount() {
    const { dispatch, query } = this.props;
  }
  handlePaging = (e) => {
    e.preventDefault();
    if (!e.target.dataset.page) return;

    const { dispatch, query } = this.props;
    const offset = (parseInt(e.target.dataset.page, 10) - 1) * 10;
    const params = Object.assign({}, omitBy(query, isEmpty), { offset });
    dispatch(fetchResultsIfNeeded(params));
    this.push(params);
  }
  render() {
    const { handleSearch, query, results } = this.props;
    return (
      <div className="explorer">
        <div className="explorer__search-container">
          <Search onSubmit={handleSearch} q={'a'} />
        </div>
      </div>
    );
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  results: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const query = ownProps.history.getCurrentLocation().query;
  const { results } = state;
  return {
    query,
    results,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleSearch: ({ q }) => {
      dispatch(fetchResultsIfNeeded({ q }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
