import './Home.css';
import Cards from "../Cards/Cards";
import backgroundVideo from '../../assets/backgroundVideos/backgroundVideo.mp4';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Home() {
  const allCharacters = useSelector((state) => state.filteredCards);
  const selectedCardsPerPage = useSelector((state) => state.selectedCardsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const parsedCardsPerPage = Number(selectedCardsPerPage);
  const finalIndex = currentPage * parsedCardsPerPage;
  const initialIndex = finalIndex - parsedCardsPerPage;
  const characters = (allCharacters.slice(initialIndex, finalIndex));
  const nPages = Math.ceil(allCharacters.length / parsedCardsPerPage);
  useEffect(() => {
    if (currentPage > nPages) {
      setCurrentPage(1);
    }
  }, [currentPage, nPages]);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  const selectPage = (event) => {
    setCurrentPage(Number(event.target.id));
  }
  console.log(selectedCardsPerPage);
  return (
    <div className='home'>
      <div className="home-video-container">
        <video src={backgroundVideo} className="home-background-video" autoPlay muted loop>
        </video>
      </div>
      <Cards characters={characters} />
      <div className='pages-selector' >
        {(() => {
          const previousClassName = (currentPage === 1 || selectedCardsPerPage === allCharacters.length) ? 'invisible' : '';
          return (
            <button className={previousClassName} onClick={previousPage} >Prev</button>
          );
        })()}
        {Array.from({ length: nPages }, (_, i) => (
          <button
            className={currentPage === i + 1 ? 'selected-page' : 'page-button'}
            key={i} id={i + 1}
            onClick={selectPage} >
            {i + 1}
          </button>
        ))}
        {(() => {
          const nextClassName = (currentPage === nPages || nPages === 0 || selectedCardsPerPage === allCharacters.length) ? 'invisible' : '';
          return (
            <button
              className={nextClassName}
              onClick={nextPage} >
              Next
            </button>
          );
        })()}
      </div>
    </div>
  );
}