import assign from 'object-assign';
import { REQUEST_RESULTS, RECEIVE_RESULTS, RECEIVE_FAILURE } from 'constants';

export default (state = {
  isFetching: false,
  items: [],
  invalidated: false,
  offset: 0,
  total: 0,
}, action) => {
  switch (action.type) {
  case REQUEST_RESULTS:
    return assign({}, state, {
      isFetching: true,
      invalidated: false,
    });
  case RECEIVE_RESULTS:
    return assign({}, state, {
      isFetching: false,
      invalidated: false,
      items: action.payload.results,
      offset: action.payload.metadata.offset,
      total: action.payload.metadata.total,
    });
  case RECEIVE_FAILURE:
    return assign({}, state, {
      isFetching: false,
      invalidated: false,
      error: action.error,
    });
  default:
    return state;
  }
};
