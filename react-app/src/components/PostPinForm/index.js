import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';
import { createNewPinThunk } from "../../store/pins";


function PostPinForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [link, setlink] = useState('');
  const [image, setImage] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const currentUser = useSelector((state) => state.session.user);

  const submitForm = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const formData = new FormData();
    formData.append("owner_id",currentUser.id)
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("image_url", image);

    console.log('formData', formData)
    console.log('formData title', formData['title'])
    await dispatch(createNewPinThunk(formData));

    setTitle('');
    setDescription('');
    setAltText('');
    setlink('');
    setImage('');
    setValidationErrors([]);
    setHasSubmitted(false);
    history.push("/");
  }

  useEffect(() => {
    console.log('title', title)
    console.log('image', image)
  }, [title, image])



  return (
    <>
      <div className="form-page">
        <div className="form-container">
          <h1 className='form-header'>Creat a new pin</h1>
          <form onSubmit={(e) => submitForm(e)}
            encType="multipart/form-data" >

            <div className="leftContainer">
              <input className="uploadButton" id="image" type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="rightContainer">
              <div className='saveButton'>
                <button type="submit">Save</button>
              </div>
              <input className="title" type="text"
                value={title}
                placeholder="Add your title"
                onChange={(e) => setTitle(e.target.value)}
                required

              ></input>

              <div className="userinfo">
                <img className="userPic" src={currentUser && currentUser.photo_url} alt="" />
                {currentUser && currentUser.username}
              </div>

              <input className="description"
                value={description}
                placeholder="Tell everyone what your Pin is about"
                onChange={(e) => setDescription(e.target.value)}>
              </input>
              <input className="link"
                value={link}
                placeholder="Add a destination link"
                onChange={(e) => setlink(e.target.value)}>
              </input>

            </div>

          </form>
        </div>
      </div>
    </>
  )

}


export default PostPinForm;
