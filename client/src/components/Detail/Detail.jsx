import './Detail.css';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import backgroundVideo from '../../assets/backgroundVideos/backgroundVideo1.mp4';
import useBackground from '../../hooks/useBackground';

export default function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const episodeNameView = useSelector((state) => state.detailCheckboxOptions[0].value);
  const episodeCodeView = useSelector((state) => state.detailCheckboxOptions[1].value);
  const episodeDateView = useSelector((state) => state.detailCheckboxOptions[2].value);
  const episodeCharactersView = useSelector((state) => state.detailCheckboxOptions[3].value);
  const episodeView = useSelector((state) => state.detailRadioOptions[0].value);
  const episodeListView = useSelector((state) => state.detailRadioOptions[1].value);
  const charactersView = useSelector((state) => state.detailRadioOptions[2].value);
  const detailBackground = useSelector((state) => state.detailBackground);

  useEffect(() => {
    axios(`http://localhost:3001/characters/${id}`)
      .then(({ data }) => {
        setCharacter(data);
      })
      .catch((error) => {
        console.error('Error fetching dog details:', error);
      });

  }, [id]);

  const renderEpisodes = () => (
    <ul>
      {character.episodes && character.episodes.map((episode) => (
        <li key={episode.name}>
          {episodeNameView && <h4>{episode.name}</h4>}
          {episodeCodeView && <p>{episode.code}</p>}
          {episodeDateView && <p>Air Date: {episode.air_date}</p>}
          {episodeCharactersView && (
            <React.Fragment>
              {charactersView === 'hiddenCharacters' ? (
                <details>
                  <summary className='characters-title-details-tag'>Characters:</summary>
                  {renderCharacters(episode)}
                </details>
              ) : (
                <React.Fragment>
                  <p>Characters:</p>
                  {renderCharacters(episode)}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </li>
      ))}
    </ul>
  );
  const renderCharacters = (episode) => {
    return (
      <React.Fragment>
        {episodeCharactersView ? (
          <div className={episodeListView === 'characterImagesAndNames' ? 'detail-character-images-container character-images-and-names' : 'detail-character-images-container'}>
            {episode.episodeCharacters && episode.episodeCharacters.map((char) => {
              if (char.id === Number(id)) return null;
              switch (episodeListView) {
                case 'characterImages':
                  return (
                    <React.Fragment key={char.id}>
                      {renderCharacterImages(char)}
                    </React.Fragment>
                  );
                case 'characterNames':
                  return (
                    <React.Fragment key={char.id}>
                      {renderCharacterNames(char)}
                    </React.Fragment>
                  );
                case 'characterImagesAndNames':
                  return (
                    <React.Fragment key={char.id}>
                      {renderCharacterImagesAndNames(char)}
                    </React.Fragment>
                  );
                default:
                  return null;
              }
            })}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
  const renderCharacterNames = (char) => {
    return (
      <React.Fragment>
        <NavLink key={char.id} to={`/detail/${char.id}`}>
          {<span>{char.name}, </span>}
        </NavLink>
      </React.Fragment >
    );
  }
  const renderCharacterImages = (char) => {
    return (
      <React.Fragment>
        <NavLink key={char.id} to={`/detail/${char.id}`}>
          <img className='detail-character-image' src={char.image} alt={char.name} title={char.name} />
        </NavLink>
      </React.Fragment >
    );
  }
  const renderCharacterImagesAndNames = (char) => {
    return (
      <React.Fragment>
        <NavLink key={char.id} to={`/detail/${char.id}`}>
          <div className='detail-character-image-name-container'>
            <p className='detail-character-name' >{char.name}</p>
            <img className='detail-character-image-with-names' src={char.image} alt={char.name} title={char.name} />
          </div>
        </NavLink>
      </React.Fragment >
    );
  }

  return (
    <div className='detail-container' >
      <div className='detail-background-container' >
        {useBackground(detailBackground, 'detail')}
      </div>
      <h2 className='detail-name'>{character.name}</h2>
      <table className='detail-table' >
        <tbody>
          <tr>
            <td>
              <h3>Status:</h3>
            </td>
            <td>
              <p>{character.status}</p>
            </td>
          </tr>
          <tr>
            <td>
              <h3>Species:</h3>
            </td>
            <td>
              <p>{character.species}</p>
            </td>
          </tr>
          <tr>
            <td>
              <h3>Type:</h3>
            </td>
            <td>
              <p>{character.type}</p>
            </td>
          </tr>
          <tr>
            <td>
              <h3>Gender:</h3>
            </td>
            <td>
              <p>{character.gender}</p>
            </td>
          </tr>
          {origin && (
            <tr>
              <td>
                <h3>Origin Info:</h3>
              </td>
              <td>
                <p>Name: {character.origin_name}</p>
                <p>Type: {character.origin_type}</p>
                <p>Dimension: {character.origin_dimension}</p>
              </td>
            </tr>
          )}
          {character.location && (
            <tr>
              <td>
                <h3>Location Info:</h3>
              </td>
              <td>
                <p>Name: {character.location_name}</p>
                <p>Type: {character.location_type}</p>
                <p>Dimension: {character.location_dimension}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {(episodeNameView || episodeCodeView || episodeDateView || episodeCharactersView) && (
        <React.Fragment>
          {episodeView === 'hiddenEpisodes' ? (
            <details>
              <summary className='episodes-title-details-tag' >Episodes:</summary>
              {renderEpisodes()}
            </details>
          ) : (
            <React.Fragment>
              <h3>Episodes:</h3>
              {renderEpisodes()}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      <img className='detail-image' src={character.image} alt={character.name} />
    </div>
  )
}