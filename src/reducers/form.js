import { reducer as form } from 'redux-form';
import { RESET_FORM } from '../constants';

export default form.plugin({
  form: (state, action) => {
    switch (action.type) {
    case RESET_FORM:
      return action.payload;
    default:
      return state;
    }
  },
});
