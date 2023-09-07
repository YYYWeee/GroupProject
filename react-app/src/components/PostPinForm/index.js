import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
import { createNewPinThunk } from "../../store/pins";

// function isValidUrl(str) {
//   const pattern = new RegExp(
//     "^([a-zA-Z]+:\\/\\/)?" + // protocol
//       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//       "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//       "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//       "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//       "(\\#[-a-z\\d_]*)?$", // fragment locator
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

function PostPinForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [altText, setAltText] = useState("");
  const [showAlt, setShowAlt] = useState(false);
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [noPicture, setNoPicture] = useState(false);
  const uploadInput = useRef();
  const [isValidLink, setIsValidLink] = useState(true);
  const [errors, setErrors] = useState([]);

  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const errorsArray = [];
    if (link && !isValidUrl(link)) {
      errorsArray.push("Link is invalid");
    }
    setErrors(errorsArray);
  }, [link]);

  const handlePhoto = async ({ currentTarget }) => {
    if (currentTarget.files[0]) {
      setImage(currentTarget.files[0]);
      setPhoto(currentTarget.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(currentTarget.files[0]);
      fileReader.onload = () => setPhotoUrl(fileReader.result);
      setNoPicture(false);
    }
  };

  let preview = null;
  if (photoUrl) preview = <img src={photoUrl} id="preview-pin-img" alt="" />;

  useEffect(() => {
    // setLink(link);
    setIsValidLink(isValidUrl(link));
  }, [link]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (link && !isValidLink) {
      setIsValidLink(false);
      return;
    }

    if (image == null) {
      setNoPicture(true);
      return;
    }

    let formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("alt_text", altText);
    formData.append("link", link);

    const formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    const data = await dispatch(createNewPinThunk(formData));

    setTitle("");
    setDescription("");
    setAltText("");
    setLink("");
    setImage("");
    setValidationErrors([]);
    setHasSubmitted(false);
    // history.push("/pins");
    history.push(`/pins/${data.id}`);
  };

  return (
    <>
      <div className="form-page">
        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
          <div className="form-container">
            <div
              id="leftContainer"
              className={noPicture ? "no-picture cursor" : "cursor"}
              onClick={() => uploadInput.current.click()}
            >
              <input
                className="uploadButton"
                id="image"
                type="file"
                // accept="image/*"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                // onChange={(e) => setImage(e.target.files[0])}
                onChange={handlePhoto}
                ref={uploadInput}
                style={{ display: "none" }}
              />
              {preview || (
                <div
                  id="upload-sign-box-text"
                  className={noPicture ? "no-picture" : ""}
                >
                  <i className="fa-solid fa-upload"></i>
                  <div>
                    {!noPicture
                      ? "Click to upload."
                      : "An Image is required to create a Pin."}
                  </div>
                </div>
              )}
            </div>

            <div className="rightContainer">
              <div className="saveButton-container">
                <button type="submit" className="saveButton a95">
                  Save
                </button>
              </div>
              <input
                className="title"
                type="text"
                value={title}
                placeholder="Add your title"
                onChange={(e) => setTitle(e.target.value)}
                required
              ></input>

              <div className="userinfo">
                <img
                  className="userPic"
                  src={
                    currentUser?.photo_url
                      ? currentUser?.photo_url
                      : "https://cdn.discordapp.com/attachments/1134270927769698500/1136036638351425769/profile-icon.jpeg"
                  }
                  alt=""
                />
                {currentUser && currentUser.username}
              </div>

              <input
                className="description"
                value={description}
                placeholder="Tell everyone what your Pin is about    😃 "
                onChange={(e) => setDescription(e.target.value)}
              ></input>
              <div className="alt">
                {!showAlt && (
                  <div
                    id="add-alt-text-button"
                    onClick={() => setShowAlt(true)}
                  >
                    Add alt text
                  </div>
                )}

                {showAlt && (
                  <span
                    contentEditable
                    role="textbox"
                    id="alt-text-textbox"
                    placeholder="Explain what people can see in the Pin" // This line is a no-op, see corresponding CSS file for 'content'
                    onInput={(e) => {
                      setAltText(e.target.value);
                    }}
                  />
                )}
              </div>
              <input
                className="link"
                value={link}
                placeholder="Add a destination link"
                onChange={(e) => setLink(e.target.value)}
              ></input>
              <p className="errors">
                {errors.filter((validation) => validation.includes("Link"))}
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostPinForm;
