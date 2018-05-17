import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { uploadState } from './upload_reducer';
import { userState } from './user_reducer';
import { validateState } from './validate_reducer';

export default combineReducers({
  uploadState,
  userState,
  router: routerReducer,
  validateState,
});
