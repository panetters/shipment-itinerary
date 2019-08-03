import { createStore } from 'redux';
import produce from 'immer';

// Reducer
const initialState = {
  stops: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'ADD_STOP_TO_ITINERARY':
        draft.stops.push(action.stop);
        return draft;
      default:
        return draft;
    }
  });

// Actions
export const addStopToItinerary = stop => ({
  type: 'ADD_STOP_TO_ITINERARY',
  stop,
});

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export default store;
