import React, { Component } from 'react';
import './Focusable.scss';

const Focusable = (ComposedComponent) => class extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
  }
  handleBlur = () => {
    this.setState({ focused: false });
  }
  handleFocus = () => {
    this.setState({ focused: true });
  }
  render() {
    const { focused } = this.state;
    return (
      <div
        className="explorer__focusable" tabIndex="-1"
        onBlur={this.handleBlur} onFocus={this.handleFocus}
      >
        <ComposedComponent {...(this.props)} focused={focused} />
      </div>
    );
  }
};

export default Focusable;
