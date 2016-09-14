import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isEmpty, omitBy } from '../utils/lodash';
import { Search, Result, Spinner, Overlay } from '../components';
import { fetchResultsIfNeeded } from '../actions';
import './App.scss';

class App extends Component {
  componentDidMount() {
    const { handleDidMount, query } = this.props;
    handleDidMount(query);
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
      <div className="explorer-container">
        <div className="explorer">
          <div className="explorer__search-container">
            <Search onSubmit={handleSearch} q={'a'} />
          </div>
          <div className="explorer__result-container">
            <Result results={results} query={query} />
            <Overlay active={results.isFetching}>
              <div className="explorer__spinner-container">
                <Spinner active />
              </div>
            </Overlay>
          </div>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleDidMount: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
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

function mapDispatchToProps(dispatch, ownProps) {
  const { history } = ownProps;
  return {
    dispatch,
    handleDidMount: ({ q }) => {
      dispatch(fetchResultsIfNeeded({ q }));
    },
    handleSearch: ({ q }) => {
      dispatch(fetchResultsIfNeeded({ q }));
      history.push(`?q=${q}`);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
