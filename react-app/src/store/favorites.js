/** Action Type Constants: */
export const LOAD_FAVORITES = "favorites/LOAD_FAVORITES";

export const DELETE_FAVORITE = "favorites/DELETE_FAVORITE";

/**  Action Creators: */
const loadFavorites = (favorites) => ({
  type: LOAD_FAVORITES,
  favorites,
});

const deleteFavorite = (pinId) => ({
  type: DELETE_FAVORITE,
  pinId,
});

/** Thunk Action Creators: */
export const fetchAllFavoritesThunk = (boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}/favorite`);

  if (res.ok) {
    const fav_pins = await res.json();
    console.log("inside get all fav thunk");
    dispatch(loadFavorites(fav_pins));
    return fav_pins;
  } else {
    const errors = await res.json();
    console.log(errors);
    return errors;
  }
};

export const fetchDeleteFavThunk = (boardId, pinId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/favorites/${boardId}/${pinId}`, {
      method: "DELETE",
    });
    console.log("del fav thunk went to backend");
    if (res.ok) {
      const pinId = await res.json();
      dispatch(deleteFavorite(pinId));
    }
  } catch (err) {
    console.log("There was something wrong with unfavoriting this pin", err);
  }
};

/** Favorites Reducer */
const initialState = {};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FAVORITES: {
      const newState = {};
      action.favorites.forEach((fav) => {
        newState[fav.id] = fav;
      });
      return newState;
    }
    case DELETE_FAVORITE: {
      const newState = {...state};
      delete newState[action.pinId];
      return newState;
    }
    default:
      return state;
  }
};
export default favoritesReducer;
