import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchOneBoardThunk} from "../../store/boards";
import SinglePin from "./SinglePin";
import "./Favorite.css";
import {fetchAllFavoritesThunk} from "../../store/favorites";

export default function Favorite() {
  const dispatch = useDispatch();
  const [showPins, setPins] = useState(true);
  const [star, setStar] = useState();
  const {boardId} = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const singleBoard = useSelector((state) => {
    return state.boards.singleBoard;
  });

  const favPins = useSelector((state) => state.favorites);

  const favPinsArr = Object.values(favPins);

  const favPinIds = Object.keys(favPins);

  console.log("this is single board!@!!", singleBoard);

  console.log("this is single board collab", singleBoard.collaborators);

  const isBoardUser = (id, arr) => {
    for (let obj of arr) {
      if (obj.id === id) {
        return true;
      }
    }
    return false;
  };

  const seeFav = isBoardUser(sessionUser.id, [{id: 1}]);

  console.log("seeFave", seeFav);

  useEffect(() => {
    dispatch(fetchOneBoardThunk(boardId));
  }, [dispatch, boardId]);

  const handleClickPins = async () => {
    if (!showPins) return;
    setPins(false);

    await dispatch(fetchAllFavoritesThunk(boardId));
  };

  const handleClickFav = () => {
    if (showPins) return;
    setPins(true);
  };
  return (
    <div>
      <h1>inside favorite component </h1>
      <div>
        <button onClick={handleClickFav}>All Pins</button>
        <button onClick={handleClickPins}>Favorited Pins</button>
      </div>
      {showPins ? (
        <div className="pin-card">
          {singleBoard.associated_pins?.map((pin) => (
            <SinglePin key={pin.id} pin={pin} boardId={singleBoard.id} />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}
