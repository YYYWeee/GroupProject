import "./PinsList.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function PinsListCard({ pin }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const handleClick = () => {
    history.push(`/pins/${pin.id}`);
  };
  return (
    <div className="pin-list-card" onClick={handleClick}>
      <img
        src={pin.image_url ? pin.image_url : "no preview img"}
        alt="No pin preview"
        className="pin-card-img"
      ></img>
      {sessionUser ? <div>session user</div> : <div>no session</div>}
    </div>
  );
}

export default PinsListCard;
