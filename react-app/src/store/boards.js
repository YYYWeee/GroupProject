/** Action Type Constants: */
const LOAD_ALL_BOARDS = "boards/LOAD_ALL_BOARDS";

const LOAD_ONE_BOARD = "boards/LOAD_ONE_BOARD";

/**  Action Creators: */
export const loadAllBoards = (boards) => ({
  type: LOAD_ALL_BOARDS,
  boards,
});

export const loadOneBoard = (board) => ({
  type: LOAD_ONE_BOARD,
  board,
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
    dispatch(loadOneBoard(boards));
  } else {
    const errors = await res.json();
    return errors;
  }
};

/** Boards Reducer: */
const initialState = {allBoards: {}, singleBoard: {}};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_BOARDS:
      const boardsState = {allBoards: {}, singleBoard: {}};
      action.boards.forEach((board) => {
        boardsState.allBoards[board.id] = board;
      });
      return boardsState;
  }
};

export default boardsReducer;
