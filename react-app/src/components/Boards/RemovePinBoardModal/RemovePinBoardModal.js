import "./RemovePinBoardModal.css";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  fetchDeleteFavThunk,
  fetchOneBoardThunk,
  removePinBoardThunk,
} from "../../../store/boards";

function RemovePinBoardModal({ targetPin }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);
  const targetBoard = useSelector((state) => state.boards.singleBoard);
  const deleteHandler = async () => {
    await dispatch(removePinBoardThunk(targetBoard.id, targetPin.id));
    await dispatch(fetchDeleteFavThunk(targetBoard.id, targetPin.id));
    await dispatch(fetchOneBoardThunk(targetBoard.id));
    closeModal();
    history.push(`/${currentUser.username}/board/${targetBoard.id}`);
  };

  return (
    <div className="delete-b">
      <div className="del-title">Remove this pin?</div>
      <div className="u-sure">
        The pin <span className="b-name">{targetPin?.title} </span>will be
        removed from your board{" "}
        <span className="b-name">{targetBoard?.name}</span>. Are you sure?
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

export default RemovePinBoardModal;
