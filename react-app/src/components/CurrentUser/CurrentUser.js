import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllBoardsThunk } from "../../store/boards";
import BoardCard from "./BoardCard";
import "./CurrentUser.css";
import PinsList from "../Pins/PinsList/PinsList";

export default function CurrentUser() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const [showBoards, setShowBoards] = useState(true);

  const sessionUser = useSelector((state) => state.session.user);
  const boards = useSelector((state) => {
    return Object.values(state.boards.allBoards);
  });

  const boardUser = useSelector((state) => {
    return state.boards.boardUser;
  });

  const allPins = useSelector((state) => {
    return Object.values(state.pins.allPins);
  });
  // const userCreatedPins = allPins?.filter(
  //   (pin) => pin.owner_id === boardUser.id
  // );

  const handleClickCreated = () => {
    if (!showBoards) return;
    setShowBoards(false);
  };

  const handleClickSaved = () => {
    if (showBoards) return;
    setShowBoards(true);
  };

  // sort all the boards: default board All pins always show at first,
  // then sort feature boards by updated_at
  boards?.sort(
    (a, b) =>
      b.is_default - a.is_default ||
      new Date(b.updated_at) - new Date(a.updated_at)
  );

  useEffect(() => {
    dispatch(fetchAllBoardsThunk(username));
  }, [dispatch, username]);

  if (!boards) return null;

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
        {sessionUser.id === boardUser.id && (
          <div className="user-buttons">
            <button
              className="follow-btn cursor"
              onClick={() => alert("Feature Coming Soon...")}
            >
              Edit Profile
            </button>
          </div>
        )}
        {sessionUser.id !== boardUser.id && (
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
      <div>
        <button onClick={handleClickCreated}>Created</button>
        <button onClick={handleClickSaved}>Saved</button>
      </div>
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
