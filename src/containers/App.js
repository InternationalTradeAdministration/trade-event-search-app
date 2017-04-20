import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAggregationsIfNeeded } from '../actions';
import './App.scss';

class App extends Component {
  componentDidMount() {
    const { handleDidMount } = this.props;
    handleDidMount();
  }
  render() {
    const { children } = this.props;
    return (
      <div className="explorer-container">
        <div className="explorer">
          {children}
        </div>
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired,
  handleDidMount: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, ownProps) {
  const { location: { query } } = ownProps;
  return {
    handleDidMount: () => {
      dispatch(fetchAggregationsIfNeeded(query));
    },
  };
}

export default connect(undefined, mapDispatchToProps)(App);
