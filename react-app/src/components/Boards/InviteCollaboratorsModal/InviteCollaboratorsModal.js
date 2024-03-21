import "./InviteCollaboratorsModal.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { fetchAllUsersThunk } from "../../../store/session";
import EditBoard from "../EditBoard";
import EditBoardModalHelper from "../EditBoardModalHelper/EditBoardModalHelper";
import {
  fetchAddBoardCollaborator,
  fetchOneBoardThunk,
} from "../../../store/boards";

export default function InviteCollaborator({ board, isInDetailPage }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [collaborators, setCollaborators] = useState(
    board.collaborators ? board.collaborators : []
  );
  const initialInvitedUsers = board.collaborators
    ? board.collaborators.reduce((acc, user) => {
      acc[user.id] = true;
      return acc;
    }, {})
    : {};
  const [InvitedUsers, setInvitedUsers] = useState(initialInvitedUsers);
  const allUsers = useSelector((state) => state.session.allUsers?.users);
  const otherUsers = allUsers
    ? allUsers.filter((allUser) => allUser.id !== board.owner_id)
    : [];
  const owner = allUsers
    ? allUsers.find((user) => user.id === board.owner_id)
    : {};

  useEffect(() => {
    dispatch(fetchAllUsersThunk());
  }, []);

  useEffect(() => {
    if (collaborators) {
      const collaboratorId = collaborators.map((item) => item.id);
      const update_board = { ...board, collaborators: collaboratorId };
      dispatch(fetchAddBoardCollaborator(update_board)).then(() =>
        dispatch(fetchOneBoardThunk(board.id))
      );
    }
  }, [collaborators]);

  if (allUsers === undefined || allUsers.length === 0) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  const handleAddCollaborator = (user) => {
    if (!collaborators.some((col) => col.id === user.id)) {
      setCollaborators([...collaborators, user]);
      setInvitedUsers({ ...InvitedUsers, [user.id]: true });
    }
  };

  return (
    <div id="collaborators-modal-container">
      {!isInDetailPage && (
        <EditBoardModalHelper
          className="open-edit-board"
          itemText={
            <div id="invite-collaborator-back-icon">
              <i className="fa-solid fa-chevron-left go-back-invite"></i>
            </div>
          }
          // onModalClose = {handleCollaboratorDataFromModal}
          modalComponent={<EditBoard key={board.lastUpdated} board={board} />}
        />
      )}
      <div id="invite-collaborator-title-container">
        <div id="invite-collaborator-title">Invite Collaborators</div>
      </div>

      <ol id="collaborators-list">
        <div
          className="single-user-container-owner"
          onClick={() => {
            closeModal();
            history.push(`/${owner.username}`);
          }}
        >
          <div className="collaborator-user-image-container">
            <img
              src={
                owner?.photo_url
                  ? owner.photo_url
                  : "https://flavoreatsbucket.s3.us-west-2.amazonaws.com/profile-icon.jpeg"
              }
              alt={owner?.username}
              className="collaborator-user-image"
            />
          </div>
          <p>{owner?.username}</p>
        </div>
        {otherUsers.map((user) => (
          <li key={user.id} className="single-user-container-with-button">
            <div className="single-user-container">
              <div
                className="collaborator-user-image-container"
                onClick={() => {
                  closeModal();
                  history.push(`/${user.username}`);
                }}
              >
                <img
                  src={
                    user.photo_url
                      ? user.photo_url
                      : "https://flavoreatsbucket.s3.us-west-2.amazonaws.com/profile-icon.jpeg"
                  }
                  alt={user.username}
                  className="collaborator-user-image"
                />
              </div>
              <p>{user.username}</p>
            </div>

            <button
              type="button"
              onClick={() => handleAddCollaborator(user)}
              disabled={InvitedUsers[user.id]}
              className="collaborator-invite-button a85"
            >
              {InvitedUsers[user.id] ? "Invited" : "Invite"}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
