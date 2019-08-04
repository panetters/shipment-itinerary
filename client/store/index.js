import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import produce from 'immer';
import axios from 'axios';
import randomstring from 'randomstring';

/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

// Constants
const CHANGE_CURRENT_NAME = 'CHANGE_CURRENT_NAME';
const CHANGE_CURRENT_ADDRESS = 'CHANGE_CURRENT_ADDRESS';
const UPDATE_STOP_NAME = 'UPDATE_STOP_NAME';
const UPDATE_STOP_ADDRESS = 'UPDATE_STOP_ADDRESS';
const ADD_STOP_TO_ITINERARY = 'ADD_STOP_TO_ITINERARY';
const CHECK_OFF_INTINERARY_STOP = 'CHECK_OFF_ITINERARY_STOP';
const REMOVE_STOP_FROM_ITINERARY = 'REMOVE_STOP_FROM_ITINERARY';
const ADD_TOAST_MESSAGES = 'ADD_TOAST_MESSAGES';
const REMOVE_TOAST_MESSAGES = 'REMOVE_TOAST_MESSAGES';

// Reducer
const initialState = {
  currentName: '',
  currentAddress: '',
  stops: [
    { id: 13, name: 'Michael', address: '123 Main', complete: false },
    { id: 12, name: 'Ted', address: '123 Main', complete: false },
    { id: 12323, name: 'John', address: '123 Main', complete: false },
  ],
  toastMessages: [],
  toastType: '',
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_CURRENT_NAME:
        draft.currentName = action.name;
        return draft;
      case CHANGE_CURRENT_ADDRESS:
        draft.currentAddress = action.address;
        return draft;
      case UPDATE_STOP_NAME:
        draft.stops[action.index] = { ...draft.stops[action.index], name: action.name };
        return draft;
      case UPDATE_STOP_ADDRESS:
        draft.stops[action.index] = { ...draft.stops[action.index], address: action.address };
        return draft;
      case ADD_STOP_TO_ITINERARY:
        draft.stops.push({
          id: action.id,
          name: action.name,
          address: action.address,
          complete: false,
        });
        draft.currentName = '';
        draft.currentAddress = '';
        return draft;
      case CHECK_OFF_INTINERARY_STOP:
        draft.stops[action.index] = { ...draft.stops[action.index], complete: action.checked };
        return draft;
      case REMOVE_STOP_FROM_ITINERARY:
        draft.stops.splice(action.index, 1);
        return draft;
      case ADD_TOAST_MESSAGES:
        draft.toastMessages = action.msg;
        draft.toastType = action.toastType;
        return draft;
      case REMOVE_TOAST_MESSAGES:
        draft.toastMessages = [];
        draft.toastType = '';
        return draft;
      default:
        return draft;
    }
  });

const baseURL = 'https://dev-api.shipwell.com';

// Actions
export const changeCurrentName = name => ({
  type: CHANGE_CURRENT_NAME,
  name,
});

export const changeCurrentAddress = address => ({
  type: CHANGE_CURRENT_ADDRESS,
  address,
});

export const updateStopName = (name, index) => ({
  type: UPDATE_STOP_NAME,
  name,
  index,
});

export const updateStopAddress = (address, index) => ({
  type: UPDATE_STOP_ADDRESS,
  address,
  index,
});

const addStopToItinerary = (name, address, id) => ({
  type: ADD_STOP_TO_ITINERARY,
  name,
  address,
  id,
});

export const checkOffItinteraryStop = (checked, index) => ({
  type: CHECK_OFF_INTINERARY_STOP,
  checked,
  index,
});

export const removeStopFromItinerary = index => ({
  type: REMOVE_STOP_FROM_ITINERARY,
  index,
});

const showToast = (msg, toastType) => ({
  type: ADD_TOAST_MESSAGES,
  msg,
  toastType,
});

export const hideToast = () => ({
  type: REMOVE_TOAST_MESSAGES,
});

// Thunks
export const displayToast = (msg, type) => {
  return dispatch => {
    // Show toast and add timer to autohide depending on confirmation or not
    dispatch(showToast(msg, type));
    setTimeout(() => dispatch(hideToast()), type === 'confirm' ? 8000 : 3000);
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
        dispatch(addStopToItinerary(name, address, stopID));
        // If only warning is different address, show confirmation message
      } else if (warnings.length === 1 && warnings[0].startsWith('A different address')) {
        dispatch(displayToast([geocoded_address.formatted_address], 'confirm'));
        // Otherwise, just show warnings
      } else {
        dispatch(displayToast(warnings, 'error'));
      }
    } catch (err) {
      console.log(err);
      dispatch(displayToast(['Technical Difficulties 😞'], 'error'));
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
