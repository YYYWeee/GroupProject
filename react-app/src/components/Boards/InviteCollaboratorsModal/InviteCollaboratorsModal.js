import './InviteCollaboratorsModal.css'
import React, { useState,useEffect} from "react";
import { useDispatch,useSelector  } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { fetchAllUsersThunk } from "../../../store/session";

export default function InviteCollaborator({board,onClose,isOpen}) {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const [collaborators,setCollaborators] = useState(board.collaborators? board.collaborators : []);
    const { closeModal } = useModal();
    const allUsers = useSelector(state => state.session.allUsers?.users);
    console.log('co',collaborators)
    


    useEffect(()=>{
        dispatch(fetchAllUsersThunk());
      },[]);
      if(!isOpen){
        return null;
    }

    if(allUsers ===undefined||allUsers.length===0){
        return(<div><p>Loading</p></div>)
    }

    const handleAddCollaborator = (user) =>{
        if(!collaborators.some(col => col.id ===user.id)){
            setCollaborators([...collaborators,user]);

        }
    }

    const handleSubmit = () =>{
       onClose(collaborators)
    //    closeModal()

    }

    return(
        <div id="collaborators-modal-container">
        <ol id="collaborators-list">
        {allUsers.map((user)=>(
            <li key={user.id} className='single-user-container'>
                <div className="collaborator-user-image-container">
                <img src = {user.photo_url?user.photo_url:'https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg'} alt={user.username} className="collaborator-user-image"/>
                </div>
                <p>{user.username}</p>
                <button type='button' onClick = {()=>handleAddCollaborator(user)}>Invite</button>
               
            </li>


))}

        </ol>
        <button onClick={handleSubmit}>Done</button>
        
        </div>
    )


}