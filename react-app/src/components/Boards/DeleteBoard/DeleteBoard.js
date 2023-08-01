import {useDispatch, useSelector} from "react-redux";
import {fetchDeleteBoardThunk} from "../../../store/boards";
import {useModal} from "../../../context/Modal";
import {useHistory} from "react-router-dom";

import "./DeleteBoard.css";

export default function DeleteBoard({board}) {
  const dispatch = useDispatch();
  const {closeModal} = useModal();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);

  console.log("this is current user", currentUser);

  const deleteHandler = async () => {
    console.log("inside delete handler");
    await dispatch(fetchDeleteBoardThunk(board.id));

    closeModal();
    history.push(`/${currentUser.username}`);
  };
  return (
    <div className="delete-b">
      <div className="del-title">Delete this board?</div>
      <div className="u-sure">
        The board <span className="b-name">{board.name} </span>along with its
        pins will be removed from your profile. Are you sure?
      </div>
      <div className="del-b-btn">
        <button className="cancel-btn" onClick={closeModal}>
          Cancel
        </button>
        <button className="del-btn" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
}
