import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import middlewares from '../middlewares';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares),
  );

  return store;
};

export default configureStore;
