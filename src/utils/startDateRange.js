import moment from 'moment';

export default {
  from: moment().format('YYYY-MM-01'),
  to: moment().clone()
    .add(3, 'month')
    .format('YYYY-MM-01'),
};
