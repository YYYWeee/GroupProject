/** Action Type Constants: */
export const LOAD_ALL_PINS = "pins/LOAD_ALL_PINS";
export const LOAD_ONE_PIN = "pins/LOAD_ONE_PIN";

/**  Action Creators: */
export const loadAllPinsAction = (pins) => ({
  type: LOAD_ALL_PINS,
  pins,
});

export const loadOnePinAction = (pin) => ({
  type: LOAD_ONE_PIN,
  pin,
});

/** Thunk Action Creators: */
export const fetchAllPinsThunk = () => async (dispatch) => {
  const res = await fetch("/api/pins");
  if (res.ok) {
    const { pins } = await res.json();
    dispatch(loadAllPinsAction(pins));
  } else {
    const errors = await res.json();
    console.log(errors);
    return errors;
  }
};

export const fetchOnePinThunk = (pinId) => async (dispatch) => {
  const res = await fetch(`/api/pins/${pinId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadOnePinAction(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

/** Pins Reducer: */
const initialState = { allPins: [], singlePin: {} };

const pinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_PINS:
      const pinsState = {};
      action.pins.forEach((pin) => {
        pinsState[pin.id] = pin;
      });
      return {
        ...state,
        allPins: pinsState,
        singlePin: {},
      };
    case LOAD_ONE_PIN:
      return { ...state, singlePin: { ...action.pin } };
    default:
      return state;
  }
};

export default pinsReducer;
