/** Action Type Constants: */
export const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
export const CREATE_COMMENT = "comments/CREATE_COMMENT";
export const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
export const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

/**  Action Creators: */
const loadAllCommentsAction = (comments, pinId) => ({
  type: LOAD_COMMENTS,
  comments,
  pinId,
});

const createCommentAction = (comment) => ({
  type: CREATE_COMMENT,
  comment,
});

const updateCommentAction = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

const removeCommentAction = (commentId, pinId) => ({
  type: REMOVE_COMMENT,
  commentId,
  pinId,
});

/** Thunk Action Creators: */
export const fetchAllCommentsThunk = (pinId) => async (dispatch) => {
  const response = await fetch(`/api/pins/${pinId}/comments`);
  if (response.ok) {
    const comments = await response.json();
    dispatch(loadAllCommentsAction(comments, pinId));
  } else {
    const errors = await response.json();
    console.log(errors);
    return errors;
  }
};

export const createCommentThunk = (comment, pinId) => async (dispatch) => {
  const response = await fetch(`/api/pins/${pinId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const comment = await response.json();
    dispatch(createCommentAction(comment));
    return comment;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateCommentThunk = (comment, commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(updateCommentAction(comment));
    return comment;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteCommentThunk = (commentId, pinId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "delete",
  });

  if (response.ok) {
    const { id: deletedCommentId } = await response.json();
    dispatch(removeCommentAction(deletedCommentId, pinId));
    return deletedCommentId;
  }
};

/** Comments Reducer: */
const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      const newComments = {};
      action.comments.forEach((comment) => {
        newComments[comment.id] = comment;
      });
      return { ...newComments };
    case CREATE_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case UPDATE_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case REMOVE_COMMENT:
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
