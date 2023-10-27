/* styles */
import styles from './OptionsSideBarRight.module.css'

/* components */
import Checkbox from '../Checkbox/Checkbox';
import RadioButtons from '../RadioButtons/RadioButtons';
import {
    verticalCardsPerRowRadio, horizontalCardsPerRowRadio, infoLabelsCheckbox, infoVerticalPositionsRadio, infoHorizontalPositionsRadio, textPositionXRadio, textPositionYRadio, favoritesIconRadio,
    episodesViewRadio, episodeListViewRadio, episodeInfoCheckbox, episodeCharactersViewRadio
} from '../../config';
import {
    verticalCardsPerRow, horizontalCardsPerRow, infoLabels, infoVerticalPosition, infoHorizontalPosition, textPositionX,
    textPositionY, favoritesIcon, episodeView, episodeInfoLabels, episodeListView, charactersView
} from '../../redux/actions';

/* hooks */
import { useDispatch } from 'react-redux';

export default function OptionsSideBarRight() {
    const dispatch = useDispatch();

    const handleVerticalCardsPerRowChange = (id) => {
        dispatch(verticalCardsPerRow(id));
    }
    const handleHorizontalCardsPerRowChange = (id) => {
        dispatch(horizontalCardsPerRow(id));
    }
    const handleInfoLabelsChange = (id, event) => {
        dispatch(infoLabels({ id: id, isChecked: event.target.checked }));
    }
    const handleInfoVerticalPositionsChange = (id, event) => {
        dispatch(infoVerticalPosition(id));
    }
    const handleInfoHorizontalPositionsChange = (id, event) => {
        dispatch(infoHorizontalPosition(id));
    }
    const handleTextPositionXChange = (id, event) => {
        dispatch(textPositionX(id));
    }
    const handleTextPositionYChange = (id, event) => {
        dispatch(textPositionY(id));
    }
    const handleFavoritesIconChange = (id, event) => {
        dispatch(favoritesIcon(id));
    }
    const handleEpisodesViewChange = (id, event) => {
        dispatch(episodeView(id));
    }
    const handleEpisodeInfoLabelsChange = (id, event) => {
        dispatch(episodeInfoLabels({ id: id, isChecked: event.target.checked }));
    }
    const handleEpisodeListViewChange = (id, event) => {
        dispatch(episodeListView(id));
    }
    const handleCharactersViewChange = (id, event) => {
        dispatch(charactersView(id));
    }
    return (
        <div className={styles.optionsSidebar}>
            <h3>⚙️ Options Sidebar</h3>
            <div>
                <h4>Card Options</h4>
                <div>
                    <RadioButtons
                        name={verticalCardsPerRowRadio.name}
                        mainTitle={verticalCardsPerRowRadio.mainTitle}
                        titles={verticalCardsPerRowRadio.titles}
                        ids={verticalCardsPerRowRadio.ids}
                        checkedId={verticalCardsPerRowRadio.checked}
                        handleOptionsSideBarChange={handleVerticalCardsPerRowChange}
                    />
                </div>
                <div>
                    <RadioButtons
                        name={horizontalCardsPerRowRadio.name}
                        mainTitle={horizontalCardsPerRowRadio.mainTitle}
                        titles={horizontalCardsPerRowRadio.titles}
                        ids={horizontalCardsPerRowRadio.ids}
                        checkedId={horizontalCardsPerRowRadio.checked}
                        handleOptionsSideBarChange={handleHorizontalCardsPerRowChange}
                    />
                </div>
                <div>
                    <Checkbox
                        name={infoLabelsCheckbox.name}
                        mainTitle={infoLabelsCheckbox.mainTitle}
                        titles={infoLabelsCheckbox.titles}
                        ids={infoLabelsCheckbox.ids}
                        checkedIds={infoLabelsCheckbox.checked}
                        handleOptionsSideBarChange={handleInfoLabelsChange}
                    />
                </div>
                <div>
                    <RadioButtons
                        name={infoVerticalPositionsRadio.name}
                        mainTitle={infoVerticalPositionsRadio.mainTitle}
                        titles={infoVerticalPositionsRadio.titles}
                        ids={infoVerticalPositionsRadio.ids}
                        checkedId={infoVerticalPositionsRadio.checked}
                        handleOptionsSideBarChange={handleInfoVerticalPositionsChange}
                    />
                </div>
                <div>
                    <RadioButtons
                        name={infoHorizontalPositionsRadio.name}
                        mainTitle={infoHorizontalPositionsRadio.mainTitle}
                        titles={infoHorizontalPositionsRadio.titles}
                        ids={infoHorizontalPositionsRadio.ids}
                        checkedId={infoHorizontalPositionsRadio.checked}
                        handleOptionsSideBarChange={handleInfoHorizontalPositionsChange}
                    />
                </div>
                <div>
                    <RadioButtons
                        name={textPositionXRadio.name}
                        mainTitle={textPositionXRadio.mainTitle}
                        titles={textPositionXRadio.titles}
                        ids={textPositionXRadio.ids}
                        checkedId={textPositionXRadio.checked}
                        handleOptionsSideBarChange={handleTextPositionXChange}
                    />
                </div>
                <div>
                    <RadioButtons
                        name={textPositionYRadio.name}
                        mainTitle={textPositionYRadio.mainTitle}
                        titles={textPositionYRadio.titles}
                        ids={textPositionYRadio.ids}
                        checkedId={textPositionYRadio.checked}
                        handleOptionsSideBarChange={handleTextPositionYChange}
                    />
                </div>
                <div>
                    <RadioButtons
                        name={favoritesIconRadio.name}
                        mainTitle={favoritesIconRadio.mainTitle}
                        titles={favoritesIconRadio.titles}
                        ids={favoritesIconRadio.ids}
                        checkedId={favoritesIconRadio.checked}
                        handleOptionsSideBarChange={handleFavoritesIconChange}
                    />
                </div>
            </div>
            <div>
                <h4>Detail Options:</h4>
                <div>
                    <RadioButtons
                        name={episodesViewRadio.name}
                        mainTitle={episodesViewRadio.mainTitle}
                        titles={episodesViewRadio.titles}
                        ids={episodesViewRadio.ids}
                        checkedId={episodesViewRadio.checked}
                        handleOptionsSideBarChange={handleEpisodesViewChange}
                    />
                </div>
                <div>
                    <Checkbox
                        name={episodeInfoCheckbox.name}
                        mainTitle={episodeInfoCheckbox.mainTitle}
                        titles={episodeInfoCheckbox.titles}
                        ids={episodeInfoCheckbox.ids}
                        checkedIds={episodeInfoCheckbox.checked}
                        handleOptionsSideBarChange={handleEpisodeInfoLabelsChange}
                    />
                </div>
                <div>
                    <RadioButtons
                        name={episodeListViewRadio.name}
                        mainTitle={episodeListViewRadio.mainTitle}
                        titles={episodeListViewRadio.titles}
                        ids={episodeListViewRadio.ids}
                        checkedId={episodeListViewRadio.checked}
                        handleOptionsSideBarChange={handleEpisodeListViewChange}
                    />
                </div>
                <div>
                    <RadioButtons
                        name={episodeCharactersViewRadio.name}
                        mainTitle={episodeCharactersViewRadio.mainTitle}
                        titles={episodeCharactersViewRadio.titles}
                        ids={episodeCharactersViewRadio.ids}
                        checkedId={episodeCharactersViewRadio.checked}
                        handleOptionsSideBarChange={handleCharactersViewChange}
                    />
                </div>
            </div>
        </div>
    )
}