import styles from './Detail.module.css';
import axios from 'axios';
import { useParams, Link, useLocation, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import backgroundVideo from '../../images/backgroundVideo.mp4';

export default function Detail(props) {
    const { id } = useParams();
    const [character, setCharacter] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [origin, setOrigin] = useState({});
    const [location, setLocation] = useState({});
    const episodeNameView = useSelector((state) => state.allCards.episodeNameView);
    const episodeCodeView = useSelector((state) => state.allCards.episodeCodeView);
    const episodeDateView = useSelector((state) => state.allCards.episodeDateView);
    const episodeCharactersView = useSelector((state) => state.allCards.episodeCharactersView);
    const pageLocation = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
            if (Object.keys(data).length !== 0) {
                setCharacter(data);
                fetchEpisodeData(data.episode);
                fetchOriginData(data.origin.url);
                fetchLocationData(data.location.url);
            } else {
                window.alert('No hay personajes con ese ID');
            }
        });
        return setCharacter({});
    }, [id]);

    const fetchEpisodeData = (episodeUrls) => {
        const episodePromises = episodeUrls.map((url) => axios(url));
        Promise.all(episodePromises)
            .then((responses) => {
                const episodesData = responses.map(({ data }) => data);
                setEpisodes(episodesData);
                fetchCharactersData(episodesData);
            })
            .catch((error) => {
                console.log('Error fetching episodes:', error);
            });
    };

    const fetchCharactersData = (episodesData) => {
        const charactersPromises = episodesData.map((episode) =>
            Promise.all(episode.characters.map((url) => axios(url)))
        );
        Promise.all(charactersPromises)
            .then((responses) => {
                const episodesWithCharacters = episodesData.map((episode, index) => ({
                    ...episode,
                    characters: responses[index].map(({ data }) => data),
                }));
                setEpisodes(episodesWithCharacters);
            })
            .catch((error) => {
                console.log('Error fetching characters:', error);
            });
    };

    const fetchOriginData = (url) => {
        axios(url)
            .then(({ data }) => {
                setOrigin(data);
            })
            .catch((error) => {
                console.log('Error fetching origin:', error);
                setOrigin({});
            });
    };

    const fetchLocationData = (url) => {
        axios(url)
            .then(({ data }) => {
                setLocation(data);
            })
            .catch((error) => {
                console.log('Error fetching location:', error);
            });
    };

    return (
        <div className={styles.containerDiv} >
            <div className={styles.detailvideocontainer}>
                <video src={backgroundVideo} className={styles.detailbackgroundvideo} autoPlay muted loop>
                    </video>
                </div>
            <h2 className={styles.detailName}>{character.name}</h2>
            <table className={styles.detailTable} >
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
                                <p>Name: {origin.name}</p>
                                <p>Type: {origin.type}</p>
                                <p>Dimension: {origin.dimension}</p>
                            </td>
                        </tr>
                    )}
                    {location && (
                        <tr>
                            <td>
                                <h3>Location Info:</h3>
                            </td>
                            <td>
                                <p>Name: {location.name}</p>
                                <p>Type: {location.type}</p>
                                <p>Dimension: {location.dimension}</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {(episodeNameView || episodeCodeView || episodeDateView || episodeCharactersView) && <h3>Episodes:</h3>}
            <ul>
                {episodes.map((episode) => (
                    <li key={episode.episode}>
                        {episodeNameView && <h4>{episode.name}</h4>}
                        {episodeCodeView && <p>{episode.episode}</p>}
                        {episodeDateView && <p>Air Date: {episode.air_date}</p>}
                        {episodeCharactersView && <p>Characters:</p>}
                        {episodeCharactersView ? (
                            episode.characters.map((character) => (
                                <NavLink key={character.id} to={`/detail/${character.id}`}>
                                    <img className={styles.detailImage} src={character.image} alt={character.name} title={character.name} />
                                </NavLink>
                            ))) : (null)
                        }
                    </li>
                ))}
            </ul>
            <img className={styles.image} src={character.image} alt={character.name} />
        </div>
    )
}