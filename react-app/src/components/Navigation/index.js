import React from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";
import ProfileButton from "./ProfileButton";
import NavBarLeftComponent from "./NavBarLeftComponent";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="header">
      <NavBarLeftComponent user={sessionUser} />
      {isLoaded && <ProfileButton user={sessionUser} />}
    </div>
  );
}

export default Navigation;
