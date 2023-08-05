import './ShowCollaboratorModal.css'
import React, { useState,useEffect} from "react";
import { useDispatch,useSelector  } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { fetchAllUsersThunk } from "../../../store/session";
import EditBoard from "../EditBoard";
import EditBoardModalHelper from "../EditBoardModalHelper/EditBoardModalHelper";


export default function ShowCollaboratorModal({board}) {
    
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.session.allUsers?.users);
    const owner = allUsers? allUsers.find(user => user.id === board.owner_id):{};
    const collaborators = board.collaborators.filter(collaborator=>collaborator.id!==board.owner_id)
    
    


    useEffect(()=>{
        dispatch(fetchAllUsersThunk());
      },[]);

    

      

 

    

    

    return(
      <div id="collaborators-modal-container">
      <EditBoardModalHelper
         className="open-edit-board"
         itemText={<div id='invite-collaborator-back-icon'><i className="fa-solid fa-chevron-left"></i></div>}
         // onModalClose = {handleCollaboratorDataFromModal} 
         modalComponent={<EditBoard key={board.lastUpdated} board={board}/>}
       />
       <div id='invite-collaborator-title-container'><div id='invite-collaborator-title'>Collaborators</div></div>

       <div className="show-collaborator-content">
        <p style={{fontSize: '12px'}}>You can...</p>
        <h1>Save and comment</h1>
        <p>Save Pins, organize them, comment, and react. For more permissions, reach out to the board owner!</p>
       </div>
       <p id='show-collaborators-list-title'>Collaborators</p>
       
 <ol id="collaborators-list">
     <div className='single-user-container-owner'>
     <div className="collaborator-user-image-container">
         <img src = {owner?.photo_url? owner.photo_url:'https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg'} alt={owner?.username} className="collaborator-user-image"/>
         
         </div>
         <p>{owner?.username}</p>
     </div>
 {collaborators?.map((user)=>(
     <li key={user.id} className='single-user-container-with-button'>
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
 
 </div>
)


    
        

}