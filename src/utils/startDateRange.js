import moment from 'moment';

export default {
  from: moment().format('YYYY-MM-01'),
  to: moment().clone()
    .add(1, 'year')
    .format('YYYY-MM-01'),
};
