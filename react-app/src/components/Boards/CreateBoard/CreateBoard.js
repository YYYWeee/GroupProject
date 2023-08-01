import React, { useState,useEffect} from "react";
import { useDispatch,useSelector  } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchCreateBoardThunk } from "../../../store/boards";


export default function CreateBoard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name,setName] = useState('');
  const [is_secret,setIs_secert] = useState(false);
  const [errors,setErrors] = useState({});
  const currentUser = useSelector((state) => state.session.user);

  useEffect(()=>{
    let errors = {};
    if(name.length === 0) {
      errors.name = "Don't forget to name your board!"
    }
    if(name.length > 50){
      errors.name = "Please enter no more than 50 characters."
    }
    setErrors(errors);
  },[name])
  
  const validationErrors = () =>{
    let errors = {};
    if(name.length === 0) {
      errors.name = "Don't forget to name your board!"
    }
    if(name.length > 50){
      errors.name = "Please enter no more than 50 characters."
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

    const newBoard = {name,is_secret}
    const data = await dispatch(fetchCreateBoardThunk(newBoard));
    history.push(`/${currentUser.username}/board/${data.id}`)
  }


  return (
    <div>
      <h1>Create Board</h1>
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
        <button type='submit' disabled={!!Object.keys(errors).length}>Create</button>
      </form>
    </div>
  );
}
