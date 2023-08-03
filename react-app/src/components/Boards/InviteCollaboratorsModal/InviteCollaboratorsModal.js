import './InviteCollaboratorsModal.css'
import React, { useState,useEffect} from "react";
import { useDispatch,useSelector  } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { fetchAllUsersThunk } from "../../../store/session";
import EditBoard from '../EditBoard';
import EditBoardModalHelper from '../EditBoardModalHelper/EditBoardModalHelper';
import { fetchAddBoardCollaborator,fetchOneBoardThunk } from '../../../store/boards';

export default function InviteCollaborator({board}) {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const [collaborators,setCollaborators] = useState(board.collaborators? board.collaborators : []);
    const initialInvitedUsers = board.collaborators? board.collaborators.reduce((acc, user) => {acc[user.id] = true; return acc;}, {}): {};
    const [InvitedUsers,setInvitedUsers] = useState(initialInvitedUsers)
    const { closeModal } = useModal();
    const allUsers = useSelector(state => state.session.allUsers?.users);
    const otherUsers =allUsers? allUsers.filter(allUser=>allUser.id !== board.owner_id):[]
    


    useEffect(()=>{
        dispatch(fetchAllUsersThunk());
      },[]);

      useEffect(()=>{
        if(collaborators){
            const collaboratorId = collaborators.map(item=>item.id)
            const update_board = {...board,collaborators:collaboratorId};
            dispatch(fetchAddBoardCollaborator(update_board))
            .then(() => dispatch(fetchOneBoardThunk(board.id)));
            
        }
    },[collaborators])

      

    if(allUsers ===undefined||allUsers.length===0){
        return(<div><p>Loading</p></div>)
    }

    const handleAddCollaborator = (user) =>{
        if(!collaborators.some(col => col.id ===user.id)){
            setCollaborators([...collaborators,user]);
            setInvitedUsers({...InvitedUsers,[user.id]:true})
            

        }
    }

    

    

    return(
        <div id="collaborators-modal-container">
             <EditBoardModalHelper
                className="open-edit-board"
                itemText="<"
                // onModalClose = {handleCollaboratorDataFromModal} 
                modalComponent={<EditBoard key={board.lastUpdated} board={board}/>}
              />
        <ol id="collaborators-list">
        {otherUsers.map((user)=>(
            <li key={user.id} className='single-user-container'>
                <div className="collaborator-user-image-container">
                <img src = {user.photo_url?user.photo_url:'https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg'} alt={user.username} className="collaborator-user-image"/>
                </div>
                <p>{user.username}</p>
                <button type='button' onClick = {()=>handleAddCollaborator(user)} disabled={InvitedUsers[user.id]}>Invite</button>
               
            </li>


))}

        </ol>
        
        </div>
    )


}