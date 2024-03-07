import backgroundVideo1 from '../assets/backgroundVideos/backgroundVideo1.mp4';
import backgroundVideo2 from '../assets/backgroundVideos/backgroundVideo2.mp4';
import background1 from '../assets/images/background1.jpg';
import background2 from '../assets/images/background2.png';
import background3 from '../assets/images/background3.jpg';
import background4 from '../assets/images/background4.jpg';
import background5 from '../assets/images/background5.jpg';
import background6 from '../assets/images/background6.jpg';
import background7 from '../assets/images/background7.jpg';

const backgroundMap = {
  background1,
  background2,
  background3,
  background4,
  background5,
  background6,
  background7,
  backgroundVideo1,
  backgroundVideo2
};

const useBackground = (background, location) => {
  const backgroundImage = backgroundMap[background];

  if (background) {
    if (background === 'backgroundVideo1' || background === 'backgroundVideo2') {
      return (
        <video src={backgroundImage} className={`${location}-background ${location}-${background}`} autoPlay muted loop />
      )
    } else {
      return (
        <img src={backgroundImage} alt={background} className={`${location}-background ${location}-${background}`} />
      );
    }
  }
}
export default useBackground;