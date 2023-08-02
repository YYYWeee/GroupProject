import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneBoardThunk } from "../../../store/boards";
import OpenModalButton from "../../OpenModalButton";
import EditBoard from "../EditBoard";
import DeleteBoard from "../DeleteBoard";

import "./SingleBoard.css";

export default function SingleBoardDetails() {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef1 = useRef();

  const openUserMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const singleBoard = useSelector((state) => {
    return state.boards.singleBoard;
  });

  console.log("this is single board!@!!", singleBoard);
  console.log("secret", singleBoard.is_secret)

  useEffect(() => {
    dispatch(fetchOneBoardThunk(boardId));
  }, [dispatch, boardId]);

  const closeMenu = () => setShowMenu(false);
  const ulClassName = "dropdown-menu" + (showMenu ? "" : " hidden");

  useEffect(() => {
    if (!showMenu) return;

    // const closeMenu = (e) => {
    //   if (!ulRef1.current.contains(e.target)) {
    //     setShowMenu(false);
    //   }
    // };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  if (!singleBoard) return null;

  return (
    <div>
      <div className="b-details">
        <div className="b-name-btn">
          <div className="b-title">{singleBoard.name}</div>
          <button className="dots-btn" onClick={() => setShowMenu(!showMenu)}>
            ...
          </button>
        </div>

        <div>{singleBoard.description}</div>
        {showMenu && (
          <div className={ulClassName} ref={ulRef1}>
            <ul>
              <OpenModalButton
                buttonText="Edit Board"
                onItemClick={closeMenu}
                modalComponent={<EditBoard board={singleBoard} />}
              />
              <OpenModalButton
                buttonText="Delete Board"
                onItemClick={closeMenu}
                modalComponent={<DeleteBoard board={singleBoard} />}
              />
            </ul>
          </div>
        )}
        <div className="user-list">
          <div className="profile-pic-list">

          </div>
          <div className="secret-text">{singleBoard.is_secret == true && (<p><i class="fa-solid fa-lock"></i>Secret Board</p>)}</div>
        </div>
      </div>
    </div>
  );
}
