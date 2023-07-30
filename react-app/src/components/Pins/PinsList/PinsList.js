import "./PinsList.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPinsThunk } from "../../../store/pins";

import PinsListCard from "./PinsListCard";

function PinsList() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const pins = Object.values(
    useSelector((state) => (state.pins.allPins ? state.pins.allPins : {}))
  );

  useEffect(() => {
    dispatch(fetchAllPinsThunk()).then(setIsLoaded(true));
    window.scroll(0, 0);
  }, [dispatch]);

  return isLoaded === false ? (
    <h1>Loading in progress</h1>
  ) : (
    <div className="pin-list-container">
      {pins.map((pin) => (
        <PinsListCard key={pin.id} pin={pin} />
      ))}
    </div>
  );
}

export default PinsList;
