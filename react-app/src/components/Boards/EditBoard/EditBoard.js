import "./EditBoard.css";
import React, { useState,useEffect} from "react";
import { useDispatch,useSelector  } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchEditBoardThunk } from "../../../store/boards";
import { useModal } from "../../../context/Modal";
import { fetchAllUsersThunk } from "../../../store/session";
import InviteCollaborator from "../InviteCollaboratorsModal/InviteCollaboratorsModal";
import OpenModalButton from "../../OpenModalButton";


export default function EditBoard({board}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name,setName] = useState(board.name);
  const [is_secret,setIs_secert] = useState(board.is_secret);
  const [description,setDescription] = useState(board.description?board.description : '');
  const [collaborators,setCollaborators] = useState(board.collaborators? board.collaborators : []);//board doesn't have a collaborator column. must find a way to get collaborators.
  const [errors,setErrors] = useState({});
  const [isCollaboratorModalOpen,setIsCollaboratorModalOpen] = useState(false);
  const { closeModal } = useModal();

  const currentUser = useSelector((state) => state.session.user);
  
 

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
  const handleCollaboratorDataFromModal = (data) =>{
    setIsCollaboratorModalOpen(false)
    setCollaborators(data.map(item=>item.id))
  }


  const handleSubmit = async (e) =>{
    
    e.preventDefault();
    let newErrors = validationErrors();
    setErrors(newErrors)
    if(Object.keys(newErrors).length > 0){
      return;
    }
    setErrors({});
    
    console.log('modify col',collaborators)

    const updateBoard = {...board,name,is_secret,description,collaborators}
    const data = await dispatch(fetchEditBoardThunk(updateBoard));
    closeModal();
    history.push(`/${currentUser.username}/board/${data.id}`);
  }

  

  return (
    <div id="edit-board-modal-outer-container" className="modal-container">
       <div className="form-container-edit-board">
    <p className="edit-board-title">Edit your Board</p>
    <form onSubmit={handleSubmit}>
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
      
      <label id="edit-board-collaborator-label">
        <p>Collaborators</p>
        {/* <OpenModalButton
                buttonText="+"
                modalComponent={<InviteCollaborator board={board} onClose={handleCollaboratorDataFromModal}/>}
              /> */}
              <div id='edit-board-images-container'>
                <div className="edit-board-images-container-single"><img src={currentUser?.photo_url} className="edit-board-user-image"/></div>
                {collaborators.map((collaborator)=>(
                  <div className="edit-board-images-container-single"><img src={collaborator?.photo_url} className="edit-board-user-image"/></div>
                ))}
              </div>
              <button type="button" onClick={()=>setIsCollaboratorModalOpen(!isCollaboratorModalOpen)}>+</button>
              <>{isCollaboratorModalOpen && <InviteCollaborator isOpen={isCollaboratorModalOpen} onClose={handleCollaboratorDataFromModal} board={board}/>}</>
             
      </label>
      
        <div id='edit-board-submit-button-container'><button type='submit' disabled={!!Object.keys(errors).length} id="edit-board-submit-button">Done</button></div>
    </form>
  </div>

    </div>
   
  );
}
