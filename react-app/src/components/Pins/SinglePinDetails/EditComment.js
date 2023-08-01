import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./Comments.css";
import { updateCommentThunk } from "../../../store/comments";

function EditComment({ comment, setShowEditCommentFormO }) {
  const dispatch = useDispatch();
  const ulRef = useRef();
  const [updatedMessage, setUpdatedMessage] = useState(comment.message);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditCommentForm, setShowEditCommentForm] = useState(true);
  const ulClassName = "create-dropdown2" + (showMenu ? "" : " hidden");

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    const formData = {
      message: updatedMessage,
    };
    await dispatch(updateCommentThunk(formData, comment.id));
    setShowEditCommentForm(false);
    setShowEditCommentFormO(false);
    setShowMenu(false);
  };

  const handleEmojiClick = (emoji) => {
    setUpdatedMessage((prevVal) => prevVal + emoji);
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      {showEditCommentForm && (
        <div className="edit-comment-form">
          <form onSubmit={handleUpdateComment} className="comment-edit-form">
            <div className="edit-background cursor">
              <textarea
                className={`comment-edit-input cursor`}
                placeholder="Add a comment"
                type="text"
                value={updatedMessage}
                onChange={(e) => setUpdatedMessage(e.target.value)}
                required
              ></textarea>
              <div className="smile-emoji cursor smile" onClick={openMenu}>
                😀
              </div>
              <div className={ulClassName} ref={ulRef}>
                <div className="emoji-list">
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("😃")}
                  >
                    😃
                  </div>
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("😄")}
                  >
                    😄
                  </div>
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("😁")}
                  >
                    😁
                  </div>
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("😆")}
                  >
                    😆
                  </div>
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("😅")}
                  >
                    😅
                  </div>
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("🤣")}
                  >
                    🤣
                  </div>
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("😂")}
                  >
                    😂
                  </div>
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("😛")}
                  >
                    😛
                  </div>
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("😍")}
                  >
                    😍
                  </div>
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("🤧")}
                  >
                    🤧
                  </div>
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("💋")}
                  >
                    💋
                  </div>
                  <div
                    className="cursor smile1"
                    onClick={() => handleEmojiClick("👌")}
                  >
                    👌
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowEditCommentForm(false);
                  setShowEditCommentFormO(false);
                  setShowMenu(false);
                }}
                className="follow-btn1 cursor"
              >
                Cancel
              </button>
              <button
                disabled={updatedMessage === comment.message}
                className="follow-btn2 cursor"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditComment;
