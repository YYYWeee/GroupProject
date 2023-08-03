import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CurrentUser.css";
import { calculatedTimePassed } from "../../utils/helper-functions";

export default function BoardCard({ board, boardUser }) {
  const sessionUser = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.boards.allUsers);
  const collaborators = allUsers?.filter((user) =>
    board.membersId.includes(user.id)
  );
  console.log("collaborators", collaborators);
  let payload;
  if (board.is_default) {
    payload = (
      <div className="feature-board-container">
        <div className="default-board-1">
          {board.pinImgUrls[0] && (
            <img
              className="need-cover-pic"
              src={board.pinImgUrls[0]}
              alt="preview board1"
            />
          )}
        </div>
        <div className="default-board-1">
          {board.pinImgUrls[1] && (
            <img
              className="need-cover-pic"
              src={board.pinImgUrls[1]}
              alt="preview board1"
            />
          )}
        </div>
        <div className="default-board-1">
          {board.pinImgUrls[2] && (
            <img
              className="need-cover-pic"
              src={board.pinImgUrls[2]}
              alt="preview board1"
            />
          )}
        </div>
        <div className="default-board-1">
          {board.pinImgUrls[3] && (
            <img
              className="need-cover-pic"
              src={board.pinImgUrls[3]}
              alt="preview board1"
            />
          )}
        </div>
      </div>
    );
  } else {
    payload = (
      <div className="feature-board-container">
        {boardUser.id === sessionUser.id && board.is_secret && (
          <i className="fa-solid fa-lock"></i>
        )}
        {boardUser.id === sessionUser.id && (
          <div className="aa">
            <i className="fa-solid fa-pen-to-square fa-lg"></i>
          </div>
        )}
        <div className="feature-board-left-container">
          {board.pinImgUrls[0] ? (
            <img
              className="need-cover-pic-big"
              src={board.pinImgUrls[0]}
              alt="preview board1"
            />
          ) : (
            <div className="need-cover-pic-big-img"></div>
          )}
        </div>
        <div className="feature-board-right-container">
          <div className="feature-board-small-img">
            {board.pinImgUrls[1] ? (
              <img
                className="need-cover-pic"
                src={board.pinImgUrls[1]}
                alt="preview board2"
              />
            ) : (
              <div className="need-cover-pic"></div>
            )}
          </div>
          <div className="feature-board-small-img">
            {board.pinImgUrls[2] ? (
              <img
                className="need-cover-pic"
                src={board.pinImgUrls[2]}
                alt="preview board3"
              />
            ) : (
              <div className="need-cover-pic"></div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="board-card-wrap">
      <Link to={`/${boardUser.username}/board/${board.id}`}>
        {payload}
        <div className="user-board-name-container">
          <div className="user-board-name">{board.name}</div>
          {collaborators.length > 1 &&
            collaborators.map((member, index) => (
              <div key={index}>
                <div>{member.id}</div>
                <img
                  className="need-cover-pic"
                  src={member.photo_url}
                  alt="preview board1"
                />
              </div>
            ))}
        </div>
        <div className="board-stats">
          <p>{board.numPins} Pins</p>
          <p>{calculatedTimePassed(board.updated_at)}</p>
        </div>
      </Link>
    </div>
  );
}
