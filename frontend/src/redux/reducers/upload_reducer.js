import { UPLOAD_FAILED, UPLOAD_SUCCESS } from '../constants/index';

const initialState = {
  success: [],
  failed: [],
};

const initialAction = {
  type: '',
  payload: {
    name: '',
    url: '',
  },
};

const jsonCP = state => JSON.parse(JSON.stringify(state));

export const uploadState = (state = initialState, action = initialAction) => {
  const nextState = jsonCP(state);
  switch (action.type) {
    case UPLOAD_SUCCESS:
      nextState.success.push(action.payload);
      return nextState;
    case UPLOAD_FAILED:
      nextState.failed.push(action.payload.name);
      return nextState;
    default:
      return state;
  }
};

export default uploadState;
