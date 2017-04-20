import assign from 'object-assign';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scroller, Element } from 'react-scroll';
import { fetchResultsIfNeeded } from '../actions';
import { Form, Message, Page, Result } from '../components';
import './Search.scss';

class Search extends Component {
  componentDidMount() {
    this.props.onDidMount();
  }

  componentDidUpdate() {
    scroller.scrollTo('anchor', { duration: 400, smooth: true });
  }

  render() {
    const { onPaging, results } = this.props;
    // set minHeight to 48px to allow Event Type dropdown options
    // to be fully visible when no result.
    const customStyle = (results.isFetching || results.items.length < 1) ?
          { visibility: 'hidden', minHeight: 48 } : {};
    return (
      <div className="explorer__search-container">
        <div className="explorer__search">
          <div className="explorer__search__header-container">
            <header>Trade Events Search</header>
          </div>
          <div className="explorer__search__form-container">
            <Form />
          </div>
          <Element name="anchor" className="explorer__search__message-container">
            <Message results={results} />
          </Element>
          <div className="explorer__search__body-container" style={customStyle}>
            <div className="explorer__search__result-container">
              <Result results={results} />
            </div>
            <div className="explorer__search__page-container">
              <Page results={results} handleClick={onPaging} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Search.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  onPaging: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { results } = state;
  return {
    results,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { location } = ownProps;
  return {
    onDidMount: () => {
      dispatch(fetchResultsIfNeeded(location.query, { push: false }));
    },
    onPaging: (page) => {
      const offset = (page - 1) * 10;
      dispatch(fetchResultsIfNeeded(assign(location.query, { offset })));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
