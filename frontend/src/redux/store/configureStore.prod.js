import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import middlewares from '../middlewares/index';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares),
  );

  return store;
};

export default configureStore;
