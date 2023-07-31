import {useDispatch} from "react-redux";
import {fetchDeleteBoardThunk} from "../../../store/boards";
import {useModal} from "../../../context/Modal";

export default function DeleteBoard({board}) {
  // const dispatch =
  return (
    <div>
      <h2>Delete this board?</h2>
      <div>
        The board <span>{board.name} </span>along with its pins will be removed
        from your profile.
      </div>
      <div>
        <button>Cancel</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
