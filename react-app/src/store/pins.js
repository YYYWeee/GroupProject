



const ADD_PIN = 'pins/ADD_PIN';

//action creator

export const addPin = (pin) => {
  return {
      type: ADD_PIN,
      pin,
  }
}



// Thunk
export const createNewPinThunk = (pin) => async (dispatch) => {
  const response = await fetch(`/pin-builder`, {
    method: "POST",
    body: pin
  });
  console.log("RESPONSE FROM SERVER", response)

  if (response.ok) {
    const { newPin } = await response.json();
    console.log("NEW PIN DATA", newPin);
    dispatch(addPin(newPin));
  } else {
    console.log("There was an error making your pin!")
  }

}


//Reducer
const initialState = { allPins: [], pin: {} };
const pinReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_PIN:
      newState = { ...state };
      newState.allPins[action.pin.id] = action.pin;
      return newState;

    default:
      return state;

  }
}


export default pinReducer;
