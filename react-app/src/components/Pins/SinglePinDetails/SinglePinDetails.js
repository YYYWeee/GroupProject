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
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../../LoginFormModal";
import { useModal } from "../../../context/Modal";
import PageNotFound from "../../PageNotFound";
import LoadingPage from "../../LoadingPage";

function SinglePinDetails() {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const ulRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);
  const targetPin = useSelector((state) =>
    state.pins.singlePin ? state.pins.singlePin : {}
  );
  const [selectedBoard, setSelectedBoard] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    let savedOnes =
      (targetPin.sessionUserBoards &&
        Object.values(targetPin.sessionUserBoards) &&
        Object.values(targetPin.sessionUserBoards).filter(
          (board) => board.is_pin_existing === true
        )) ||
      [];
    savedOnes.sort((a, b) =>
      a.is_default === b.is_default ? 0 : a.is_default ? 1 : -1
    );
    if (savedOnes.length > 0) {
      setSelectedBoard(savedOnes[0]);
    }
  }, [targetPin]);

  const selectBoard = (board) => {
    setSelectedBoard(board);
  };

  // useEffect(() => {
  //   (async () => {
  //     console.log(selectedBoard);
  //     await fetch(`/api/boards/${selectedBoard?.id}/pins/${targetPin?.id}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   })();
  // }, [selectedBoard, targetPin]);

  const { closeModal } = useModal();

  const openMenu = (e) => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const profileArrowDirection = showMenu ? "up" : "down";
  const ulClassName = "create-dropdown3" + (showMenu ? "" : " hidden");

  const handleCreateBoardInPin = () => {
    history.push(`/${sessionUser.username}/board-builder`);
    window.scroll(0, 0);
  };

  const boardLists =
    targetPin?.sessionUserBoards &&
    Object.values(targetPin?.sessionUserBoards).sort((a, b) => {
      if (a.is_default !== b.is_default) {
        return a.is_default ? -1 : 1;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

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
    history.push(`/${targetPin?.creator?.username}`);
    window.scrollTo(0, 0);
  };
  const handleUpdate = (pin) => {
    setShowMenu(false);
    setShowUpdateForm(true);
  };

  const handleClickGoBack = () => {
    setShowMenu(false);
    window.history.back();
  };

  // useEffect(() => {
  //   dispatch(fetchOnePinThunk(pinId)).then(setIsLoaded(true));
  //   window.scroll(0, 0);
  // }, [dispatch, pinId]);

  useEffect(() => {
    const res = dispatch(fetchOnePinThunk(pinId));
    window.scroll(0, 0);
  }, []);

  if (!targetPin || (targetPin && Object.keys(targetPin).length === 0)) {
    return <LoadingPage />;
  }

  return showUpdateForm === true ? (
    <EditPin pin={targetPin} setShowUpdateForm2={setShowUpdateForm} />
  ) : (
    <section className="single-pin-container">
      <main className="single-pin-upper-container">
        <div className="for-you-container">
          <span className="for-you a85 cursor" onClick={handleClickGoBack}>
            <i className={"fa-solid fa-arrow-left arrow left-arrow a85"}></i>
          </span>
          {sessionUser && <span className="for-you"> For you</span>}
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
                <a href={targetPin?.link} className="img-link" target="_blank">
                  {linkHostname}
                </a>
              </div>
            )}
          </div>
          <div className="pin-right-container">
            <div className="btns-board">
              {sessionUser && targetPin.owner_id === sessionUser.id ? (
                <button
                  className="update-btn a90"
                  onClick={() => handleUpdate(targetPin)}
                >
                  <i className="fa-solid fa-pen-to-square fa-lg"></i>
                </button>
              ) : (
                <div></div>
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
              {sessionUser && (
                <div className="save-trick">
                  <button onClick={openMenu} className="nav-create1 cursor">
                    <span className="pin-board-name">
                      {selectedBoard.name || "Boards"}
                    </span>{" "}
                    <i
                      className={`fa-solid fa-chevron-${profileArrowDirection} arrow`}
                    ></i>
                  </button>
                  <button className="save cursor a95" onClick={openMenu}>
                    Save
                  </button>
                  <div className={ulClassName} ref={ulRef}>
                    <div className="save-to-board-container">
                      <div>
                        <div className="save-to-board">Save</div>
                        <div className={`save-to-board-context`}>
                          {boardLists &&
                            boardLists.length > 0 &&
                            boardLists.map((board) => (
                              <div
                                key={board?.id}
                                onClick={() => selectBoard(board)}
                              >
                                <SaveToBoardCard board={board} pinId={pinId} />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className="cursor create-item2"
                      onClick={handleCreateBoardInPin}
                    >
                      <div className="single-save-board-left a99">
                        <div className="save-board-img-container plus">
                          <i className="fa-solid fa-plus"></i>
                        </div>
                        <div className="save-board-name truncate">
                          Create board
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <button
                    className="save cursor"
                    // onClick={handleAddPinToBoard}
                  >
                    Save
                  </button> */}
                </div>
              )}
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
                        : "https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg"
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
                    <button
                      className="follow-btn cursor"
                      onClick={() => alert("Feature coming soon!")}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
              {targetPin && <CommentList targetPin={targetPin} />}
            </div>
            {sessionUser && <CreateComment targetPin={targetPin} />}
          </div>
        </div>
      </main>
      <div className="more-like-this"></div>
    </section>
  );
}

export default SinglePinDetails;
