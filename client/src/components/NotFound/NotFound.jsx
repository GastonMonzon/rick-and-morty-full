import './NotFound.css';
import notFoundBackground from '../../assets/backgroundVideos/backgroundVideo1.mp4'

export default function NotFound() {
  return (
    <div className='not-found'>
      <div className='not-found-background-container'>
        <video src={notFoundBackground} className='not-found-background' autoPlay muted loop>
        </video>
      </div>
      <div className='not-found-modal-container' >
        <h3>404 Not Found</h3>
        <br />
        <h6>It appears that the page you're looking for doesn't exist.</h6>
        <br />
        <h6>Go back or navigate to the desired page using the upper navbar.</h6>
      </div>
    </div>
  )
}