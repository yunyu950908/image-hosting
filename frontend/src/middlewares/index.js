import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import history from '../history';

const RouterMiddleware = routerMiddleware(history);

const middlewares = [
  logger,
  thunk,
  RouterMiddleware,
];

export default middlewares;
