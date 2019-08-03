import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import produce from 'immer';
import axios from 'axios';

// Reducer
const initialState = {
  currentName: '',
  currentAddress: '',
  stops: [],
  toastMessage: '',
};

/* eslint-disable no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'ADD_STOP_TO_ITINERARY':
        draft.stops.push({ name: action.name, address: action.address });
        draft.currentName = '';
        draft.currentAddress = '';
        return draft;
      case 'ADD_TOAST_MESSAGE':
        draft.toastMessage = typeof action.msg === 'string' ? action.msg : action.msg.join(' ');
        return draft;
      case 'REMOVE_TOAST_MESSAGE':
        draft.toastMessage = '';
        return draft;
      default:
        return draft;
    }
  });

const baseURL = 'https://dev-api.shipwell.com';

// Actions
const addStopToItinerary = (name, address) => ({
  type: 'ADD_STOP_TO_ITINERARY',
  name,
  address,
});

const showToast = msg => ({
  type: 'ADD_TOAST_MESSAGE',
  msg,
});

export const hideToast = () => ({
  type: 'REMOVE_TOAST_MESSAGE',
});

// Thunks
const displayToast = msg => {
  return dispatch => {
    dispatch(showToast(msg));
    setTimeout(() => dispatch(hideToast()), 3000);
  };
};

export const attemptSubmitNewStop = (name, address) => {
  return async dispatch => {
    try {
      const {
        data: { warnings },
      } = await axios.post(`${baseURL}/v2/locations/addresses/validate/`, {
        formatted_address: address,
      });

      if (warnings.length === 0) {
        dispatch(displayToast('Success'));
        dispatch(addStopToItinerary(name, address));
      } else {
        dispatch(displayToast(warnings));
      }
    } catch (err) {
      console.log(err);
      dispatch(displayToast('Technical Difficulties 😞'));
    }
  };
};

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
export default store;
