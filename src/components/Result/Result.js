import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { connect } from 'react-redux';
import Item from './SimpleCard';
import { resetForm, fetchAggregationsIfNeeded } from '../../actions';
import './Result.scss';

class Result extends Component {

  componentDidMount() {
    if (this.props.results.total === 0) {
      this.props.handleReset();
    }
  }

  componentDidUpdate() {
    if (this.props.results.isFetching) return null;
  }

  render() {
    const items = map(this.props.results.items, result => (
      <Item key={result.id} result={result} />
    ));

    return (
      <div className="explorer__result">
        {items}
      </div>
    );
  }

}
Result.propTypes = {
  results: PropTypes.object.isRequired,
  handleReset: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    handleReset: () => {
      dispatch(resetForm());
      dispatch(fetchAggregationsIfNeeded());
    },
  };
}

export default connect(null, mapDispatchToProps)(Result);
