import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const ulRef1 = useRef();

  const openUserMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
    window.scrollTo(0, 0);
  };

  const handleClickUser = async (e) => {
    history.push(`/${user.username}`);
    window.scrollTo(0, 0);
  };

  const closeMenu = () => {
    setShowMenu(false);
    window.scrollTo(0, 0);
  };

  const profileArrowDirection = showMenu ? "up" : "down";
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  useEffect(() => {
    if (!showMenu) return;

    // const closeMenu = (e) => {
    //   if (!ulRef1.current.contains(e.target)) {
    //     setShowMenu(false);
    //   }
    // };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      {user ? (
        <div className="header-right-container when-log-in">
          <button
            onClick={handleClickUser}
            className="user-icon-container cursor"
          >
            {user.photo_url ? (
              <img
                src={user.photo_url}
                alt="No creator preview"
                className="sessionuser-img a85"
              ></img>
            ) : (
              <img
                className="nav-user-pic a85"
                src="https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg"
                alt=""
              />
            )}
          </button>
          <button
            onClick={openUserMenu}
            className="menu-arrow cursor btn-animation"
          >
            <i
              className={`fa-solid fa-chevron-${profileArrowDirection} arrow`}
            ></i>
          </button>

          <ul className={ulClassName} ref={ulRef1}>
            <div className="current">Currently in</div>
            <div className="profile-user-card cursor" onClick={handleClickUser}>
              <img
                src={
                  user.photo_url
                    ? user.photo_url
                    : "https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg"
                }
                alt="No creator preview"
                className="user-menu-img"
              ></img>
              <div>
                {user.first_name && user.last_name ? (
                  <p className="usermenu-username">
                    {user.first_name} {user.last_name}
                  </p>
                ) : (
                  <p className="usermenu-username">{user.username}</p>
                )}
                <p>{user.email}</p>
              </div>
              <i className="fa-solid fa-check"></i>
            </div>
            <div className="user-menu-options">
              {/* <button onClick={() => alert("Feature coming soon!")}>
                Settings
              </button> */}
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </ul>
        </div>
      ) : (
        <div className="header-right-container">
          <div className="nav-github cursor">
            <a href="https://github.com/YYYWeee/GroupProject" className="git">
              Github
            </a>
          </div>
          <OpenModalButton
            buttonText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </div>
      )}
    </>
  );
}

export default ProfileButton;
