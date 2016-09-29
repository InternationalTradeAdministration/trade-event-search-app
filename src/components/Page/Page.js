import React, { PropTypes } from 'react';
import './Page.scss';

const Interval = () => (
  <div className="explorer__page__item explorer__page__item--mist">...</div>
);
function pageGenerator(current, displayed, total) {
  let index = (current - displayed) > 0 ? current - displayed : 1;
  const pages = [];
  if (index > 1) {
    pages.push(
      <div key="first-page" className="explorer__page__item" data-page={1}>1</div>);
    pages.push(<Interval key="first-interval" />);
  }
  while (index > 0 && index <= total && index < current + displayed + 1) {
    const className = index === current ?
            'explorer__page__item disabled' :
            'explorer__page__item';
    pages.push(<div key={index} className={className} data-page={index}>{index++}</div>);
  }
  if (current + displayed < total) {
    pages.push(<Interval key="last-interval" />);
    pages.push(
      <div key="last-page" className="explorer__page__item" data-page={total}>{total}</div>);
  }
  return pages;
}

const handlePaging = (handler, current) => (
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.target.dataset.page || e.target.dataset.page === `${current}`) return false;
    return handler(e.target.dataset.page);
  }
);
const Pages = ({ current, displayed = 3, total, handleClick }) => {
  const pages = pageGenerator(
    current,
    displayed,
    total);
  return (
    <div className="explorer__page" onClick={handlePaging(handleClick, current)}>
      {pages}
    </div>
  );
};

Pages.propTypes = {
  count: PropTypes.number,
  current: PropTypes.number,
  displayed: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

export default Pages;
