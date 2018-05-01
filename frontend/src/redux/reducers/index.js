import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { uploadState } from './upload_reducer';

export default combineReducers({
  uploadState,
  router: routerReducer,
});
