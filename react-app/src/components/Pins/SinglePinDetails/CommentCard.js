import { calculatedTimePassed } from "../../../utils/helper-functions";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import EditComment from "./EditComment";
import { deleteCommentThunk } from "../../../store/comments";

function CommentCard({ comment }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleClickUser = async (e) => {
    history.push(`/${sessionUser?.username}`);
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
          <i className="fas fa-user-circle" />
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
          <div className="comment-stat-i reply">Reply</div>
          <i className="fa-regular fa-heart"></i>
          {sessionUser?.id === comment.user_id && (
            <div className="comment-stat-i reply cursor">Edit</div>
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
        {sessionUser?.id === comment.user_id && (
          <EditComment pin_id={comment.pin_id} comment={comment} />
        )}
      </div>
    </div>
    // </div>
  );
}

export default CommentCard;
