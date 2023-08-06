import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneBoardThunk } from "../../store/boards";
import SinglePin from "./SinglePin";
import "./Favorite.css";
import { fetchAllFavoritesThunk } from "../../store/favorites";

export default function Favorite() {
  const dispatch = useDispatch();
  const [showPins, setShowPins] = useState(true);
  const [star, setStar] = useState();
  const { boardId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const singleBoard = useSelector((state) => {
    return state.boards.singleBoard;
  });

  const favPins = useSelector((state) => state.favorites);

  const favPinsArr = Object.values(favPins);

  const favPinIds = Object.keys(favPins);

  console.log("this is single board!@!!", singleBoard);

  let canFav;
  if (
    singleBoard?.collaborators?.find(
      (collaborator) => collaborator.id === sessionUser.id
    )
  ) {
    canFav = true;
  } else {
    canFav = false;
  }

  let notAll;

  if (![1, 2, 3, 4, 5, 6].includes(singleBoard.id)) {
    notAll = true;
  } else {
    notAll = false;
  }

  useEffect(() => {
    dispatch(fetchOneBoardThunk(boardId));
  }, [dispatch, boardId]);

  // click All pins tab and get all pins in the board with their favoraite stats (for all board members) with each pin
  // the pin favorited by the session user has star filled
  const handleClickPins = async () => {
    if (!showPins) return;
    setShowPins(false);

    await dispatch(fetchAllFavoritesThunk(boardId));
  };

  // click Favoirted pins tab and get only the pins that is favorited by the session user and its correponding fav stats, star filled.
  const handleClickFav = () => {
    if (showPins) return;
    setShowPins(true);
  };
  return (
    <div>
      <h1>inside favorite component </h1>
      <div>
        <button onClick={handleClickFav}>All Pins</button>
        {canFav && notAll && (
          <button onClick={handleClickPins}>Favorited Pins</button>
        )}
      </div>
      {showPins ? (
        <div className="pin-card">
          {singleBoard.associated_pins?.map((pin) => (
            <SinglePin key={pin.id} pin={pin} boardId={singleBoard.id} />
          ))}
        </div>
      ) : favPinsArr.length > 0 ? (
        <div className="pin-card">
          {favPinsArr?.map((pin) => (
            <SinglePin
              key={pin.id}
              pin={pin}
              boardId={boardId}
              favPinIds={favPinIds}
            />
          ))}
        </div>
      ) : (
        <div>Favorite pins to this board!</div>
      )}
    </div>
  );
}
