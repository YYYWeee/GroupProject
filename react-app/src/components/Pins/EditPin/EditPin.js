import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './EditPin.css';


function EditPin({ pin }) {
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
    setAltText(targetPin.altText)
    setNote(targetPin.note)
    setAllow_comment(targetPin.allow_comment)  //default true
    setShow_shopping_recommendations(targetPin.show_shopping_recommendations)  //default true
    console.log('after first render',targetPin.allow_comment)
  }, [targetPin])

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [altText, setAltText] = useState('');
  const [note, setNote] = useState('');
  const [allow_comment, setAllow_comment] = useState('');
  const [show_shopping_recommendations, setShow_shopping_recommendations] = useState('');



  const handleSubmit = async (e) => {
    // pending
  }
  const handleCancel = async (e) => {
    history.goBack()
  }

  const handleCommentToggleChange = async (e) => {
    // setCommentPermission(e.target.checked)
    setAllow_comment(!allow_comment)
  }
  const handleRecommendToggleChange = async (e) => {
    setShow_shopping_recommendations(e.target.checked)
    // console.log('recommend', show_shopping_recommendations)
  }

  return (
    <>
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
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder='This helps people using screen readers understand what your Pin is about.' />
              </label>
            </div>
            <div>
              <label>
                Note to self
                <input type='text'
                  name='note'
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder='Add a private note to remember your ideas about this Pin'
                />
              </label>
            </div>

            { allow_comment ?(
              <div className='comment-toggle'>
              <input type="checkbox"
                id="switch"
                class="checkbox"
                checked={allow_comment}
                onChange={handleCommentToggleChange} />
              <label for="switch"
                class="toggle">
              </label>
              Allow people to comment
            </div>):(
              <div className='comment-toggle'>
              <input type="checkbox"
                id="switch"
                class="checkbox"
                checked={allow_comment}
                onChange={handleCommentToggleChange} />
              <label for="switch"
                class="toggle">
              </label>
              Allow people to comment
            </div>)

            }



            {/* <div className='comment-toggle'>
              <input type="checkbox"
                id="switch"
                class="checkbox"
                checked={'commentPermission'}
                // value={commentPermission}
                onChange={handleCommentToggleChange} />
              <label for="switch"
                class="toggle">
              </label>
              Allow people to comment
            </div> */}


            {/* <div className='recommend-toggle'>
              <input type="checkbox"
                id="switch"
                class="checkbox"
                checked='true'
                onChange={handleRecommendToggleChange} />
              <label for="switch"
                class="toggle">
              </label>
              Show shopping recommendations
            </div> */}


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
    </>
  )
}

export default EditPin;
