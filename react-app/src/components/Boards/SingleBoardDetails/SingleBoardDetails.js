import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchOneBoardThunk } from "../../../store/boards";
import OpenModalButton from "../../OpenModalButton";
import EditBoard from "../EditBoard";
import DeleteBoard from "../DeleteBoard";
import CollaboratorModal from "../CollaboratorModal";
import PinsList from "../../Pins/PinsList/PinsList";
import PageNotFound from "../../PageNotFound";

import "./SingleBoard.css";
import BoardPinsList from "./BoardPinsList";
import FavPinsList from "./FavPinsList";
import LoadingPage from "../../LoadingPage";

export default function SingleBoardDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, boardId } = useParams();
  const ulRef1 = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const [modal, setModal] = useState(false);
  const targetPins = useSelector(
    (state) => state.boards.singleBoard.associated_pins
  );

  const [showPins, setShowPins] = useState(true);
  const handleClickFavorite = () => {
    if (!showPins) return;
    setShowPins(false);
  };
  const handleClickAllPins = () => {
    if (showPins) return;
    setShowPins(true);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const singleBoard = useSelector((state) => {
    return state.boards.singleBoard;
  });
  const boardUser = useSelector((state) => {
    return state.boards.boardUser;
  });

  useEffect(() => {
    dispatch(fetchOneBoardThunk(boardId));
  }, [dispatch, boardId]);

  let isOwner;
  if (sessionUser && sessionUser?.id === singleBoard?.owner_id) {
    isOwner = true;
  } else {
    isOwner = false;
  }

  let hasAuthToEdit;
  if (
    sessionUser &&
    singleBoard?.collaborators?.find(
      (collaborator) => collaborator?.id === sessionUser?.id
    )
  ) {
    hasAuthToEdit = true;
  } else {
    hasAuthToEdit = false;
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const closeMenu = () => setShowMenu(false);
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef1.current && !ulRef1.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  if (!singleBoard || Object.keys(singleBoard).length === 0) {
    return <LoadingPage />;
  }

  // if (singleBoard && singleBoard.errors) return <PageNotFound />;
  // if (
  //   singleBoard?.collaborators &&
  //   boardUser &&
  //   !singleBoard.collaborators?.some(
  //     (collaborator) => collaborator.username === boardUser.username
  //   )
  // )
  //   return <PageNotFound />;

  // const favPins = singleBoard?.associated_pins.filter(
  //   (pin) => pin.sessionIsFavorited === true
  // );

  return (
    <>
      <div className="b-details">
        <div className="b-title">
          <div className="b-title-container truncate">
            {singleBoard.name}
            <div className="combine-btn-dropdown">
              {!singleBoard.is_default && hasAuthToEdit && (
                <i
                  className="fa-solid fa-ellipsis dots-btn a87"
                  onClick={openMenu}
                ></i>
              )}
              <div
                className={"dropdown-menu" + (showMenu ? "" : " hidden")}
                ref={ulRef1}
              >
                <div className="dropdown-title">Board options</div>
                <div className="create-item" onClick={closeMenu}>
                  {hasAuthToEdit && (
                    <OpenModalButton
                      buttonText="Edit Board"
                      onItemClick={closeMenu}
                      modalComponent={<EditBoard board={singleBoard} />}
                    />
                  )}
                </div>
                <div className="create-item" onClick={closeMenu}>
                  {isOwner && (
                    <OpenModalButton
                      buttonText="Delete Board"
                      onItemClick={closeMenu}
                      modalComponent={<DeleteBoard board={singleBoard} />}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="user-list">
            <div className="profile-pic-list" onClick={toggleModal}>
              {!singleBoard.is_default && (
                <div className="collaborator-list a87" onClick={toggleModal}>
                  {singleBoard?.collaborators?.map((user, index) => (
                    <div key={index} className="creator-img1 ">
                      <img
                        src={
                          user.photo_url
                            ? user.photo_url
                            : "https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg"
                        }
                        alt="No pin preview"
                        className="creator-img2 "
                      ></img>
                    </div>
                  ))}
                  {isOwner && (
                    <div className="creator-img1">
                      <i className="fa-solid fa-plus plus-collab"></i>
                    </div>
                  )}
                </div>
              )}

              {modal && (
                <CollaboratorModal isOpen={modal} onClose={toggleModal} />
              )}
            </div>
          </div>
          <div className="board-des">
            <div className="board-description">{singleBoard.description}</div>
          </div>
          {singleBoard.is_secret === true && (
            <div className="secret-text">
              <i className="fa-solid fa-lock secret2"></i>Secret Board
            </div>
          )}
        </div>
        {hasAuthToEdit && (
          <div className="board-created-container">
            {sessionUser.username === username && (
              <div className="board-created-btn">
                <button
                  onClick={handleClickFavorite}
                  className={`board-created a97 ${!showPins ? "focuss" : ""}`}
                >
                  Favorited
                </button>
              </div>
            )}

            <div className="board-created-btn">
              <button
                onClick={handleClickAllPins}
                className={`board-created a97 ${showPins ? "focuss" : ""}`}
              >
                Saved
              </button>
            </div>
          </div>
        )}
        {showPins ? (
          <>
            <div className="num-board-pins">
              {singleBoard?.associated_pins?.length}{" "}
              {singleBoard?.associated_pins?.length === 1 ? "Pin" : "Pins"}
            </div>
            <div className="user-pins-masonary">
              {singleBoard?.associated_pins?.length === 0 ? (
                "There aren't any Pins on this board yet"
              ) : (
                <BoardPinsList
                  pins={singleBoard?.associated_pins}
                  boardId={singleBoard?.id}
                  hasAuthToEdit={hasAuthToEdit}
                />
              )}
            </div>
          </>
        ) : (
          <div className="user-pins-masonary">
            <FavPinsList showFavs={true} />
          </div>
        )}
      </div>
    </>
  );
}
