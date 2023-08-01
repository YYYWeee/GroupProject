/** Action Type Constants: */
export const LOAD_ALL_PINS = "pins/LOAD_ALL_PINS";
export const LOAD_ONE_PIN = "pins/LOAD_ONE_PIN";
export const ADD_PIN = "pins/ADD_PIN";

/**  Action Creators: */
export const loadAllPinsAction = (pins) => ({
  type: LOAD_ALL_PINS,
  pins,
});

export const loadOnePinAction = (pin) => ({
  type: LOAD_ONE_PIN,
  pin,
});

export const addPin = (pin) => {
  return {
    type: ADD_PIN,
    pin,
  };
};

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

export const createNewPinThunk = (pin) => async (dispatch) => {
  const response = await fetch(`/api/pins`, {
    method: "POST",
    body: pin,
  });
  console.log("RESPONSE FROM SERVER", response);

  if (response.ok) {
    const { newPin } = await response.json();
    console.log("NEW PIN DATA", newPin);
    // dispatch(addPin(newPin));
    dispatch(loadOnePinAction(newPin));
  } else {
    console.log("There was an error making your pin!");
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
    // case ADD_PIN:
    //   const newState = { ...state };
    //   newState.allPins[action.pin.id] = action.pin;
    //   newState.singlePin = action.pin;
    //   return newState;

    default:
      return state;
  }
};

export default pinsReducer;

//Reducer
// const initialState = { allPins: [], pin: {} };
// const pinReducer = (state = initialState, action) => {
//   let newState;
//   switch (action.type) {
//     case ADD_PIN:
//       newState = { ...state };
//       newState.allPins[action.pin.id] = action.pin;
//       return newState;

//     default:
//       return state;

//   }
// }
