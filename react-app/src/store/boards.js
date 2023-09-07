/** Action Type Constants: */
const LOAD_ALL_BOARDS = "boards/LOAD_ALL_BOARDS";

const LOAD_ONE_BOARD = "boards/LOAD_ONE_BOARD";

const RECEIVE_BOARD = "board/RECEIVE_BOARD";

const EDIT_BOARD = "board/EDIT_BOARD";

const ADD_BOARD_COLLABORATOR = "board/ADD_BOARD_COLLABORATOR";

const DELETE_BOARD = "boards/DELETE_BOARD";

const ADD_PINFAVORITE = "boards/ADD_PINFAVORITE";
const DELETE_PINFAVORITE = "boards/DELETE_PINFAVORITE";
const REMOVE_PINBOARD = "boards/REMOVE_PINBOARD";

/**  Action Creators: */
const addFavorite = (payload) => ({
  type: ADD_PINFAVORITE,
  payload,
});

const deleteFavorite = (payload) => ({
  type: DELETE_PINFAVORITE,
  payload,
});

/**  Action Creators: */
export const loadAllBoards = (payload) => ({
  type: LOAD_ALL_BOARDS,
  payload,
});

export const loadOneBoard = (board) => ({
  type: LOAD_ONE_BOARD,
  board,
});

export const receiveBoard = (board) => ({
  type: RECEIVE_BOARD,
  board,
});

export const editBoard = (board) => ({
  type: EDIT_BOARD,
  board,
});

export const addBoardCollaborator = (board) => ({
  type: ADD_BOARD_COLLABORATOR,
  board,
});

export const deleteBoard = (boardId) => ({
  type: DELETE_BOARD,
  boardId,
});

export const removePinBoard = (payload) => ({
  type: REMOVE_PINBOARD,
  payload,
});

/** Thunk Action Creators: */
export const fetchAllBoardsThunk = (username) => async (dispatch) => {
  const res = await fetch(`/api/boards/${username}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAllBoards(data));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const fetchOneBoardThunk = (boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}`);
  if (res.ok) {
    const board = await res.json();
    dispatch(loadOneBoard(board));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const fetchCreateBoardThunk = (board) => async (dispatch) => {
  const res = await fetch(`/api/boards/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveBoard(data));
    return data;
  } else {
    const data = await res.json();
    throw data;
  }
};

export const fetchEditBoardThunk = (board) => async (dispatch) => {
  const res = await fetch(`/api/boards/${board.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editBoard(data));
    return data;
  } else {
    const data = await res.json();
    throw data;
  }
};

export const fetchAddBoardCollaborator = (board) => async (dispatch) => {
  const res = await fetch(`/api/boards/${board.id}/collaborator/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addBoardCollaborator(data));
    return data;
  } else {
    const data = await res.json();
    throw data;
  }
};

export const fetchDeleteBoardThunk = (boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const board = await res.json();
    dispatch(deleteBoard(boardId));
    return board;
  }
};

export const addPinToBoardThunk = (pinId, boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}/pins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pinId),
  });
  if (response.ok) {
    // dispatch(createCommentAction(comment));
    // return response;
  } else {
    const errors = await response.json();
    return errors;
  }
};

// Favorites thunks
export const fetchDeleteFavThunk = (boardId, pinId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/favorites/${boardId}/${pinId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const unfavorite = await res.json();
      dispatch(deleteFavorite(unfavorite));
    }
  } catch (err) {
    console.log("There was something wrong with unfavoriting this pin", err);
  }
};

export const fetchAddFavoriteThunk = (boardId, pinId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/favorites/${boardId}/${pinId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const favorite = await res.json();
      dispatch(addFavorite(favorite));
    } else {
      console.log("Failed to add favorite pin");
    }
  } catch (err) {
    console.log("There was something wrong with adding the favorite pin", err);
  }
};

export const removePinBoardThunk = (boardId, pinId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}/pins/${pinId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const pin = await response.json();
    dispatch(removePinBoard(pinId));
    return pinId;
  }
};

/** Boards Reducer: */
const initialState = { allBoards: {}, singleBoard: {}, boardUser: {} };

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_BOARDS: {
      const boardsState = { allBoards: {}, singleBoard: {}, boardUser: {} };
      // Object.values(action.payload.boards).forEach((board) => {
      //   boardsState.allBoards[board.id] = board;
      // });
      boardsState.allBoards = action.payload.boards;
      boardsState.boardUser = action.payload.boardUser;
      boardsState.allUsers = action.payload.allUsers;
      return boardsState;
    }
    case LOAD_ONE_BOARD: {
      const newState = { ...state };
      newState.singleBoard = action.board;
      return newState;
    }
    case RECEIVE_BOARD: {
      return { ...state, singleBoard: { ...action.board } };
    }
    case EDIT_BOARD: {
      return { ...state, singleBoard: { ...action.board } };
    }
    case ADD_BOARD_COLLABORATOR: {
      return { ...state, singleBoard: { ...action.board } };
    }
    case DELETE_BOARD: {
      const newState = {
        ...state,
        allBoards: { ...state.allBoards },
        singleBoard: { ...state.singleBoard },
      };
      delete newState.allBoards[action.boardId];
      delete newState.singleBoard[action.boardId];
      return newState;
    }
    case ADD_PINFAVORITE: {
      //need pinId, userId
      // const newState ={
      //   ...state,
      //   allBoards: { ...state.allBoards },
      //   singleBoard: {...state.singleBoard, }
      // }
      const newState = { ...state };
      const pinFavAdded = newState.singleBoard.associated_pins.find(
        (pin) => pin.id === action.payload.pin_id
      );
      pinFavAdded.favorites.push(action.payload.user_id);
      // newState.singleBoard.associated_pins.favorites.push(action.user.id);
      pinFavAdded.sessionIsFavorited = true;
      return newState;
    }
    case DELETE_PINFAVORITE: {
      const newState = { ...state };
      const pinFavDeleted = newState.singleBoard.associated_pins.find(
        (pin) => pin.id === action.payload.pin_id
      );

      const userIndexRemoved = pinFavDeleted.favorites.indexOf(
        action.payload.user_id
      );
      if (userIndexRemoved !== -1) {
        pinFavDeleted.favorites.splice(userIndexRemoved, 1);
        pinFavDeleted.sessionIsFavorited = false;
      }
      return newState;
    }
    case REMOVE_PINBOARD: {
      // const newState = { ...state };
      // const pinFavDeleted = newState.singleBoard.associated_pins.filter(
      //   (pin) => pin.id !== action.payload.pinId
      // );
      // const newPins = [...pinFavDeleted];

      // const pinIndexRemoved = newState.singleBoard.associated_pins.findIndex(
      //   (obj) => obj.id === 29
      // );
      // if (pinIndexRemoved !== -1) {
      //   newState.singleBoard.associated_pins.splice(pinIndexRemoved, 1);
      // }
      return { ...state };
    }
    default:
      return state;
  }
};

export default boardsReducer;
