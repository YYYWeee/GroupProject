import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import "./SinglePinDetails.css";
import "./SaveToBoard.css";
import { fetchOnePinThunk } from "../../../store/pins";
import CommentList from "./CommentsList";
import CreateComment from "./CreateComment";
import EditPin from "../EditPin";
import SaveToBoardCard from "./SaveToBoardCard";
import { fetchAllBoardsThunk } from "../../../store/boards";
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../../LoginFormModal";
import { useModal } from "../../../context/Modal";

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
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { closeModal } = useModal();

  const openMenu = (e) => {
    e.stopPropagation();
    if (showMenu) return;
    setShowMenu(true);
  };
  const profileArrowDirection = showMenu ? "up" : "down";
  const ulClassName = "create-dropdown3" + (showMenu ? "" : " hidden");

  const handleCreateBoardInPin = () => {
    history.push(`/${sessionUser.username}/board-builder`);
    window.scroll(0, 0);
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

  let linkHostname;
  linkHostname = targetPin?.link && new URL(targetPin.link).hostname;
  if (linkHostname?.startsWith("www.")) {
    linkHostname = linkHostname.slice(4);
  }
  const handleClickUser = async (e) => {
    history.push(`/${sessionUser?.username}`);
    window.scrollTo(0, 0);
  };
  const handleUpdate = (pin) => {
    setShowUpdateForm(true);
  };
  // const handleAddPinToBoard= async e=> {
  //   const requestBody = {
  //     pinId,
  //     boardId,
  //   }
  //   const data = await dispatch()
  // };

  // const handleGetUserAllBoards=async e=> {
  //   const userBoardsList = await dispatch(fetchAllBoardsThunk(sessionUser.id, targetPin.id));

  // }

  useEffect(() => {
    dispatch(fetchOnePinThunk(pinId)).then(setIsLoaded(true));
    window.scroll(0, 0);
  }, [dispatch, pinId]);

  return showUpdateForm === true ? (
    <EditPin pin={targetPin} setShowUpdateForm2={setShowUpdateForm} />
  ) : (
    <section className="single-pin-container">
      <main className="single-pin-upper-container">
        <div className="for-you-container">
          <NavLink exact to="/pins" className="for-you">
            <span>
              <i className={"fa-solid fa-arrow-left arrow left-arrow "}></i>
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
              {sessionUser && (
                <div>
                  <button onClick={openMenu} className="nav-create cursor">
                    <span className="pin-board-name">All pins</span>{" "}
                    <i
                      className={`fa-solid fa-chevron-${profileArrowDirection} arrow`}
                    ></i>
                  </button>
                  <div
                    className={ulClassName}
                    ref={ulRef}
                    // onClick={handleGetUserAllBoards}
                  >
                    <div className="save-to-board-container">
                      <div>
                        <div className="save-to-board">Save</div>
                        <div className={`save-to-board-context`}>
                          {targetPin?.sessionUserBoards &&
                            Object.values(targetPin?.sessionUserBoards).length >
                              0 &&
                            Object.values(targetPin?.sessionUserBoards).map(
                              (board) => (
                                <SaveToBoardCard
                                  key={board?.id}
                                  board={board}
                                />
                              )
                            )}
                        </div>
                      </div>
                    </div>
                    <div
                      class="cursor create-item2"
                      onClick={handleCreateBoardInPin}
                    >
                      <div class="single-save-board-left">
                        <div class="save-board-img-container plus">
                          <i className="fa-solid fa-plus"></i>
                        </div>
                        <div className="save-board-name truncate">
                          Create board
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="save cursor"
                    // onClick={handleAddPinToBoard}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
            <div className="pin-content-container">
              <div className="operation">
                {sessionUser && targetPin.owner_id === sessionUser.id && (
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(targetPin)}
                  >
                    <i class="fa-solid fa-pen-to-square fa-lg"></i>
                  </button>
                )}

                {!sessionUser && (
                  <div className="btns-boards">
                    <a href={targetPin?.link} className="save2 cursor">
                      Visit
                    </a>
                    <OpenModalButton
                      buttonText="Save"
                      onItemClick={closeModal}
                      modalComponent={<LoginFormModal />}
                    />
                  </div>
                )}
              </div>
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
