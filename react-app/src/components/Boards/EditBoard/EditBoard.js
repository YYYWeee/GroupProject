import React, { useState,useEffect} from "react";
import { useDispatch,useSelector  } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchEditBoardThunk } from "../../../store/boards";
import { useModal } from "../../../context/Modal";


export default function EditBoard({board}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name,setName] = useState(board.name);
  const [is_secret,setIs_secert] = useState(board.is_secret);
  const [description,setDescription] = useState(board.description?board.description : '');
  const [collaborators,setCollaborators] = useState(board.collaborators? board.collaborators : '');
  const [errors,setErrors] = useState({});
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

  const handleSubmit = async (e) =>{
    
    e.preventDefault();
    let newErrors = validationErrors();
    setErrors(newErrors)
    if(Object.keys(newErrors).length > 0){
      return;
    }
    setErrors({});

    const updateBoard = {...board,name,is_secret,description,collaborators}
    const data = await dispatch(fetchEditBoardThunk(updateBoard));
    closeModal();
    history.push(`/${currentUser.username}/board/${data.id}`);
  }

  return (
    <div>
    <h1>Edit Board</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Name
         {errors.name && <div className="errors">{errors.name}</div>}
        <input type = 'text' value = {name} onChange = {e=>setName(e.target.value)}>
        </input>
      </label>
      <label>
        Keep this board secret
        <p>So only you and collaborators can see it.</p>
        <input type = 'checkbox' checked = {is_secret} onChange = {e=>setIs_secert(e.target.value)}>
        </input>
      </label>
      <label>
        Description
        {errors.description && <div className="errors">{errors.description}</div>}
        <input type = 'textarea' value = {description} onChange = {e=>setDescription(e.target.value)}>
        </input>
      </label>
      <label>
        Collaborators
        <input type = 'text' value = {collaborators} onChange = {e=>setCollaborators(e.target.value)}>
        </input>
      </label>
      <button type='submit' disabled={!!Object.keys(errors).length}>Create</button>
    </form>
  </div>
  );
}
