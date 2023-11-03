import './Cards.css';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';

export default function Cards({ characters }) {
   const verticalCardsPerRow = useSelector(state => state.allCards.verticalCardsPerRow);
   const horizontalCardsPerRow = useSelector(state => state.allCards.horizontalCardsPerRow);
   const infoLabelsPosition = useSelector((state) => state.allCards.infoLabelsPosition);
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
               origin={character.origin}
               location={character.location}
               image={character.image}
               episode={character.episode}
            />
         ))}
      </div>
   );
}
