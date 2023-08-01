import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import "./SinglePinDetails.css";
import { fetchOnePinThunk } from "../../../store/pins";
import CommentList from "./CommentsList";
import CreateComment from "./CreateComment";

function SinglePinDetails() {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

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
  const profileArrowDirection = showMenu ? "up" : "down";
  const ulClassName = "create-dropdown" + (showMenu ? "" : " hidden");

  let linkHostname;
  linkHostname = targetPin?.link && new URL(targetPin.link).hostname;
  if (linkHostname?.startsWith("www.")) {
    linkHostname = linkHostname.slice(4);
  }

  const handleClickUser = async (e) => {
    history.push(`/${sessionUser?.username}`);
    window.scrollTo(0, 0);
  };

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
            <span>
              <i className={"fa-solid fa-arrow-left arrow left-arrow"}></i>
            </span>
            {sessionUser && <span className="for-you"> For you</span>}
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
            {targetPin?.link && (
              <div className="img-link-container cursor">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                <a href={targetPin?.link} className="img-link">
                  {linkHostname}
                </a>
              </div>
            )}
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
              <a href={targetPin?.link} className="hostname">
                {linkHostname}
              </a>
              <div className="pin-title-container">
                <a className="pin-title" href={targetPin?.link}>
                  {targetPin?.title}
                </a>
              </div>
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
                    className="creator-img cursor"
                    onClick={handleClickUser}
                  ></img>
                  <div className="pin-creator-middle">
                    <p onClick={handleClickUser} style={{ cursor: "pointer" }}>
                      {targetPin?.creator?.first_name}{" "}
                      {targetPin?.creator?.last_name}
                    </p>
                    <p>16k followers</p>
                  </div>
                </div>
                <div>
                  {sessionUser && (
                    <button className="follow-btn cursor">Follow</button>
                  )}
                </div>
              </div>
              {targetPin && <CommentList targetPin={targetPin} />}
            </div>
            {sessionUser && <CreateComment targetPin={targetPin} />}
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
