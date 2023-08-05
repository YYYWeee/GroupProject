import "./EditBoard.css";
import React, { useState,useEffect} from "react";
import { useDispatch,useSelector  } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchEditBoardThunk,fetchOneBoardThunk } from "../../../store/boards";
import { useModal } from "../../../context/Modal";
import InviteCollaborator from "../InviteCollaboratorsModal/InviteCollaboratorsModal";
import EditBoardModalHelper from "../EditBoardModalHelper/EditBoardModalHelper";
import { fetchAllUsersThunk } from "../../../store/session"; 
import ShowCollaboratorModal from "../ShowCollaboratorModal/ShowCollaboratorModal";


export default function EditBoard({board}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name,setName] = useState(board.name);
  const [is_secret,setIs_secert] = useState(board.is_secret);
  const [description,setDescription] = useState(board.description?board.description : '');
  const [collaborators,setCollaborators] = useState(board.collaborators? board.collaborators.filter(collaborator=>collaborator.id!==board.owner_id) : []);
  const [errors,setErrors] = useState({});
  const { closeModal } = useModal();
  
  const allUsers = useSelector(state => state.session.allUsers?.users);
  const owner = allUsers? allUsers.find(user => user.id === board.owner_id):{};
  const currentUser = useSelector((state) => state.session.user);
  const newest_board = useSelector((state) => state.boards.singleBoard)


  useEffect(()=>{
    dispatch(fetchAllUsersThunk());
  },[]);
  
  let isOwner;
  if(currentUser.id===board.owner_id){
    isOwner = true;
  }else{
    isOwner = false;
  }

  
 
 

  useEffect(()=>{
    let errors = {};
    if(name.length === 0) {
      errors.name = "Don't forget to name your board!"
    }
    if(name.length > 50){
      errors.name = "Please enter no more than 50 characters."
    }
    if(description.length > 500){
      errors.description = "Please enter no more than 500 characters."
    }
    setErrors(errors);
  },[name,description])

  useEffect(() => {
    if(newest_board){
      if(newest_board.id===board.id){
        setCollaborators(newest_board.collaborators.filter(collaborator=>collaborator.id!==board.owner_id))
      }
  
    }
}, [dispatch, newest_board]);

  const validationErrors = () =>{
    let errors = {};
    if(name.length === 0) {
      errors.name = "Don't forget to name your board!"
    }
    if(name.length > 50){
      errors.name = "Please enter no more than 50 characters."
    }
    if(description.length > 500){
      errors.description = "Please enter no more than 500 characters."
    }
    return errors
  }

  // const handleCollaboratorDataFromModal = (data) =>{
  //   console.log('handleCollaboratorDataFromModal is called',data);
  //   setIsCollaboratorModalOpen(false)
  //   setCollaborators(data.map(item=>item.id))
  // }


  const handleSubmit = async (e) =>{
  
    
    e.preventDefault();
    let newErrors = validationErrors();
    setErrors(newErrors)
    if(Object.keys(newErrors).length > 0){
      return;
    }
    setErrors({});
    delete board.collaborators;
    

    const updateBoard = {...board,name,is_secret,description}
    const data = await dispatch(fetchEditBoardThunk(updateBoard));
    dispatch(fetchOneBoardThunk(board.id))
    closeModal();
    history.push(`/${currentUser.username}/board/${data.id}`);
  }
  
  const handleNotOwnerSubmit = () =>{
     closeModal();
     history.push(`/${currentUser.username}/board/${board.id}`);
  }
  

  return (
    <div id="edit-board-modal-outer-container" className="modal-container">
       <div className="form-container-edit-board">
    <p className="edit-board-title">Edit your Board</p>
    <form onSubmit={handleSubmit}>
      {isOwner &&<div>
        <label id="edit-board-name-label">
        <p>Name</p>
         
        <input type = 'text' value = {name} onChange = {e=>setName(e.target.value)} placeholder="Like:'Place to Go' or 'Recipes to Make">
        </input>
        {errors.name && <div className="errors">{errors.name}</div>}
      </label>
      <label id='edit-board-description-label'>
        <p>Description</p>
        {errors.description && <div className="errors">{errors.description}</div>}
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What's your board about?"></textarea>
      </label>
      <label id="edit-board-secret-label">
        <input type = 'checkbox' checked = {is_secret} onChange = {e=>setIs_secert(e.target.checked)}>
          
          
          </input>
          <div><p>Keep this board secret</p>
          <p>So only you and collaborators can see it.</p></div>
          
        </label>
        </div>}
      
      
      <label id="edit-board-collaborator-label">
        <p>Collaborators</p>

              <div id="edit-board-collaborator-avatar-modal-container">
              <div id='edit-board-all-user-avatar-container'>
          
          <div className="edit-board-images-container-single"><img src={owner?.photo_url} className="edit-board-user-image"/></div>
          {collaborators.map((collaborator)=>(
            <div className="edit-board-images-container-single"><img src={collaborator.photo_url?collaborator.photo_url:'https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg'} className="edit-board-user-image"/></div>
          ))}
       
        


        </div>
        {!isOwner&&<div id="edit-board-collaborator-modal-container">
        <EditBoardModalHelper
          className="open-collaborator-invite"
          itemText={<div className="edit-board-add-collaborator-button-container"><i class="fa-solid fa-plus"></i></div>}

          modalComponent={<ShowCollaboratorModal board={newest_board.id===board.id?newest_board:board}/>}
        />

        </div>}
        {isOwner && <div id="edit-board-collaborator-modal-container">
        <EditBoardModalHelper
          className="open-collaborator-invite"
          itemText={<div className="edit-board-add-collaborator-button-container"><i class="fa-solid fa-plus"></i></div>}

          modalComponent={<InviteCollaborator board={newest_board.id===board.id?newest_board:board}/>}
        />

        </div>}
        
        

        
              </div>
              

             
      </label>
        {!isOwner && <div id="edit-board-owner-auth-reminder">{<div>Only the board's owner (<strong>{owner.username}</strong>) can manage the rest of its features</div>}</div>}
         {!isOwner && <div id='edit-board-submit-button-container'><button type='button' onClick={()=>handleNotOwnerSubmit()} id="edit-board-submit-button">Done</button></div>}
        {isOwner && <div id='edit-board-submit-button-container'><button type='submit' disabled={!!Object.keys(errors).length} id="edit-board-submit-button">Done</button></div>}
    </form>
  </div>

    </div>
   
  );
}
