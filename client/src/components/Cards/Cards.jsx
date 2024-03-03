import './Cards.css';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

export default function Cards({ characters }) {
  const { pathname } = useLocation();
  const isFavoritesTogether = useSelector((state) => state.isFavoritesTogether);
  const verticalCardsPerRow = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardRadioOptions[0].value
      : state.cardRadioOptions[0].valueF
  );
  const horizontalCardsPerRow = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardRadioOptions[1].value
      : state.cardRadioOptions[1].valueF
  );
  const infoLabelsPosition = useSelector((state) =>
    (pathname === '/home' || isFavoritesTogether)
      ? state.cardRadioOptions[2].value
      : state.cardRadioOptions[2].valueF
  );
  let cardsPerRow;
  if (infoLabelsPosition === 'left' || infoLabelsPosition === 'right' || infoLabelsPosition === 'leftF' || infoLabelsPosition === 'rightF') {
    cardsPerRow = horizontalCardsPerRow;
  } else {
    cardsPerRow = verticalCardsPerRow;
  }

  return (
    <div className={`cardsDiv ${cardsPerRow}`}>
      {characters.map((character) => (
        <Card
          id={character.id}
          key={character.id}
          name={character.name}
          status={character.status}
          species={character.species}
          type={character.type}
          gender={character.gender}
          origin_name={character.origin_name}
          location_name={character.location_name}
          image={character.image}
          episode={character.episode}
        />
      ))}
    </div>
  );
}
