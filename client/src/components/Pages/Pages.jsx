import './Pages.css';
import { useEffect, useState } from "react";
import Cards from "../Cards/Cards";

export default function Pages({ cardsPerPage, cards }) {
  const [currentPage, setCurrentPage] = useState(1);
  const finalIndex = currentPage * cardsPerPage;
  const initialIndex = finalIndex - cardsPerPage;
  const characters = (cards.slice(initialIndex, finalIndex));
  const nPages = Math.ceil(cards.length / cardsPerPage);


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
  return (
    <>
      <Cards characters={characters} />
      <div className='pages-selector' >
        {(() => {
          const previousClassName = (currentPage === 1 || cardsPerPage === cards.length) ? 'invisible' : '';
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
          const nextClassName = (currentPage === nPages || nPages === 0 || cardsPerPage === cards.length) ? 'invisible' : '';
          return (
            <button
              className={nextClassName}
              onClick={nextPage} >
              Next
            </button>
          );
        })()}
      </div>
    </>
  )
}