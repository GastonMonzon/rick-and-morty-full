import './Cards.css';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';

export default function Cards({ characters }) {
  const verticalCardsPerRow = useSelector(state => state.cardRadioOptions[0].value);
  const horizontalCardsPerRow = useSelector(state => state.cardRadioOptions[1].value);
  const infoLabelsPosition = useSelector((state) => state.cardRadioOptions[2].value);
  let cardsPerRow;
  if (infoLabelsPosition === 'left' || infoLabelsPosition === 'right') {
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
