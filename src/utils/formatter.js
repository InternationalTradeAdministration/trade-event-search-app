import moment from 'moment';
import numeral from 'numeral';

export const dateFormat = date => (
  moment(date, 'YYYY-MM-DD').format('ddd, MMM DD, YYYY').toUpperCase()
);
export const dateFormatter = (startDate, endDate) => {
  if (startDate === endDate) {
    return dateFormat(startDate);
  }
  return `${dateFormat(startDate)} - ${dateFormat(endDate)}`;
};

export const costFormatter = (cost, currency = '$') => {
  if ((typeof cost) === 'undefined' || cost === null) {
    return 'n/a';
  } else if (cost === 0) {
    return 'Free';
  }
  return `${currency}${numeral(cost).format('0,0[.]00')}`;
};
