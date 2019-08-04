import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import produce from 'immer';
import axios from 'axios';
import randomstring from 'randomstring';

/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

// Reducer
const initialState = {
  currentName: '',
  currentAddress: '',
  stops: [],
  toastMessage: '',
  toastConfirm: false,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'CHANGE_CURRENT_NAME':
        draft.currentName = action.name;
        return draft;
      case 'CHANGE_CURRENT_ADDRESS':
        draft.currentAddress = action.address;
        return draft;
      case 'ADD_STOP_TO_ITINERARY':
        draft.stops.push({ id: action.id, name: action.name, address: action.address });
        draft.currentName = '';
        draft.currentAddress = '';
        return draft;
      case 'ADD_TOAST_MESSAGE':
        draft.toastMessage = action.msg;
        draft.toastConfirm = action.confirm;
        return draft;
      case 'REMOVE_TOAST_MESSAGE':
        draft.toastMessage = '';
        draft.toastConfirm = false;
        return draft;
      default:
        return draft;
    }
  });

const baseURL = 'https://dev-api.shipwell.com';

// Actions
export const changeCurrentName = name => ({
  type: 'CHANGE_CURRENT_NAME',
  name,
});

export const changeCurrentAddress = address => ({
  type: 'CHANGE_CURRENT_ADDRESS',
  address,
});

const addStopToItinerary = (name, address, id) => ({
  type: 'ADD_STOP_TO_ITINERARY',
  name,
  address,
  id,
});

const showToast = (msg, confirm) => ({
  type: 'ADD_TOAST_MESSAGE',
  msg,
  confirm,
});

export const hideToast = () => ({
  type: 'REMOVE_TOAST_MESSAGE',
});

// Thunks
export const displayToast = (msg, confirm) => {
  return dispatch => {
    // Show toast and add timer to autohide depending on confirmation or not
    dispatch(showToast(msg, confirm));
    setTimeout(() => dispatch(hideToast()), confirm ? 8000 : 3000);
  };
};

export const attemptSubmitNewStop = (name, address) => {
  return async dispatch => {
    try {
      const {
        data: { geocoded_address, warnings },
      } = await axios.post(`${baseURL}/v2/locations/addresses/validate/`, {
        formatted_address: address,
      });

      // No warnings, add the stop to our list
      if (warnings.length === 0) {
        const stopID = randomstring.generate(6);
        dispatch(displayToast('Success'));
        dispatch(addStopToItinerary(name, address, stopID));
        // If only warning is different address, show confirmation message
      } else if (warnings.length === 1 && warnings[0].startsWith('A different address')) {
        dispatch(displayToast(geocoded_address.formatted_address, true));
        // Otherwise, just show warnings
      } else {
        dispatch(displayToast(warnings));
      }
    } catch (err) {
      console.log(err);
      dispatch(displayToast('Technical Difficulties 😞'));
    }
  };
};

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
export default store;
