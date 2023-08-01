import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import "./CurrentUser.css";

export default function BoardCard({board, currentUser}) {
  console.log("board", board);

  return (
    <div className="board-card-wrap">
      <Link to={`/${currentUser.username}/board/${board.id}`}>
        <img
          className="need-cover-pic"
          src="https://wallpaperaccess.com/full/1933166.jpg"
        />
        <div>{board.name}</div>
      </Link>
    </div>
  );
}
