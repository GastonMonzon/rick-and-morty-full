import './About.css';
import aboutBackground from '../../assets/backgroundVideos/backgroundVideo1.mp4';
import apiIcon from '../../assets/icons/rick-and-morty-api-icon.svg';
import reactIcon from '../../assets/icons/react-icon.svg';
import javascriptIcon from '../../assets/icons/javascript-icon.svg';
import cssIcon from '../../assets/icons/css3-icon.svg';
import htmlIcon from '../../assets/icons/html5-icon.svg';
import postgreIcon from '../../assets/icons/postgresql-icon.svg';
import firebaseIcon from '../../assets/icons/firebase-icon.svg';
import firestoreIcon from '../../assets/icons/firestore-icon.svg';
import githubIcon from '../../assets/icons/github-icon.svg';

export default function About() {
  return (
    <div className='about' >
      <div className='about-background-container'>
        <video src={aboutBackground} className='about-background' autoPlay muted loop>
        </video>
      </div>
      <div className='about-modal-container' >
        <h3>About</h3>
        <br />
        <p>These page was made using the following frameworks:</p>
        <br />
        <div className='icon-p-container' >
          <a href='https://rickandmortyapi.com/' target="_blank" rel="noopener noreferrer" >
            <img src={apiIcon} alt='API Icon' />
          </a>
          <p>Data Extracted From <a href='https://rickandmortyapi.com/' target="_blank" rel="noopener noreferrer" >Rick And Morty API</a></p>
        </div>
        <div className='icon-p-container' >
          <a href='https://es.react.dev/' target="_blank" rel="noopener noreferrer" >
            <img src={reactIcon} alt='React Icon' />
          </a>
          <p>Coded in <a href='https://es.react.dev/' target="_blank" rel="noopener noreferrer" >React</a> (<a href='https://developer.mozilla.org/es/docs/Web/JavaScript' target="_blank" rel="noopener noreferrer" >Javascript</a>, <a href='https://developer.mozilla.org/es/docs/Web/CSS' target="_blank" rel="noopener noreferrer" >CSS3</a>, <a href='https://developer.mozilla.org/es/docs/Web/HTML' target="_blank" rel="noopener noreferrer" >HTML5</a>) </p>
          <img src={javascriptIcon} alt='Javascript Icon' />
          <img src={cssIcon} alt='CSS Icon' />
          <img className='html-icon' id='htmlIcon' src={htmlIcon} alt='HTML Icon' />
        </div>
        <div className='icon-p-container' >
          <a href='https://www.postgresql.org/' target="_blank" rel="noopener noreferrer" >
            <img src={postgreIcon} alt='PostgreSQL Icon' />
          </a>
          <p><a href='https://www.postgresql.org/' target="_blank" rel="noopener noreferrer" >PostgreSQL</a> Local Database</p>
        </div>
        <div className='icon-p-container' >
          <a href='https://firebase.google.com' target="_blank" rel="noopener noreferrer" >
            <img src={firebaseIcon} alt='Firebase Icon' />
          </a>
          <p><a href='https://firebase.google.com' target="_blank" rel="noopener noreferrer" >Firebase</a> User Authentication</p>
        </div>
        <div className='icon-p-container' >
          <a href='https://firebase.google.com/products/firestore' target="_blank" rel="noopener noreferrer" >
            <img src={firestoreIcon} alt='Firestore Icon' />
          </a>
          <p><a href='https://firebase.google.com/products/firestore' target="_blank" rel="noopener noreferrer" >Firestore</a> Cloud Database</p>
        </div>
        <div className='icon-p-container' >
          <a href='https://github.com/GastonMonzon/rick_and_morty_full' target="_blank" rel="noopener noreferrer" >
            <img src={githubIcon} alt='Github Icon' href='' />
          </a>
          <p><a href='https://github.com/GastonMonzon/rick_and_morty_full' target="_blank" rel="noopener noreferrer" >Github</a> Code Repository</p>
        </div>
      </div>
    </div>
  );
}