
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Splash from "./Splash"
import "./LandingPage.css";

function LandingPage() {
  const history = useHistory();

  const handleExplore = async (e) => {
    e.preventDefault();
    history.push(`/pins`);
    console.log('button')
  };

  return (
    <>

      <nav class="navbar-Landing">
        <ul>
          {/* <li>1</li>
          <li>2</li>
          <li><a href="#first-container">first</a></li>
          <li><a href="#second-container">second</a></li>
          <li><a href="#third-container">third</a></li> */}
        </ul>
        <button class="navbar-toggler">
          <span></span>
        </button>
      </nav>

      <div className="intro">
        <Splash />
      </div>
      <div id="first-container" className="container"><h2>Save ideas you like</h2></div>
      <div id="second-container" className="container">
        <h2>See it, make it, try it, do it<a href="/pins" className="explore">explore</a></h2>
        <div className="button-container">
          {/* <button type="submit" className="explore" onClick={handleExplore}>Explore</button> */}
          {/* <a href="/pins" className="explore">explore</a> */}

        </div>
      </div>
      <div id="third-container" className="container">
        <div className="left">
          <div className="sign-up-left-text">
            {/* <div className="signup1">Sign up to get your idea</div> */}
            <h2 className="signup1">Sign up to get your idea</h2>
          </div>
        </div>
        <div className="right">
          <SignupFormModal />
        </div>
      </div>

    </>
  )
}

export default LandingPage;
