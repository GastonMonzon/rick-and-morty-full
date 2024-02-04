/* styles */
import './Favorites.css';

/* components */
import backgroundVideo from '../../assets/backgroundVideos/backgroundVideo.mp4';

/* hooks */
import { useSelector } from "react-redux";
import Cards from '../Cards/Cards.jsx';

export default function Favorites() {
  const myFavorites = useSelector((state) => state.allFavorites);

  return (
    <div className='favorites' >
      <div className="favorites-video-container">
        <video src={backgroundVideo} className="favorites-background-video" autoPlay muted loop>
        </video>
      </div>
      <Cards characters={myFavorites} />
    </div>
  )
}