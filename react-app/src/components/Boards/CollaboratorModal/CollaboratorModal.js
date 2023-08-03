import React from 'react';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CollaboratorModal.css"



function CollaboratorModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const singleBoard = useSelector((state) => {
    return state.boards.singleBoard;
  });


  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div onClick={onClose} className="overlay"></div>
      <div className="modal-content">
        <div className='title-modal'>
          <h1>Collaborators</h1>
        </div>
        <div className='sub-title-modal'>
          <p>You can...</p>
          <h1>Do (almost) everything</h1>
          <p>Add, move or delete Pins and sections, comment and react</p>
        </div>


        <div className='collaborator-container'>
          <p>Collaborators</p>

          {singleBoard.collaborators.map((user, index) => (
            <div
              key={index}
              className="collaborator-info"
            >
              <img
                src={user.photo_url ? user.photo_url : "no preview img"}
                alt="No pin preview"
                className="creator-img "
              >

              </img>
              <p>{user.username}</p>
            </div>
          ))}
        </div>

      </div>
    </div>

  )
}


export default CollaboratorModal;
