import { calculatedTimePassed } from "../../../utils/helper-functions";

function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <div className="comment-card-left">
        {comment.commenter.photo_url ? (
          <img
            src={comment.commenter.photo_url}
            alt="No creator preview"
            className="commenter-img"
          ></img>
        ) : (
          <i className="fas fa-user-circle" />
        )}
      </div>
      <div className="comment-card-right">
        <p>
          <span className="commenter-bold">{comment.commenter.first_name}</span>{" "}
          <span>{comment.message}</span>
        </p>
        <p>
          {calculatedTimePassed(comment.created_at)} Reply{" "}
          <i className="fa-regular fa-heart"></i>
        </p>
      </div>
    </div>
  );
}

export default CommentCard;
