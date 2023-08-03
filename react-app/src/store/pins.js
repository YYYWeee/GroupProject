/** Action Type Constants: */
export const LOAD_ALL_PINS = "pins/LOAD_ALL_PINS";
export const LOAD_ONE_PIN = "pins/LOAD_ONE_PIN";
export const ADD_PIN = "pins/ADD_PIN";
export const UPDATE_PIN = "pin/update";
export const DELETE_PIN = "pin/delete";

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

export const deletePin = (pinId) => ({
  type: DELETE_PIN,
  pinId,
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

export const updatePinThunk = (updatePin, id) => async (dispatch) => {
  // console.log('in thunk',updatePin)
  // console.log('in thunk',id)

  const response = await fetch(`/api/pins/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatePin),
    // body: JSON.stringify({
    //   title: updatePin.title,
    //   description: updatePin.description,
    //   link: updatePin.link,
    //   alt_text: updatePin.altText,
    //   note_to_self:updatePin.note,
    //   allow_comment:updatePin.allow_comment
    // }),
  });
  let updatedPin = await response.json();
  console.log("updated Pin", updatedPin);
  dispatch(loadOnePinAction(updatedPin)); //now
  return updatedPin;
};

export const deletePinThunk = (pinId) => async (dispatch) => {
  const response = await fetch(`/api/pins/${pinId}`, {
    method: "delete",
  });
  if (response.ok) {
    const { id: deletedPinId } = await response.json();
    dispatch(deletePin(pinId));
    return deletedPinId;
  }
};

/** Pins Reducer: */
const initialState = { allPins: {}, singlePin: {} };

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

    case DELETE_PIN:
      console.log("in the reducer", action);
      console.log("in the reducer", action.pinId);
      const newState = { ...state };
      delete newState[action.pinId];
      return newState;
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
