import './NotificationModal.css';
export default function NotificationModal({ title, message, buttonClassname, handleCloseModal }) {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-content'>
          <h3>{title}</h3>
          <br />
          <h6>{message}</h6>
          <br />
          <button className={buttonClassname} onClick={handleCloseModal}>Accept</button>
        </div>
      </div>
    </div>
  )
}