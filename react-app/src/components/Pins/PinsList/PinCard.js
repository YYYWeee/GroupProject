import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import EditPin from "../EditPin";

function PinCard({
  pin,
  index,
  keysList,
  handleImageLoad,
  handleClickLink,
  forFavBoardPins,
}) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return showUpdateForm === true ? (
    <EditPin pin={pin} setShowUpdateForm2={setShowUpdateForm} />
  ) : (
    <>
      <div
        key={index}
        onClick={() => history.push(`/pins/${pin.id}`)}
        className={`card-container ${keysList[index]}`}
      >
        <img
          src={pin.image_url ? pin.image_url : "no preview img"}
          alt="No pin preview"
          onLoad={(e) => handleImageLoad(e, index)}
          className={`pin-card-img ${forFavBoardPins ? "zoom" : ""}`}
        ></img>
        {/* {imageRatios[index] && <p>h/w Ratio: {imageRatios[index]}</p>} */}
        {pin?.link && (
          <div className="img-link-container1 cursor">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <a href={pin?.link} className="img-link1" onClick={handleClickLink}>
              {pin?.link &&
                (new URL(pin?.link).hostname.startsWith("www.")
                  ? new URL(pin?.link).hostname.split(".")[1]
                  : new URL(pin?.link).hostname)}
            </a>
          </div>
        )}
        {sessionUser && pin.owner_id === sessionUser.id && (
          <div
            className="aa1"
            onClick={(e) => {
              e.stopPropagation();
              setShowUpdateForm(true);
            }}
          >
            <i className="fa-solid fa-pen-to-square fa-lg"></i>
          </div>
        )}
      </div>
    </>
  );
}

export default PinCard;
