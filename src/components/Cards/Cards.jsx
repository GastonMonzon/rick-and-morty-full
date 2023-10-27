import styles from './Cards.module.css';
import classNames from 'classnames'
import Card from '../Card/Card';
import { useSelector } from 'react-redux';

export default function Cards({ characters }) {
   const verticalCardsPerRow = useSelector(state => state.allCards.verticalCardsPerRow);
   const cardsDivClassName = classNames(styles.cardsDiv, styles[verticalCardsPerRow]);
   
   return (
      <div className={cardsDivClassName}>
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
