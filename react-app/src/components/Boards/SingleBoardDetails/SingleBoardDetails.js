import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchOneBoardThunk } from "../../../store/boards";
import OpenModalButton from "../../OpenModalButton";
import EditBoard from "../EditBoard";
import DeleteBoard from "../DeleteBoard";
import CollaboratorModal from "../CollaboratorModal";

import "./SingleBoard.css";

export default function SingleBoardDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { boardId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef1 = useRef();
  const sessionUser = useSelector((state) => state.session.user);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const openUserMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const singleBoard = useSelector((state) => {
    return state.boards.singleBoard;
  });

  console.log("this is single board!@!!", singleBoard);

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
  if (!singleBoard.collaborators) return null;

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
          <div className="profile-pic-list" onClick={toggleModal}>
            {/* <div className="creator pic"> */}
            <img
              src={
                sessionUser?.photo_url
                  ? sessionUser?.photo_url
                  : "no preview img"
              }
              alt="No user profile"
              className="creator-img cursor"
            ></img>
            {/* </div> */}

            <div className="collaborator-list" onClick={toggleModal}>
              {singleBoard.collaborators.map((user, index) => (
                <div key={index} className="creator-img ">
                  <img
                    src={user.photo_url ? user.photo_url : "no preview img"}
                    alt="No pin preview"
                    className="creator-img "
                  ></img>
                </div>
              ))}
            </div>

            {modal && (
              <CollaboratorModal isOpen={modal} onClose={toggleModal} />
            )}
          </div>
          <div className="secret-text">
            {singleBoard.is_secret === true && (
              <p>
                <i className="fa-solid fa-lock"></i>Secret Board
              </p>
            )}
          </div>
        </div>
      </div>
      {/* display all the pic of specific bord */}
      <div className="detail-container">
        {singleBoard.associated_pins.map((pin, index) => (
          <div
            key={index}
            className="pin-img-div "
            onClick={() => history.push(`/pins/${pin.id}`)}
          >
            <img
              src={pin?.image_url ? pin.image_url : "no preview img"}
              alt="No pin preview"
              className="pin-img-board-page"
            ></img>
          </div>
        ))}
      </div>
      {/* end */}
    </div>
  );
}
