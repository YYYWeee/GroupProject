import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAddFavoriteThunk,
  fetchDeleteFavThunk,
} from "../../../store/boards";

function FavoriteBoardPin({ pin, boardId, hasAuthToEdit }) {
  const dispatch = useDispatch();
  const { username } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  const [numFavorites, setNumFavorites] = useState(pin?.favorites?.length);
  const [isFavorited, setIsFavorited] = useState(pin?.sessionIsFavorited);
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
      <p className="pin-fav-title">{pin.title}</p>
      <div className="stars-container">
        <p>{numFavorites > 0 ? numFavorites : ""}</p>
        <div onClick={handleStarClick}>
          {isFavorited ? (
            <i id="s-stars" className="fa-solid fa-star"></i>
          ) : (
            <i id="s-stars" className="fa-regular fa-star"></i>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoriteBoardPin;
