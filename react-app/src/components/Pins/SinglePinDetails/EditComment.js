import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./Comments.css";
import { updateCommentThunk } from "../../../store/comments";

function EditComment({ pin_id, comment }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [updatedMessage, setUpdatedMessage] = useState(comment.message);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    const formData = {
      message: updatedMessage,
    };
    await dispatch(updateCommentThunk(formData, comment.id));
    // if (updatedComment) setMessage("");
  };

  useEffect(() => {
    console.log(updatedMessage);
    setIsEnabled(true);
  }, [updatedMessage]);

  return (
    <div className="edit-comment-form">
      <form onSubmit={handleUpdateComment}>
        <input
          className={`comment-input input-length`}
          placeholder="Add a comment"
          type="text"
          value={updatedMessage}
          onChange={(e) => setUpdatedMessage(e.target.value)}
        ></input>
        <button>Cancel</button>
        <button>Save</button>
      </form>
    </div>
  );
}

export default EditComment;
