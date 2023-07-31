/** Action Type Constants: */
const LOAD_ALL_BOARDS = "boards/LOAD_ALL_BOARDS";

const LOAD_ONE_BOARD = "boards/LOAD_ONE_BOARD";

const DELETE_BOARD = "boards/DELETE_BOARD";

/**  Action Creators: */
export const loadAllBoards = (boards) => ({
  type: LOAD_ALL_BOARDS,
  boards,
});

export const loadOneBoard = (board) => ({
  type: LOAD_ONE_BOARD,
  board,
});

export const deleteBoard = (boardId) => ({
  type: DELETE_BOARD,
  boardId,
});

/** Thunk Action Creators: */
export const fetchAllBoardsThunk = () => async (dispatch) => {
  const res = await fetch("/api/boards");
  if (res.ok) {
    const boards = await res.json();
    dispatch(loadAllBoards(boards));
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

export const fetchDeleteBoardThunk = (boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const board = await res.json();
    console.log("INSIDE DELETE THUNK");
    dispatch(deleteBoard(boardId));
    return board;
  }
};
/** Boards Reducer: */
const initialState = {allBoards: {}, singleBoard: {}};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_BOARDS: {
      const boardsState = {allBoards: {}, singleBoard: {}};
      action.boards.forEach((board) => {
        boardsState.allBoards[board.id] = board;
      });
      return boardsState;
    }
    case LOAD_ONE_BOARD: {
      const newState = {...state};
      newState.singleBoard = action.board;
      return newState;
    }
    case DELETE_BOARD: {
      const newState = {
        ...state,
        allBoards: {...state.allBoards},
        singleBoard: {...state.singleBoard},
      };
      delete newState.allBoards[action.boardId];
      delete newState.singleBoard[action.boardId];
      return newState;
    }

    default:
      return state;
  }
};

export default boardsReducer;
