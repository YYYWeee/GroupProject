import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import {signUp} from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [formErr, setFormErr] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);
  const {closeModal} = useModal();

  useEffect(() => {
    const errorsObj = {};
    if (!username) errorsObj.username = "Username is required";
    if (!email) errorsObj.email = "Email is required";
    if (!firstName) errorsObj.firstName = "First name is required";
    if (!password) errorsObj.password = "Password is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorsObj.email = "Please enter a valid email address";
    }

    if (username.length < 4)
      errorsObj.username = "Username must be at least 4 characters";
    if (password.length < 6)
      errorsObj.password = "Password must be at least 6 characters";

    setFormErr(errorsObj);
  }, [username, email, firstName, lastName, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);
    console.log("email", email);
    console.log("username", username);
    console.log("firstName", firstName);
    console.log("lastName", lastName);
    console.log("errors", Object.values(formErr));

    if (password === confirmPassword) {
      setFormErr({});
      const data = await dispatch(
        signUp({
          email: email.toLowerCase(),
          username,
          first_name: firstName,
          last_name: lastName,
          password,
        })
      );
      if (data) {
        console.log("data", data);
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };
  const disabled = password.length < 6 ? true : null;

  return (
    <div className="sign-wrap">
      <h1 className="welcome-sign">Welcome to PinThis</h1>
      <div className="new-ideas">Find new ideas to try</div>
      <form className="sign-form" onSubmit={handleSubmit}>
        <ul>
          {didSubmit &&
            errors.map((error, idx) => (
              <li className="the-errors" key={idx}>
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
            required
          />
        </label>
        {didSubmit && formErr.email && (
          <p className="sign-err">{formErr.email}</p>
        )}
        <label className="sign-label">
          Username
          <input
            className="sign-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {didSubmit && formErr.username && (
          <p className="sign-err">{formErr.username}</p>
        )}

        <label className="sign-label">
          First Name
          <input
            className="sign-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {didSubmit && formErr.firstName && (
          <p className="sign-err">{formErr.firstName}</p>
        )}
        <label className="sign-label">
          Last Name
          <input
            className="sign-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className="sign-label">
          Password
          <input
            className="sign-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {didSubmit && formErr.password && (
          <p className="sign-err">{formErr.password}</p>
        )}
        <label className="sign-label">
          Confirm Password
          <input
            className="sign-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="continue-btn" disabled={disabled} type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
