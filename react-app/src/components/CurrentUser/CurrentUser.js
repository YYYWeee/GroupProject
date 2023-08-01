import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllBoardsThunk} from "../../store/boards";
import BoardCard from "./BoardCard";
import "./CurrentUser.css";

export default function CurrentUser() {
  const dispatch = useDispatch();

  const boards = useSelector((state) => {
    return Object.values(state.boards.allBoards);
  });

  const currentUser = useSelector((state) => state.session.user);

  console.log("this is current user", currentUser);

  useEffect(() => {
    dispatch(fetchAllBoardsThunk());
  }, [dispatch]);

  if (!boards) return null;
  if (!currentUser) return null;

  return (
    <div className="curr-user-wrap">
      <div className="user-info">
        <img
          className="user-pp"
          src={
            currentUser.photo_url
              ? currentUser.photo_url
              : "https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg"
          }
        />

        <div className="user-name">
          <div className="u-firstname">{currentUser.first_name}</div>
          <div className="u-lastname">
            {currentUser.last_name && currentUser.last_name}
          </div>
        </div>
        <div className="my-username">@{currentUser.username}</div>
        <div className="user-buttons">
          <button
            className="share-btn"
            onClick={() => alert("Feature Coming Soon...")}
          >
            Share
          </button>
          <button
            className="edit-btn"
            onClick={() => alert("Feature Coming Soon...")}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="board-card">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
}
