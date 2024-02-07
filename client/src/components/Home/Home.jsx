import './Home.css';
import { useSelector } from 'react-redux';
import Pages from '../Pages/Pages';
import useBackground from '../../hooks/useBackground';

export default function Home() {
  const allCharacters = useSelector((state) => state.filteredCards);
  const homeBackground = useSelector((state) => state.homeBackground);
  const selectedCardsPerPage = useSelector((state) => state.selectedCardsPerPage);

  return (
    <div className='home'>
      <div className='home-background-container'>
        {useBackground(homeBackground, 'home')}
      </div>
      <Pages cardsPerPage={Number(selectedCardsPerPage)} cards={allCharacters} />
    </div>
  );
}