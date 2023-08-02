import React, {useState, useEffect} from "react";
import {login} from "../../store/session";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useModal} from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [formErr, setFormErr] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);
  const {closeModal} = useModal();

  useEffect(() => {
    const errorsObj = {};

    if (!email) errorsObj.email = "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorsObj.email = "Please enter a valid email address";
    }
    setFormErr(errorsObj);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);
    const data = await dispatch(login({email, password}));
    if (data) {
      setErrors(data);
      return null;
    } else {
      closeModal();
      history.push("/pins");
      return null;
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();

    const email = "demo@aa.io";
    const password = "password";

    setFormErr({});
    setDidSubmit(true);

    await dispatch(login({email, password}));

    setErrors([]);
    closeModal();
    history.push("/pins");
  };

  const disabled = password.length < 6 ? true : null;

  return (
    <div className="log-wrap">
      <div className="welcome-sign">Welcome to PinThis</div>
      <form className="log-form" onSubmit={handleSubmit}>
        <ul>
          {errors?.map((error, idx) => (
            <li className="sign-err" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <label className="sign-label">
          Email
          <input
            className="sign-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {didSubmit && formErr.email && (
          <p className="sign-err">{formErr.email}</p>
        )}
        <label className="sign-label">
          Password
          <input
            className="sign-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {didSubmit && formErr.password && (
          <p className="sign-err">{formErr.password}</p>
        )}
        <button className="continue-btn" type="submit" disabled={disabled}>
          Log In
        </button>
        <button className="demo-btn" onClick={demoUser}>
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
