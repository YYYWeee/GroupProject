import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { updatePinThunk } from "../../../store/pins";
import { deletePinThunk } from "../../../store/pins";
import './EditPin.css';


function EditPin({ pin, setShowUpdateForm2 }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const targetPin = useSelector((state) =>
    state.pins.singlePin ? state.pins.singlePin : {}
  );

  useEffect(() => {
    setTitle(targetPin.title)
    setDescription(targetPin.description)
    setLink(targetPin.link)
    setAlt_text(targetPin.alt_text)
    // setNote_to_self(targetPin.note_to_self)   //????
    setAllow_comment(targetPin.allow_comment)  //default true
    // setShow_shopping_recommendations(targetPin.show_shopping_recommendations)  //default true
    // console.log('after first render', targetPin.allow_comment)
  }, [targetPin])

  const [showUpdateForm, setShowUpdateForm] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [alt_text, setAlt_text] = useState('');
  // const [note_to_self, setNote_to_self] = useState('');
  const [allow_comment, setAllow_comment] = useState('');
  // const [show_shopping_recommendations, setShow_shopping_recommendations] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      // ...pin,
      title: title,
      description: description,
      link: link,
      alt_text: alt_text,
      // note_to_self:note_to_self,
      allow_comment: allow_comment
    }
    // console.log("updatedPin!!!!!!!!!!!!!!!:", payload);
    // console.log('id!!!!!!!!!!!!!',targetPin.id)
    // console.log('note!!!!!!!!!!',targetPin.note_to_self)
    await dispatch(updatePinThunk(payload, targetPin.id));
    // history.push(`/pins/${targetPin.id}`)
    setShowUpdateForm(false)
    setShowUpdateForm2(false)

  }
  const handleCancel = async (e) => {
    history.goBack()
  }

  const handleCommentToggleChange = async (e) => {
    setAllow_comment((allow_comment) => !allow_comment);
    console.log('in handleCommentToggleChange', allow_comment)
    // Remember above may not show the updated value because it's happening synchronously right after the state update is scheduled, but the log in the useEffect hook on line 60 will show the correct value after the component re-renders.
  }
  // const handleRecommendToggleChange = async (e) => {
  //   setShow_shopping_recommendations(e.target.checked)
  // }
  const handleDelete = async (e) => {
    await dispatch(deletePinThunk(targetPin.id));
    history.push(`/pins`);
  };

  useEffect(() => {
    console.log('in the useeffect', allow_comment);
  }, [allow_comment]);

  return (
    <>

      {showUpdateForm && (
        <div className='form-page'>


          <div className='update-form-container'>
            <form className='edit-pin' onSubmit={handleSubmit}>
              <div className='title'>
                <h1>Edit this Pin</h1>
              </div>

              <div className='right-container'>
                <div>
                  <label>
                    Title
                    <input type='text'
                      name='title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)} />
                  </label>
                </div>
                <div>
                  <label>
                    Description
                    <input type='text'
                      name='description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell us about this Pin...    😃 "
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Website
                    <input type='text'
                      name='link'
                      value={link}
                      onChange={(e) => setLink(e.target.value)} />
                  </label>
                </div>
                <div>
                  <label>
                    Alt text
                    <input type='text'
                      name='altText'
                      value={alt_text}
                      onChange={(e) => setAlt_text(e.target.value)}
                      placeholder='This helps people using screen readers understand what your Pin is about.' />
                  </label>
                </div>
                <div>
                  {/* <label>
                Note to self
                <input type='text'
                  name='note'
                  value={note_to_self}
                  onChange={(e) => setNote_to_self(e.target.value)}
                  placeholder='Add a private note to remember your ideas about this Pin'/>
              </label> */}
                </div>

                {allow_comment ? (
                  <div className='comment-toggle'>
                    <input type="checkbox"
                      id="switch"
                      class="checkbox"
                      checked={allow_comment}
                      onChange={handleCommentToggleChange}
                    />
                    <label for="switch"
                      class="toggle">
                    </label>
                    Allow people to comment
                  </div>) : (
                  <div className='comment-toggle'>
                    <input type="checkbox"
                      id="switch"
                      class="checkbox"
                      checked={allow_comment}
                      onChange={handleCommentToggleChange}
                    />
                    <label for="switch"
                      class="toggle">
                    </label>
                    Allow people to comment
                  </div>)

                }
              </div>
              <div className='left-container'>
                <div className='pic-container'>
                  <img
                    src={pin?.image_url ? pin.image_url : "no preview img"}
                    alt='No pin preview'
                    className="pic"
                  />
                </div>
              </div>
              {/* <div
              className="delete-pin"
              onClick={() =>
                dispatch(deletePinThunk(targetPin.id)) && history.goBack()
              }
            >
              Delete
            </div> */}
              <button
                className="delete-pin"
                type="submit"
                onClick={handleDelete}
              >
                Delete
              </button>




              <button
                className="cancel-button"
                type="submit"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="save-button"
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>)}
    </>
  )
}

export default EditPin;
