import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import "./SinglePinDetails.css";
import { fetchOnePinThunk } from "../../../store/pins";
import CommentCard from "./CommentCard";

function SinglePinDetails() {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const ulRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);
  const targetPin = useSelector((state) =>
    state.pins.singlePin ? state.pins.singlePin : {}
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => setShowMenu(false);

  const profileArrowDirection = showMenu ? "up" : "down";
  const ulClassName = "create-dropdown" + (showMenu ? "" : " hidden");

  let linkHostname;
  linkHostname = targetPin?.link && new URL(targetPin.link).hostname;
  if (linkHostname?.startsWith("www.")) {
    linkHostname = linkHostname.slice(4);
  }

  useEffect(() => {
    dispatch(fetchOnePinThunk(pinId)).then(setIsLoaded(true));
    window.scroll(0, 0);
  }, [dispatch, pinId]);

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

  return isLoaded === false ? (
    <h1>Loading in progress</h1>
  ) : (
    <section className="single-pin-container">
      <main className="single-pin-upper-container">
        <div className="for-you-container">
          <NavLink exact to="/pins" className="for-you">
            <span className="left-arrow">
              <i className={"fa-solid fa-arrow-left arrow"}></i>
            </span>
            <span className="for-you"> For you</span>
          </NavLink>
        </div>
        <div className="pin-main-container">
          <div className="pin-img-container">
            <img
              src={
                targetPin?.image_url ? targetPin.image_url : "no preview img"
              }
              alt="No pin preview"
              className="pin-img"
            ></img>
          </div>
          <div className="pin-right-container">
            <div className="btns-boards">
              <div>
                <button onClick={openMenu} className="nav-create cursor">
                  <span className="pin-board-name">All pins</span>{" "}
                  <i
                    className={`fa-solid fa-chevron-${profileArrowDirection} arrow`}
                  ></i>
                </button>
                <div className={ulClassName} ref={ulRef}>
                  <div className="save-to-board">Save to board</div>
                  <div className="">
                    <button>boardcard here</button>
                  </div>
                  <div className="">
                    <button>boardcard here</button>
                  </div>
                  <div className="">
                    <button>boardcard here</button>
                  </div>
                </div>
                <button className="save cursor">Save</button>
              </div>
            </div>
            <div className="pin-content-container">
              <div className="hostname">
                <a href={targetPin?.link}>{linkHostname}</a>
              </div>
              <h1 className="pin-title">{targetPin?.title}</h1>
              <p className="pin-description">{targetPin?.description}</p>
              <div className="pin-creator-container">
                <div className="pin-creator-left">
                  <img
                    src={
                      targetPin?.creator?.photo_url
                        ? targetPin?.creator?.photo_url
                        : "no preview img"
                    }
                    alt="No creator preview"
                    className="creator-img"
                  ></img>
                  <div>
                    {targetPin?.creator?.first_name}{" "}
                    {targetPin?.creator?.last_name}
                  </div>
                </div>
                <div className="follow-btn">
                  <button>Follow</button>
                </div>
              </div>
              <div className="comments-list-container">
                <div className="comment-title-container">
                  <div>Comments</div>
                  {targetPin?.comments?.length > 0 ? (
                    targetPin?.comments?.map((comment) => (
                      <CommentCard key={comment.id} comment={comment} />
                    ))
                  ) : (
                    <div>
                      No comments yet. Add one to start the conversation.
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="comments-container">
              <div className="comment-stats-container">
                <div>
                  {targetPin?.comments?.length}{" "}
                  {targetPin?.comments?.length === 1 ? "Comment" : "Comments"}
                </div>
                <div>
                  <i className="fa-regular fa-heart"></i>
                </div>
              </div>
              <div className="session-user-img">
                <img
                  src={
                    sessionUser.photo_url
                      ? sessionUser.photo_url
                      : "no preview img"
                  }
                  alt="No creator preview"
                  className="commenter-img"
                ></img>
              </div>
              <div>add a comment field</div>
            </div>
          </div>
        </div>
      </main>
      <div className="more-like-this">More like this</div>
      <div className="more-like-this">More like this</div>

      <div className="more-like-this">More like this</div>

      <div className="more-like-this">More like this</div>
    </section>
  );
}

export default SinglePinDetails;
