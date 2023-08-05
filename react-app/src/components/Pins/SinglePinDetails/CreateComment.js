import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { createCommentThunk } from "../../../store/comments";

function CreateComment({ targetPin }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [message, setMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const ulClassName = "create-dropdown1" + (showMenu ? "" : " hidden");

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
      if (ulRef.current && !ulRef.current.contains(e.target)) {
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
              sessionUser?.photo_url
                ? sessionUser?.photo_url
                : "https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg"
            }
            alt="No creator preview"
            className="this-commenter-img"
          ></img>
          <form onSubmit={handleSubmitComment} className="comment-form">
            <div className={`comment-input-box`}>
              <textarea
                className={`textarea-comment`}
                placeholder="Add a comment"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              {!message || message === "" ? (
                <div className="smile cursor" onClick={openMenu}>
                  😀
                </div>
              ) : (
                <button type="submit" className="comment-btn cursor">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              )}
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
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateComment;
