import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [formErr, setFormErr] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    const errorsObj = {};

    if (!email) errorsObj.logEmail = "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorsObj.logEmail = "Please enter a valid email address";
    }

    setFormErr(errorsObj);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);
    if (Object.keys(formErr).length === 0) {
      const data = await dispatch(login({ email, password }));
      if (data) {
        const flattenedData = {};
        data.forEach((item) => {
          const [key, value] = item.split(" : ");
          flattenedData[key.trim()] = value.trim();
        });
        setFormErr(flattenedData);
      } else {
        closeModal();
        history.push("/pins");
        return null;
      }
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();

    const email = "demo@aa.io";
    const password = "password";

    setFormErr({});
    setDidSubmit(true);

    await dispatch(login({ email, password }));

    setErrors([]);
    closeModal();
    history.push("/pins");
  };

  const disabled = password.length < 6 || email.length < 4 ? true : null;

  return (
    <div className="log-wrap">
      <img
        src="https://flavoreatsbucket.s3.us-west-2.amazonaws.com/pinlogo_copy.png"
        alt="PinThis"
        id="navigation-title-img"
      />
      <div className="welcome-sign">Welcome to PinThis</div>
      <form className="log-form" onSubmit={handleSubmit}>
        <label className="sign-label">
          Email
          <input
            className="sign-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {email.length < 4 && email.length > 0 && (
          <p className="sign-err">Please input a valid email</p>
        )}
        {didSubmit && formErr.email && (
          <p className="sign-err">{formErr.email}</p>
        )}
        {didSubmit && formErr.logEmail && (
          <p className="sign-err">{formErr.logEmail}</p>
        )}

        <label className="sign-label">
          Password
          <input
            className="sign-input"
            type={visible1 ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div onClick={() => setVisible1(!visible1)} className="pwicon">
            {visible1 ? (
              <i className="fa-regular fa-eye"></i>
            ) : (
              <i className="fa-regular fa-eye-slash"></i>
            )}
          </div>
        </label>
        {password.length < 6 && password.length > 0 && (
          <p className="sign-err">Password must be at least 6 characters.</p>
        )}
        {didSubmit && formErr.password && (
          <p className="sign-err">{formErr.password}</p>
        )}
        <button
          className={`continue-btn ${disabled ? "inactive" : ""}`}
          disabled={disabled}
          type="submit"
        >
          Log In
        </button>
        <button className="demo-btn" onClick={demoUser}>
          Demo User
        </button>
        <div className="on-pinthis">
          <div className="not-on">Not on PinThis yet?</div>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
