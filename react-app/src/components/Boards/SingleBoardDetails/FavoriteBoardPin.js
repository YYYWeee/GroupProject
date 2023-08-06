import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  fetchAddFavoriteThunk,
  fetchDeleteFavThunk,
} from "../../../store/boards";

function FavoriteBoardPin({ pin, boardId, hasAuthToEdit }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [numFavorites, setNumFavorites] = useState(pin.favorites.length);
  const [isFavorited, setIsFavorited] = useState(pin.sessionIsFavorited);
  const handleStarClick = async (e) => {
    if (isFavorited) {
      setIsFavorited(false);
      setNumFavorites((prev) => prev - 1);
      await dispatch(fetchDeleteFavThunk(boardId, pin.id));
    } else {
      setIsFavorited(true);
      setNumFavorites((prev) => prev + 1);
      await dispatch(fetchAddFavoriteThunk(boardId, pin.id));
    }
  };

  return (
    <div className="numFavs-icons-out">
      <p>{numFavorites > 0 ? numFavorites : ""}</p>
      <div onClick={handleStarClick}>
        {isFavorited ? (
          <i id="s-stars" className="fa-solid fa-star"></i>
        ) : (
          <i id="s-stars" className="fa-regular fa-star"></i>
        )}
      </div>
    </div>
  );
}

export default FavoriteBoardPin;
