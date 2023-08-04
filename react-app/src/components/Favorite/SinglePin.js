import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
  fetchAddFavoriteThunk,
  fetchAllFavoritesThunk,
} from "../../store/favorites";
import {fetchDeleteFavThunk} from "../../store/favorites";

function SinglePin({pin, boardId, favPinIds}) {
  const dispatch = useDispatch();
  const [visible1, setVisible1] = useState(favPinIds?.includes(pin.id));

  const handleStarClick = async () => {
    setVisible1(!visible1);

    const favoriteData = {
      board_id: boardId,
      pin_id: pin.id,
    };

    if (visible1) {
      await dispatch(fetchDeleteFavThunk(boardId, pin.id));
      await dispatch(fetchAllFavoritesThunk(boardId));
    } else {
      console.log("inside create fav");
      const newFav = await dispatch(fetchAddFavoriteThunk(favoriteData));
    }
  };

  return (
    <div>
      <div class="p-link">
        <Link to={`/pins/${pin.id}`}>
          <img
            src={pin.image_url ? pin.image_url : "no preview img"}
            alt="No pin preview"
            className="pin-fav-img"
          ></img>
        </Link>
      </div>
      <div onClick={handleStarClick}>
        {visible1 ? (
          <i id="s-stars" className="fa-solid fa-star"></i>
        ) : (
          <i id="s-stars" className="fa-regular fa-star"></i>
        )}
      </div>
    </div>
  );
}

export default SinglePin;
