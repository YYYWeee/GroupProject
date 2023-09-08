import { calculatedTimePassed } from "../../../utils/helper-functions";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import EditComment from "./EditComment";
import { deleteCommentThunk } from "../../../store/comments";

function CommentCard({ comment }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showEditCommentForm, setShowEditCommentForm] = useState(false);
  const handleToggle = () => {
    setShowEditCommentForm((prev) => !prev);
  };

  const handleClickUser = async (e) => {
    history.push(`/${comment?.commenter?.username}`);
    window.scrollTo(0, 0);
  };
  return (
    // <div className="comment-single">
    <div className="comment-card">
      <div className="comment-card-left">
        {comment?.commenter?.photo_url ? (
          <img
            src={comment.commenter?.photo_url}
            alt="No creator preview"
            className="commenter-img cursor"
            onClick={handleClickUser}
          ></img>
        ) : (
          <img
            src="https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg"
            alt="No creator preview"
            className="commenter-img cursor"
            onClick={handleClickUser}
          ></img>
        )}
      </div>
      <div className="comment-card-right">
        <p>
          <span className="commenter-bold cursor" onClick={handleClickUser}>
            {comment?.commenter?.first_name}
          </span>{" "}
          <span>{comment?.message}</span>
        </p>
        <div className="comment-stat">
          <div className="comment-stat-i">
            {calculatedTimePassed(comment?.updated_at)}
          </div>
          {/* <div className="comment-stat-i reply">Reply</div> */}
          {/* <i className="fa-regular fa-heart"></i> */}
          {sessionUser?.id === comment.user_id && (
            <div className="comment-stat-i reply cursor" onClick={handleToggle}>
              Edit
            </div>
          )}
          {sessionUser?.id === comment.user_id && (
            <div
              className="comment-stat-i reply cursor"
              onClick={() =>
                dispatch(deleteCommentThunk(comment.id, comment.pin_id))
              }
            >
              Delete
            </div>
          )}
          {/* <i className="fa-solid fa-ellipsis"></i> */}
        </div>

        {showEditCommentForm && sessionUser?.id === comment.user_id && (
          <EditComment
            comment={comment}
            setShowEditCommentFormO={setShowEditCommentForm}
          />
        )}
      </div>
    </div>
    // </div>
  );
}

export default CommentCard;
