import "./CreateBoard.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchCreateBoardThunk } from "../../../store/boards";

export default function CreateBoard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [is_secret, setIs_secert] = useState(false);
  const [errors, setErrors] = useState({});
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    let errors = {};
    if (name.length === 0) {
      errors.name = "Don't forget to name your board!";
    }
    if (name.length > 50) {
      errors.name = "Please enter no more than 50 characters.";
    }
    setErrors(errors);
  }, [name]);

  const validationErrors = () => {
    let errors = {};
    if (name.length === 0) {
      errors.name = "Don't forget to name your board!";
    }
    if (name.length > 50) {
      errors.name = "Please enter no more than 50 characters.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = validationErrors();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setErrors({});

    const newBoard = { name, is_secret };
    const data = await dispatch(fetchCreateBoardThunk(newBoard));
    history.push(`/${currentUser.username}/board/${data.id}`);
  };

  return (
    <div className="create-board-form-page">
      <div className="form-container-create-board">
        <p className="create-board-title">Create Board</p>
        <form onSubmit={handleSubmit} id="create-board-form">
          <label id="create-board-name-label">
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Like:'Place to Go' or 'Recipes to Make"
            ></input>
            {errors.name && (
              <div className="errors">
                <i class="fa-solid fa-triangle-exclamation"></i>
                {errors.name}
              </div>
            )}
          </label>
          <label id="create-board-secret-label">
            <input
              type="checkbox"
              checked={is_secret}
              onChange={(e) => setIs_secert(e.target.checked)}
            ></input>
            <div>
              <p>Keep this board secret</p>
              <p>So only you and collaborators can see it.</p>
            </div>
          </label>
          <div id="create-board-submit-button-container">
            <button
              type="submit"
              disabled={!!Object.keys(errors).length}
              id="create-board-submit-button"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
