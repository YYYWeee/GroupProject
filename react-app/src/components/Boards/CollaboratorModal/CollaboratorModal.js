import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./CollaboratorModal.css";
import { fetchAllUsersThunk } from "../../../store/session";
import InviteCollaborator from "../InviteCollaboratorsModal/InviteCollaboratorsModal";
import EditBoardModalHelper from "../EditBoardModalHelper/EditBoardModalHelper";

function CollaboratorModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const board = useSelector((state) => {
    return state.boards.singleBoard;
  });
  const sessionUser = useSelector((state) => state.session.user);
  const allUsers = useSelector(state => state.session.allUsers?.users);
  const owner = allUsers? allUsers.find(user => user.id === board.owner_id):{};
  const collaborators = board.collaborators.filter(collaborator=>collaborator.id!==board.owner_id)
  useEffect(()=>{
    dispatch(fetchAllUsersThunk());
  },[]);

  let isOwner;
  if(sessionUser.id===board?.owner_id){
    isOwner = true;
  }else{
    isOwner = false;
  }


  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div onClick={onClose} className="overlay"></div>
      <div className="modal-content">
        <div id="collaborators-modal-container">
       <div id='invite-collaborator-title-container'><div id='invite-collaborator-title'>Collaborators</div></div>

       <div className="show-collaborator-content">
        <p style={{fontSize: '12px'}}>You can...</p>
        <h1>Save and comment</h1>
        <p>Save Pins, organize them, comment, and react. For more permissions, reach out to the board owner!</p>
       </div>
       <p id='show-collaborators-list-title'>Collaborators</p>
       
 <ol id="collaborators-list">
     <div className='single-user-container-owner' onClick={() => history.push(`/${owner.username}`)}>
     <div className="collaborator-user-image-container" >
         <img src = {owner?.photo_url? owner.photo_url:'https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg'} alt={owner?.username} className="collaborator-user-image"/>
         
         </div>
         <p>{owner?.username}</p>
     </div>
 {collaborators?.map((user)=>(
     <li key={user.id} className='single-user-container-with-button'  onClick={() => history.push(`/${user.username}`)}>
         <div className='single-user-container'>
         <div className="collaborator-user-image-container">
         <img src = {user.photo_url?user.photo_url:'https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg'} alt={user.username} className="collaborator-user-image"/>
         </div>
         <p>{user.username}</p>

         </div>
         
         {<div></div>}
        
     </li>


))}

 </ol>
 {isOwner && <div id="edit-board-collaborator-modal-container-collaborator-modal">
        <EditBoardModalHelper
          className="open-collaborator-invite"
          itemText={<div id="detail-collaborator-modal-invite-button-container"><div className="edit-board-add-collaborator-button-container-red"><i class="fa-solid fa-plus"></i></div><p>Invite collaborators</p></div>}

          modalComponent={<InviteCollaborator board={board} isInDetailPage={true}/>}
        />

        </div>}
 
 </div>
      </div>
    </div>
  );
}

export default CollaboratorModal;
