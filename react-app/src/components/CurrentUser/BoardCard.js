import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function BoardCard({board, currentUser}) {
  console.log("board", board);

  return (
    <div>
      <Link to={`/${currentUser.username}/${board.id}`}></Link>
    </div>
  );
}
