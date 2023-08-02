/** Action Type Constants: */
export const LOAD_FAVORITES = "favorites/LOAD_FAVORITES";

/**  Action Creators: */
const loadFavorites = (favorites) => ({
  type: LOAD_FAVORITES,
  favorites,
});

/** Favorites Reducer */
const initialState = {};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default favoritesReducer;
