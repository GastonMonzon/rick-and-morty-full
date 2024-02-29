import './PromptPasswordModal.css';
export default function PromptPasswordModal({ requiresInput, title, errorMessage, inputName, inputValue, handleChange, validationMessage, handleCloseModal, handleSubmit, cancelButtonText, submitButtontext }) {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-content'>
          <h3>{title}</h3>
          <br />
          {requiresInput && (
            <div className='user-data-input-label-container' >
              <label htmlFor='changeUserDataPassword'>Input Password</label>
              <input
                type='password'
                key={inputName}
                id={inputName}
                name={inputName}
                value={inputValue}
                onChange={handleChange}
              />
            </div>
          )}
          <p className={validationMessage ? '' : 'invisible'} >{validationMessage ? `${validationMessage}` : 'invisible'}</p>
          <h6>{errorMessage}</h6>
          <br />
          <div className='modal-button-container' >
            <button
              className='modal-cancel-button'
              onClick={handleCloseModal} >
              {cancelButtonText}
            </button>
            <button
              className='modal-submit-button'
              onClick={handleSubmit}
              disabled={requiresInput && (!inputValue || validationMessage)} >
              {submitButtontext}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}