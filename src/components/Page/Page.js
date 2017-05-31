import React from 'react';
import PropTypes from 'prop-types';
import './Page.scss';

const Interval = () => (
  <div className="explorer__page__item explorer__page__item--mist">...</div>
);
function pageGenerator(current, displayed, total) {
  let index = (current - displayed) > 0 ? current - displayed : 1;
  const pages = [];
  if (index > 1) {
    pages.push(
      <div key="first-page" role="button" tabIndex={0} className="explorer__page__item" data-page={1}>1</div>);
    pages.push(<Interval key="first-interval" />);
  }
  while (index > 0 && index <= total && index < current + displayed + 1) {
    const className = index === current ?
            'explorer__page__item disabled' :
            'explorer__page__item';
    pages.push(<div key={index} role="button" tabIndex={0} className={className} data-page={index}>{index++}</div>);
  }
  if (current + displayed < total) {
    pages.push(<Interval key="last-interval" />);
    pages.push(
      <div key="last-page" role="button" tabIndex={0} className="explorer__page__item" data-page={total}>{total}</div>);
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
const Pages = ({ results, displayed = 3, handleClick }) => {
  if (results.isFetching) return null;

  const current = Math.ceil((results.offset ? results.offset : 0) / 10) + 1;
  const total = Math.ceil(results.total / 10);

  const pages = pageGenerator(
    current,
    displayed,
    total);
  return (
    <div className="explorer__page" role="button" tabIndex={0} onClick={handlePaging(handleClick, current)}>
      {pages}
    </div>
  );
};

Pages.propTypes = {
  displayed: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired,
};

export default Pages;
