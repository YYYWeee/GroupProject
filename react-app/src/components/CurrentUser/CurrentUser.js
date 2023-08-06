import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchAllBoardsThunk } from "../../store/boards";
import BoardCard from "./BoardCard";
import "./CurrentUser.css";
import PinsList from "../Pins/PinsList/PinsList";
import PageNotFound from "../PageNotFound";
import LoadingPage from "../LoadingPage";

export default function CurrentUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { username } = useParams();
  const [showBoards, setShowBoards] = useState(true);

  const sessionUser = useSelector((state) => state.session.user);
  const boardUser = useSelector((state) => {
    return state.boards.boardUser;
  });
  let boards = useSelector((state) => {
    return Object.values(state.boards.allBoards);
  });
  const handleClickCreated = () => {
    if (!showBoards) return;
    setShowBoards(false);
  };

  const handleClickSaved = () => {
    if (showBoards) return;
    setShowBoards(true);
  };
  ////////////////////////////////////////
  // start for sorting dropdown
  const ulRef1 = useRef();
  const [showMenu1, setShowMenu1] = useState(false);
  const [sortBy, setSortBy] = useState("sortlastupdates");

  const openMenu1 = () => {
    if (showMenu1) return;
    setShowMenu1(true);
  };

  const closeMenu1 = () => setShowMenu1(false);
  useEffect(() => {
    if (!showMenu1) return;

    const closeMenu1 = (e) => {
      if (ulRef1.current && !ulRef1.current.contains(e.target)) {
        setShowMenu1(false);
      }
    };

    document.addEventListener("click", closeMenu1);

    return () => document.removeEventListener("click", closeMenu1);
  }, [showMenu1]);

  // hide those private boards if session user is not current boardUser.
  if (sessionUser.id !== boardUser.id) {
    boards = boards.filter((board) => !board.is_secret);
  }

  // sort all the boards: default board All pins always show at first,
  // then sort feature boards by updated_at
  if (sortBy === "sortlastupdates") {
    console.log("sortlastupdates");
    boards?.sort(
      (a, b) =>
        b.is_default - a.is_default ||
        new Date(b.updated_at) - new Date(a.updated_at)
    );
  } else {
    console.log("sortby board names");
    boards?.sort(
      (a, b) => b.is_default - a.is_default || a.name.localeCompare(b.name)
    );
    console.log(boards);
  }
  // end for sorting dropdown

  // start for plus dropdown
  const ulRef2 = useRef();
  const [showMenu2, setShowMenu2] = useState(false);

  const openMenu2 = () => {
    if (showMenu2) return;
    setShowMenu2(true);
  };
  const closeMenu2 = () => setShowMenu2(false);

  useEffect(() => {
    if (!showMenu2) return;

    const closeMenu2 = (e) => {
      if (ulRef2.current && !ulRef2.current.contains(e.target)) {
        setShowMenu2(false);
      }
    };

    document.addEventListener("click", closeMenu2);

    return () => document.removeEventListener("click", closeMenu2);
  }, [showMenu2]);

  const handleCreatePin = () => {
    closeMenu2();
    history.push("/pin-builder");
    window.scrollTo(0, 0);
  };

  const handleCreateBoard = () => {
    closeMenu2();
    history.push(`/${sessionUser.username}/board-builder`);
    window.scrollTo(0, 0);
  };
  // end for plus dropdown

  //  get all the boards of this pinner when initiating.
  useEffect(() => {
    dispatch(fetchAllBoardsThunk(username));
  }, [dispatch, username]);

  if (!boardUser || (boardUser && Object.keys(boardUser).length === 0)) {
    return <LoadingPage />;
  }
  // if (allUsers && !allUsers.some((user) => user.username === username))
  //   return <PageNotFound />;

  return (
    <div className="curr-user-wrap">
      <div className="user-info">
        <img
          className="user-pp"
          alt="No user preview"
          src={
            boardUser.photo_url
              ? boardUser.photo_url
              : "https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg"
          }
        />

        <div className="user-name">
          <div className="u-firstname">{boardUser?.first_name}</div>
          <div className="u-lastname">
            {boardUser?.last_name && boardUser?.last_name}
          </div>
        </div>
        <div className="my-username">@{boardUser?.username}</div>
        <div className="my-username1">{boardUser?.about}</div>
        {sessionUser && sessionUser?.id === boardUser?.id && (
          <div className="user-buttons">
            <button
              className="follow-btn cursor a97"
              onClick={() => alert("Feature Coming Soon...")}
            >
              Edit Profile
            </button>
          </div>
        )}
        {sessionUser && sessionUser?.id !== boardUser?.id && (
          <div className="user-buttons">
            <button
              className="follow-btn2"
              onClick={() => alert("Feature Coming Soon...")}
            >
              Follow
            </button>
          </div>
        )}
      </div>
      <div className="board-created-container">
        <div className="board-created-btn">
          <button
            onClick={handleClickCreated}
            className={`board-created a97 ${!showBoards ? "focuss" : ""}`}
          >
            Created
          </button>
        </div>
        <div className="board-created-btn">
          <button
            onClick={handleClickSaved}
            className={`board-created a97 ${showBoards ? "focuss" : ""}`}
          >
            Saved
          </button>
        </div>
      </div>
      {sessionUser && sessionUser?.id === boardUser?.id && showBoards && (
        <div className="board-func-btns-container">
          <div
            className={
              "save-board-img-container1 plus cursor a85" +
              (showMenu1 ? "dropopen" : "")
            }
            onClick={openMenu1}
          >
            <i className="fa-solid fa-arrow-up-wide-short"></i>
          </div>
          <div
            className={"create-dropdown4" + (showMenu1 ? "" : " hidden")}
            ref={ulRef1}
          >
            <div className="dropdown-title">Sort by</div>
            <div
              className="create-item"
              onClick={() => {
                setSortBy("sortboardnames");
                setShowMenu1(false);
              }}
            >
              <button>
                A to Z{"   "}
                <i
                  className={`fa-solid fa-check ${
                    sortBy === "sortboardnames" ? "" : " hidden"
                  }`}
                ></i>
              </button>
            </div>
            <div
              className="create-item"
              onClick={() => {
                setSortBy("sortlastupdates");
                setShowMenu1(false);
              }}
            >
              <button className="">
                Last saved to{"   "}
                <i
                  className={`fa-solid fa-check ${
                    sortBy === "sortlastupdates" ? "" : " hidden"
                  }`}
                ></i>
              </button>
            </div>
          </div>
          <div
            className={
              "save-board-img-container1 plus cursor a85" +
              (showMenu2 ? "dropopen" : "")
            }
            onClick={openMenu2}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
          <div
            className={"create-dropdown5" + (showMenu2 ? "" : " hidden")}
            ref={ulRef2}
          >
            <div className="dropdown-title">Create</div>
            <div className="create-item">
              <button onClick={handleCreatePin}>Pin</button>
            </div>
            <div className="create-item">
              <button onClick={handleCreateBoard}>Board</button>
            </div>
          </div>
        </div>
      )}
      {showBoards ? (
        <div className="board-card">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} boardUser={boardUser} />
          ))}
        </div>
      ) : (
        <div className="user-pins-masonary">
          <PinsList targetUser={boardUser} />
        </div>
      )}
    </div>
  );
}
