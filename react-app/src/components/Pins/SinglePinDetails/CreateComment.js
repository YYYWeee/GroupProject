import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { createCommentThunk } from "../../../store/comments";

function CreateComment({ targetPin }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [message, setMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const ulClassName = "create-dropdown" + (showMenu ? "" : " hidden");

  const reactionContainer = (
    <div>
      <i className="fa-regular fa-heart"></i>
    </div>
  );

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prevVal) => prevVal + emoji);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const formData = {
      message: message,
    };
    console.log("submit comment", formData);
    const createdComment = await dispatch(
      createCommentThunk(formData, targetPin.id)
    );
    if (createdComment) setMessage("");
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="comments-container">
      <div className="comment-stats-container">
        <div className="what-do-you-think">What do you think?</div>
        {reactionContainer}
      </div>
      {targetPin?.allow_comment && (
        <div className="add-comment-container">
          <img
            src={
              sessionUser?.photo_url ? sessionUser?.photo_url : "no preview img"
            }
            alt="No creator preview"
            className="this-commenter-img"
          ></img>
          <form onSubmit={handleSubmitComment} className="comment-form">
            <div>
              <input
                className={`comment-input input-length`}
                placeholder="Add a comment"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></input>
              {!message || message === "" ? (
                <div className="smile cursor" onClick={openMenu}>
                  😀
                </div>
              ) : (
                <button type="submit">
                  <i className="fa-solid fa-paper-plane comment-btn cursor"></i>
                </button>
              )}
              <div className={ulClassName} ref={ulRef}>
                <div className="emoji-list">
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("😃")}
                  >
                    😃
                  </div>
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("😄")}
                  >
                    😄
                  </div>
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("😁")}
                  >
                    😁
                  </div>
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("😆")}
                  >
                    😆
                  </div>
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("😅")}
                  >
                    😅
                  </div>
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("🤣")}
                  >
                    🤣
                  </div>
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("😂")}
                  >
                    😂
                  </div>
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("😛")}
                  >
                    😛
                  </div>
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("😍")}
                  >
                    😍
                  </div>
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("🤧")}
                  >
                    🤧
                  </div>
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("💋")}
                  >
                    💋
                  </div>
                  <div
                    className="cursor"
                    onClick={() => handleEmojiClick("👌")}
                  >
                    👌
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateComment;
