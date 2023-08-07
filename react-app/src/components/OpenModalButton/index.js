import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };
  console.log(buttonText);
  let btnClassName;
  if (buttonText === "Log In") {
    btnClassName = "login cursor";
  } else if (buttonText === "Save") {
    btnClassName = "save cursor";
  } else if (buttonText === "Sign Up") {
    btnClassName = "signup cursor";
  } else {
    btnClassName = "edit cursor";
  }

  // const btnClassName =
  //   buttonText === "Log In" ? "login cursor" : "signup cursor";
  return (
    <button onClick={onClick} className={btnClassName}>
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
