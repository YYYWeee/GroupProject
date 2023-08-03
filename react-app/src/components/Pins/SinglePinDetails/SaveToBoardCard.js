import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function SaveToBoardCard({ board }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  // const handleClickSavePin =

  return (
    <div
      className="single-save-board-card cursor create-item1"
      // onClick={handleClickSavePin}
    >
      <div className="single-save-board-left">
        <div className="save-board-img-container">
          {board?.previewImgUrl ? (
            <img
              src={board?.previewImgUrl}
              alt="No board preview"
              className="save-board-img"
              //   onClick={handleClickBoard}
            ></img>
          ) : (
            ""
          )}
        </div>
        <div className="save-board-name nav-create truncate">{board.name}</div>
      </div>
      <button
        className="save3 cursor"
        // onClick={handleAddPinToBoard}
      >
        Save
      </button>
    </div>
  );
}

export default SaveToBoardCard;
