import { RESET_FORM } from '../constants';
import startDateRange from '../utils/startDateRange';

export function resetForm() {
  return {
    type: RESET_FORM,
    payload: {
      values: {
        start_date_range: startDateRange,
      },
    },
  };
}
