import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import session from "./session";
import pinsReducer from "./pins";
import commentsReducer from "./comments";
import boardsReducer from "./boards";
import favoritesReducer from "./favorites";

const rootReducer = combineReducers({
  session,
  pins: pinsReducer,
  comments: commentsReducer,
  boards: boardsReducer,
  favorites: favoritesReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
