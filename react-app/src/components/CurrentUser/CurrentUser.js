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
    <div>
      <div className="user-info">
        <img className="user-pp" src={currentUser.photo_url} />

        <div className="user-name">
          <div className="u-firstname">{currentUser.first_name}</div>
          <div className="u-lastname">
            {currentUser.last_name && currentUser.last_name}
          </div>
        </div>
        <div className="my-username">@{currentUser.username}</div>
        <div className="user-buttons">
          <button className="share-btn">Share</button>
          <button className="edit-btn">Edit Profile</button>
        </div>
      </div>

      {boards.map((board) => (
        <BoardCard key={board.id} board={board} currentUser={currentUser} />
      ))}
    </div>
  );
}
