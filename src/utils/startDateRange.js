import moment from 'moment';

export default {
  from: moment().format('YYYY-MM-01'),
  to: moment().clone()
    .add(2, 'year')
    .endOf('month')
    .format('YYYY-MM-DD'),
};
