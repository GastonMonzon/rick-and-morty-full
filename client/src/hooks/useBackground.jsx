import backgroundVideo1 from '../assets/backgroundVideos/backgroundVideo1.mp4';
import backgroundVideo2 from '../assets/backgroundVideos/backgroundVideo2.mp4';
import background1 from '../assets/images/background1.jpg';
import background2 from '../assets/images/background2.png';
import background3 from '../assets/images/background3.jpg';
import background4 from '../assets/images/background4.jpg';
import background5 from '../assets/images/background5.jpg';
import background6 from '../assets/images/background6.jpg';
import background7 from '../assets/images/background7.jpg';

const useBackground = (background, location) => {
  switch (background) {
    case 'background1':
      return (
        <img src={background1} alt={background1} className={`${location}-background ${location}-${background}`} />
      )
    case 'background2':
      return (
        <img src={background2} alt={background2} className={`${location}-background ${location}-${background}`} />
      )
    case 'background3':
      return (
        <img src={background3} alt={background3} className={`${location}-background ${location}-${background}`} />
      )
    case 'background4':
      return (
        <img src={background4} alt={background4} className={`${location}-background ${location}-${background}`} />
      )
    case 'background5':
      return (
        <img src={background5} alt={background5} className={`${location}-background ${location}-${background}`} />
      )
    case 'background6':
      return (
        <img src={background6} alt={background6} className={`${location}-background ${location}-${background}`} />
      )
    case 'background7':
      return (
        <img src={background7} alt={background7} className={`${location}-background ${location}-${background}`} />
      )
    case 'backgroundVideo1':
      return (
        <video src={backgroundVideo1} className={`${location}-background ${location}-${background}`} autoPlay muted loop>
        </video>
      )
    case 'backgroundVideo2':
      return (
        <video src={backgroundVideo2} className={`${location}-background ${location}-${background}`} autoPlay muted loop>
        </video>
      )
    default:
      break;
  }
}
export default useBackground;