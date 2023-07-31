import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCommentsThunk,
  deleteCommentThunk,
} from "../../../store/comments";

import CommentCard from "./CommentCard";

function CommentList({ targetPin }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => {
    return Object.values(state.comments);
    // if (!targetPin.comments) return null;
    // return targetPin.comments.map((id) => state.comments[id]);
    // if (!targetPin.comments) return state.comments;
    // return targetPin.comments;
  });
  const [showEditCommentForm, setShowEditCommentForm] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);

  comments?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  console.log(comments);
  useEffect(() => {
    console.log("targetPin.id", typeof targetPin.id);
    if (targetPin.id) dispatch(fetchAllCommentsThunk(targetPin.id));
    setShowEditCommentForm(false);
    setEditCommentId(null);
  }, [dispatch, targetPin]);

  if (!comments) {
    return null;
  }

  if (!targetPin.allow_comment) {
    return (
      <div className="comments-list-container">
        <div className="comment-title-container">
          <div className="what-do-you-think1">Comments</div>
        </div>
        <div className="turn-off">Comments are turned off for this Pin</div>
      </div>
    );
  } else if (comments.length === 0) {
    return (
      <div className="comments-list-container">
        <div className="comment-title-container">
          <div className="what-do-you-think1">Comments</div>
        </div>
        <div>No comments yet. Add one to start the conversation.</div>
      </div>
    );
  } else {
    return (
      <div className="comments-list-container">
        <div className="comment-title-container">
          <div className="what-do-you-think">
            {comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}
          </div>

          <div className="all-comments">
            {comments.length > 0 &&
              comments.map((comment) => (
                <CommentCard key={comment?.id} comment={comment} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CommentList;
