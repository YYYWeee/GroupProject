import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { updatePinThunk } from "../../../store/pins";
import { deletePinThunk } from "../../../store/pins";
import "./EditPin.css";
import DeletePinModal from "../DeletePinModal";
import OpenModalButton from "../../OpenModalButton";

// function isValidUrl(str) {
//   const pattern = new RegExp(
//     "^([a-zA-Z]+:\\/\\/)?" + // protocol
//     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//     "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//     "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//     "(\\#[-a-z\\d_]*)?$", // fragment locator
//     "i"
//   );
//   return pattern.test(str);
// }

function isValidUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function EditPin({ pin, setShowUpdateForm2 }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef1 = useRef();
  const closeMenu = () => setShowMenu(false);

  const sessionUser = useSelector((state) => state.session.user);
  const targetPin = useSelector((state) =>
    state.pins.singlePin ? state.pins.singlePin : {}
  );

  useEffect(() => {
    setTitle(targetPin.title);
    setDescription(targetPin.description);
    setLink(targetPin.link);
    setAlt_text(targetPin.alt_text);
    setAllow_comment(targetPin.allow_comment); //default true
  }, [targetPin]);

  const [showUpdateForm, setShowUpdateForm] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [alt_text, setAlt_text] = useState("");
  const [allow_comment, setAllow_comment] = useState("");
  const [isValidLink, setIsValidLink] = useState(true);
  const [modal, setModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }

    if (link && !isValidUrl(link)) {
      setIsValidLink(false);
      return;
    }
    let payload = {
      title: title,
      description: description,
      link: link,
      alt_text: alt_text,
      allow_comment: allow_comment,
    };

    await dispatch(updatePinThunk(payload, targetPin.id));
    setShowUpdateForm(false);
    setShowUpdateForm2(false);
    history.push(`/pins/${targetPin.id}`);
  };
  const handleCancel = async (e) => {
    setShowUpdateForm2(false);
    // history.push(`/pins/${targetPin.id}`);
  };

  const handleCommentToggleChange = async (e) => {
    setAllow_comment((allow_comment) => !allow_comment);
    // Remember above may not show the updated value because it's happening synchronously right after the state update is scheduled, but the log in the useEffect hook on line 60 will show the correct value after the component re-renders.
  };
  // now (right)
  const handleDelete = async (e) => {
    await dispatch(deletePinThunk(targetPin.id));
    history.push(`/pins`);
  };
  // now (right)
  useEffect(() => {
    const errorsArray = [];
    if (link && !isValidUrl(link)) {
      errorsArray.push("Link is invalid");
    }
    setErrors(errorsArray);
  }, [link]);

  return (
    <>
      {showUpdateForm && (
        <div>
          <div className="form-page">
            <div className="update-form-container-including-title">
              <h1 className="edit-this-pin">Edit this Pin</h1>
              <div className="update-form-container">
                <form className="edit-pin" onSubmit={handleSubmit}>
                  <div className="big-container">
                    <div className="left-container">
                      <div className="title-area error">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="description-area">
                        <label>Description </label>
                        <textarea
                          type="text"
                          className="text-input-box"
                          name="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Tell us about this Pin...    😃 "
                        />
                      </div>

                      <div className="link-area">
                        <label>Website </label>
                        <input
                          type="text"
                          name="link"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          // onChange={handleLinkChange}
                        />
                      </div>
                      <p className="errors">
                        {errors.includes("Link is invalid") && "Invalid link"}
                      </p>
                      <div className="altText-area">
                        <label>Alt text</label>
                        <textarea
                          type="text"
                          name="altText"
                          value={alt_text}
                          className="alt-input-box"
                          onChange={(e) => setAlt_text(e.target.value)}
                          placeholder="This helps people using screen readers understand what your Pin is about."
                        />
                      </div>
                      <div></div>

                      {allow_comment ? (
                        <div className="comment-toggle">
                          <input
                            type="checkbox"
                            id="switch"
                            className="checkbox"
                            checked={allow_comment}
                            onChange={handleCommentToggleChange}
                          />
                          <label htmlFor="switch" className="toggle"></label>
                          Allow people to comment
                        </div>
                      ) : (
                        <div className="comment-toggle">
                          <input
                            type="checkbox"
                            id="switch"
                            className="checkbox"
                            checked={allow_comment}
                            onChange={handleCommentToggleChange}
                          />
                          <label htmlFor="switch" className="toggle"></label>
                          Allow people to comment
                        </div>
                      )}
                    </div>
                    <div className="right-container">
                      <div className="pic-container">
                        <img
                          src={
                            pin?.image_url ? pin.image_url : "no preview img"
                          }
                          alt="No pin preview"
                          className="pic"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div className="button-container">
                  <div className="left-btn" ref={ulRef1}>
                    <OpenModalButton
                      buttonText="Delete"
                      onItemClick={closeMenu}
                      modalComponent={<DeletePinModal pin={targetPin} />}
                    />
                  </div>

                  <div className="right-btn">
                    <button
                      className="cancel-button cursor a90"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="save-button cursor a90"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={errors.length > 0}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* test */}

          {/* test */}
        </div>
      )}
    </>
  );
}

export default EditPin;
