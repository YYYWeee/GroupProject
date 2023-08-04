import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function SaveToBoardCard({ board, pinId }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [showAfterSaved, setShowAfterSaved] = useState(false);
  const [buttonText, setButtonText] = useState("Save");
  const handleClickSavePin = async (e) => {
    console.log(board);
    await fetch(`/api/boards/${board?.id}/pins/${pinId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setShowAfterSaved(true);
    setButtonText("Saved");
  };

  return (
    <div
      className="single-save-board-card cursor create-item1"
      onClick={handleClickSavePin}
    >
      <div className="single-save-board-left">
        <div className="save-board-img-container">
          {board?.previewImgUrl ? (
            <img
              src={board?.previewImgUrl}
              alt="No board preview"
              className="save-board-img"
            ></img>
          ) : (
            ""
          )}
        </div>
        <div className="save-board-name nav-create truncate">{board.name}</div>
      </div>
      <button
        className={`save3 cursor ${
          board.is_pin_existing ? "color-saved-board" : ""
        } ${showAfterSaved ? "show-after-saved" : ""}`}
        disabled={board.is_pin_existing || buttonText === "Saved"}
      >
        {board.is_pin_existing || buttonText === "Saved" ? "Saved" : "Save"}
      </button>
    </div>
  );
}

export default SaveToBoardCard;
