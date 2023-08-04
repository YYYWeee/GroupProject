import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deletePinThunk } from "../../../store/pins";
import "./DeletePinModal.css";

function DeletePinModal({pin}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const targetPin = useSelector((state) =>
    state.pins.singlePin ? state.pins.singlePin : {}
  );

  const handleDelete = async () => {
    await dispatch(deletePinThunk(targetPin.id));
    closeModal();
    history.push(`/pins`);
  };



  return (
    <>
      <div className="delete-pin">
        <div className="del-title">Delete this Pin?</div>
        <div className="delete-content">
          Once you delete a Pin, you can't undo it!
        </div>
        <div className="del-p-btn">
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="del-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  )
}


export default DeletePinModal;
