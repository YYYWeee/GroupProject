import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchOneBoardThunk} from "../../../store/boards";

import "./SingleBoard.css";

export default function SingleBoardDetails() {
  const dispatch = useDispatch();
  const {boardId} = useParams();

  const singleBoard = useSelector((state) => {
    return state.boards.singleBoard;
  });

  console.log("this is single board!@!!", singleBoard);

  useEffect(() => {
    dispatch(fetchOneBoardThunk(boardId));
  }, [dispatch, boardId]);

  if (!singleBoard) return null;

  return (
    <div>
      <div className="b-details">
        <div className="b-name-btn">
          <div>{singleBoard.name}</div>
          <button>...</button>
        </div>

        <div>{singleBoard.description}</div>
      </div>
    </div>
  );
}
