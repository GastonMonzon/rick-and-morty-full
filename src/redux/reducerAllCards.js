import {
    SET_ALL_CARDS, RANDOMIZE_ALL, QUERY, RESET_QUERY, ORDER, ORDER_BY, FILTER, RESET_FILTER, RESET_FILTERS, VERTICAL_CARDS_PER_ROW,
    HORIZONTAL_CARDS_PER_ROW, INFO_LABELS, INFO_LABELS_POSITION, TEXT_POSITION_X, TEXT_POSITION_Y, FAVORITES_ICON, EPISODE_VIEW,
    EPISODE_INFO_LABELS, CHARACTERS_VIEW, EPISODE_LIST_VIEW
} from "./action-types"
import {
    orderBySelect, filters, verticalCardsPerRowRadio, horizontalCardsPerRowRadio, infoLabelsPositionRadio, textPositionXRadio,
    textPositionYRadio, episodesViewRadio, episodeListViewRadio, episodeCharactersViewRadio
} from '../config';

const initialState = {
    allCards: [],
    filteredCards: [],
    randomizedCards: [],
    queriedCards: [],
    isAscending: true,
    selectedFilters: [],
    selectedOrder: orderBySelect.default,
    verticalCardsPerRow: verticalCardsPerRowRadio.checked,
    horizontalCardsPerRow: horizontalCardsPerRowRadio.checked,
    idView: true,
    nameView: true,
    statusView: true,
    typeView: false,
    speciesView: true,
    genderView: true,
    originView: false,
    locationView: false,
    infoLabelsPosition: infoLabelsPositionRadio.checked,
    textPositionX: textPositionXRadio.checked,
    textPositionY: textPositionYRadio.checked,
    favoritesIcon: ['🤍', '❤️'],
    episodeNameView: true,
    episodeCodeView: true,
    episodeDateView: true,
    episodeCharactersView: true,
    episodeView: episodesViewRadio.checked,
    charactersView: episodeCharactersViewRadio.checked,
    episodeListView: episodeListViewRadio.checked
};

export const ReducerAllCards = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_CARDS:
            console.log(action.payload);
            return {
                ...state,
                allCards: action.payload,
                filteredCards: action.payload,
                queriedCards: action.payload
            };
        case RANDOMIZE_ALL:
            console.log(action.payload);
            const randomizedCards = action.payload;
            console.log(randomizedCards);
            return {
                ...state,
                filteredCards: randomizedCards,
                randomizedCards: randomizedCards,
                selectedOrder: 'Random'
            };
        case QUERY:
            const checkboxes = action.payload.checkboxes;
            const query = action.payload.query.toLowerCase();
            console.log(checkboxes);
            console.log(query);
            let queryTemp = state.allCards.filter((character) => {
                return (
                    (!checkboxes.includes('nameCheckbox') || character.name.toLowerCase().includes(query)) &&
                    (!checkboxes.includes('idCheckbox') || character.id.toString().includes(action.payload.query)) &&
                    (!checkboxes.includes('originCheckbox') || character.origin.name.toLowerCase().includes(query)) &&
                    (!checkboxes.includes('locationCheckbox') || character.location.name.toLowerCase().includes(query))
                );
            });
            console.log(queryTemp);
            return {
                ...state,
                filteredCards: [...queryTemp],
                queriedCards: [...queryTemp]
            };
        case RESET_QUERY:
            const searchBarQueryInput = document.getElementById('searchBarQuery');
            const searchBarIdCheckbox = document.getElementById('idCheckbox');
            const searchBarNameCheckbox = document.getElementById('nameCheckbox');
            const searchBarOriginCheckbox = document.getElementById('originCheckbox');
            const searchBarLocationCheckbox = document.getElementById('locationCheckbox');
            searchBarQueryInput.textContent('');
            searchBarIdCheckbox.checked = false;
            searchBarNameCheckbox.checked = true;
            searchBarOriginCheckbox.checked = false;
            searchBarLocationCheckbox.checked = false;
            return {
                ...state,
                queriedCards: [...state.queriedCards]
            };
        case ORDER:
            state.isAscending = !state.isAscending;
            console.log(state.isAscending);
            return {
                ...state,
                filteredCards: [...state.filteredCards].reverse()
            };
        case ORDER_BY:
            state.selectedOrder = action.payload.order;
            let orderByTemp = [...state.filteredCards];
            switch (state.selectedOrder) {
                case 'Random':
                    if (state.randomizedCards.length === 0) {
                        const randomizedCards = [...state.allCards]; // Crea una copia de allCards
                        for (let i = randomizedCards.length - 1; i > 0; i--) { // Algoritmo Fisher-Yates para mezclar aleatoriamente los valores en el arreglo
                            const j = Math.floor(Math.random() * (i + 1));
                            [randomizedCards[i], randomizedCards[j]] = [randomizedCards[j], randomizedCards[i]];
                        }
                        console.log(randomizedCards);
                        orderByTemp = [...randomizedCards];
                        state.randomizedCards = [...randomizedCards];
                    }
                    console.log(state.filteredCards);
                    const randomOrder = [];
                    for (let i = 0; i < state.randomizedCards.length; i++) {
                        for (let j = 0; j < state.filteredCards.length; j++) {
                            if (state.randomizedCards[i].id === state.filteredCards[j].id) {
                                randomOrder.push(state.filteredCards[j]);
                                break;
                            }
                        }
                    }
                    console.log(state.randomizedCards);
                    console.log(randomOrder);
                    orderByTemp = [...randomOrder];
                    break;
                case 'Id':
                    orderByTemp = orderByTemp.sort((a, b) => a.id - b.id);
                    break;
                case 'Name':
                    orderByTemp = orderByTemp.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'Status':
                    orderByTemp = orderByTemp.sort((a, b) => a.status.localeCompare(b.status));
                    break;
                case 'Species':
                    orderByTemp = orderByTemp.sort((a, b) => a.species.localeCompare(b.species));
                    break;
                case 'Gender':
                    orderByTemp = orderByTemp.sort((a, b) => a.gender.localeCompare(b.gender));
                    break;
                case 'Origin':
                    orderByTemp = orderByTemp.sort((a, b) => a.origin.name.localeCompare(b.origin.name));
                    break;
                case 'Location':
                    orderByTemp = orderByTemp.sort((a, b) => a.location.name.localeCompare(b.location.name));
                    break;
                default:
                    orderByTemp = orderByTemp.sort((a, b) => a.id - b.id);
                    break;
            }
            if (!action.payload.isAscending) {
                orderByTemp.reverse();
            }
            console.log(orderByTemp);
            return {
                ...state,
                filteredCards: [...orderByTemp]
            };
        case FILTER:
            const filter = action.payload;
            console.log(filter);
            if (filter !== '') {
                if (state.selectedFilters.includes(filter)) {
                    state.selectedFilters = state.selectedFilters.filter((el) => el !== filter);
                    console.log(state.selectedFilters);
                } else {
                    state.selectedFilters.push(filter);
                    console.log(state.selectedFilters);
                }
            }
            console.log(state.selectedFilters);
            let filterTemp = [...state.queriedCards];
            let tempItems;
            if (state.selectedFilters.length > 0) {
                tempItems = state.selectedFilters.map((filterItem) => {
                    if (filters.status.includes(filterItem)) {
                        return filterTemp.filter((card) => {
                            return filterItem.includes('unknown')
                                ? card.status === filterItem.split(' ')[0]
                                : card.status === filterItem
                        });
                    }
                });
                console.log(tempItems);
                if (!tempItems.every(item => item === undefined)) {
                    console.log(tempItems);
                    tempItems = tempItems.filter(item => {
                        return Array.isArray(item);
                    });
                    console.log(tempItems);
                    tempItems = tempItems.flat();
                    filterTemp = [...tempItems];
                    console.log(filterTemp);
                }
                tempItems = state.selectedFilters.map((filterItem) => {
                    if (filters.species.includes(filterItem)) {
                        return filterTemp.filter((card) => {
                            return filterItem.includes('unknown')
                                ? card.species === filterItem.split(' ')[0]
                                : card.species === filterItem
                        });
                    }
                });
                console.log(tempItems);
                if (!tempItems.every(item => item === undefined)) {
                    console.log(tempItems);
                    tempItems = tempItems.filter(item => {
                        return Array.isArray(item);
                    });
                    console.log(tempItems);
                    tempItems = tempItems.flat();
                    filterTemp = [...tempItems];
                    console.log(filterTemp);
                }
                tempItems = state.selectedFilters.map((filterItem) => {
                    if (filters.gender.includes(filterItem)) {
                        return filterTemp.filter((card) => {
                            return filterItem.includes('unknown')
                                ? card.gender === filterItem.split(' ')[0]
                                : card.gender === filterItem
                        });
                    }
                });
                console.log(tempItems);
                if (!tempItems.every(item => item === undefined)) {
                    console.log(tempItems);
                    tempItems = tempItems.filter(item => {
                        return Array.isArray(item);
                    });
                    console.log(tempItems);
                    tempItems = tempItems.flat();
                    filterTemp = [...tempItems];
                    console.log(filterTemp);
                }
                console.log(filterTemp);
            }
            return {
                ...state,
                filteredCards: [...filterTemp],
            };
        case RESET_FILTER:
            let arrayTemp;
            switch (action.payload) {
                case 'status':
                    arrayTemp = state.selectedFilters.filter((item) => {
                        return !filters.status.includes(item);
                    })
                    break;
                case 'species':
                    arrayTemp = state.selectedFilters.filter((item) => {
                        return !filters.species.includes(item);
                    })
                    break;
                case 'gender':
                    arrayTemp = state.selectedFilters.filter((item) => {
                        return !filters.gender.includes(item);
                    })
                    break;
                default:
                    break;
            }
            return {
                ...state,
                selectedFilters: [...arrayTemp]
            };
        case RESET_FILTERS:
            const orderButton = document.getElementById('orderButton');
            orderButton.textContent = '⬆️';
            console.log('RESET_FILTERS');
            console.log(state.queriedCards);
            return {
                ...state,
                filteredCards: [...state.queriedCards],
                selectedFilters: [],
                activeFilterButtons: [],
                isAscending: true,
                selectedOrder: 'Id'
            };
        case VERTICAL_CARDS_PER_ROW:
            console.log(action.payload);
            return {
                ...state,
                verticalCardsPerRow: action.payload
            };
        case HORIZONTAL_CARDS_PER_ROW:
            console.log(action.payload);
            return {
                ...state,
                horizontalCardsPerRow: action.payload
            };
        case INFO_LABELS:
            console.log(action.payload);
            switch (action.payload.id) {
                case 'idView':
                    state.idView = action.payload.isChecked;
                    break;
                case 'nameView':
                    state.nameView = action.payload.isChecked;
                    break;
                case 'statusView':
                    state.statusView = action.payload.isChecked;
                    break;
                case 'speciesView':
                    state.speciesView = action.payload.isChecked;
                    break;
                case 'typeView':
                    state.typeView = action.payload.isChecked;
                    break;
                case 'genderView':
                    state.genderView = action.payload.isChecked;
                    break;
                case 'originView':
                    state.originView = action.payload.isChecked;
                    break;
                case 'locationView':
                    state.locationView = action.payload.isChecked;
                    break;
            }
            return {
                ...state
            };
        case INFO_LABELS_POSITION:
            console.log(action.payload);
            return {
                ...state,
                infoLabelsPosition: action.payload
            };
        case TEXT_POSITION_X:
            console.log(action.payload);
            return {
                ...state,
                textPositionX: action.payload
            };
        case TEXT_POSITION_Y:
            console.log(action.payload);
            return {
                ...state,
                textPositionY: action.payload
            };
        case FAVORITES_ICON:
            console.log(action.payload);
            let tempFavoritesIcon;
            switch (action.payload) {
                case 'heart':
                    tempFavoritesIcon = ['🤍', '❤️'];
                    break;
                case 'heartOrange':
                    tempFavoritesIcon = ['🤍', '🧡'];
                    break;
                case 'heartYellow':
                    tempFavoritesIcon = ['🤍', '💛'];
                    break;
                case 'heartGreen':
                    tempFavoritesIcon = ['🤍', '💚'];
                    break;
                case 'heartBlue':
                    tempFavoritesIcon = ['🤍', '💙'];
                    break;
                case 'heartPurple':
                    tempFavoritesIcon = ['🤍', '💜'];
                    break;
                case 'heartBrown':
                    tempFavoritesIcon = ['🤍', '🤎'];
                    break;
                case 'heartBlack':
                    tempFavoritesIcon = ['🤍', '🖤'];
                    break;
                case 'heartFire':
                    tempFavoritesIcon = ['🤍', '❤️‍🔥'];
                    break;
                case 'heartPink':
                    tempFavoritesIcon = ['🤍', '💗'];
                    break;
                case 'heartStar':
                    tempFavoritesIcon = ['🤍', '💖'];
                    break;
                case 'heartPresent':
                    tempFavoritesIcon = ['🤍', '💝'];
                    break;
                case 'star':
                    tempFavoritesIcon = ['🌟', '⭐'];
                    break;
                case 'heartFace':
                    tempFavoritesIcon = ['😶', '😍'];
                    break;
                case 'starFace':
                    tempFavoritesIcon = ['😑', '🤩'];
                    break;
                case 'monkeyFace':
                    tempFavoritesIcon = ['🙈', '🐵'];
                    break;
                case 'eye':
                    tempFavoritesIcon = ['⚪', '👁️'];
                    break;
                case 'thumbsUp':
                    tempFavoritesIcon = ['✋🏻', '👍'];
                    break;
                case 'nazar':
                    tempFavoritesIcon = ['⚪', '🧿'];
                    break;
                case 'disk':
                    tempFavoritesIcon = ['💿', '📀'];
                    break;
                case 'nest':
                    tempFavoritesIcon = ['🪹', '🪺'];
                    break;
                case 'leaves':
                    tempFavoritesIcon = ['🍂', '🍃'];
                    break;
                case 'ship':
                    tempFavoritesIcon = ['🚢', '⚓'];
                    break;
                case 'earthAmerica':
                    tempFavoritesIcon = ['⚪', '🌎'];
                    break;
                case 'earthAfrica':
                    tempFavoritesIcon = ['⚪', '🌍'];
                    break;
                case 'earthAsia':
                    tempFavoritesIcon = ['⚪', '🌏'];
                    break;
                case 'volcano':
                    tempFavoritesIcon = ['🗻', '🌋'];
                    break;
                case 'cloudySunny':
                    tempFavoritesIcon = ['☁️', '☀️'];
                    break;
                case 'rainy':
                    tempFavoritesIcon = ['🌧️', '💧'];
                    break;
                case 'snowy':
                    tempFavoritesIcon = ['🌨️', '❄️'];
                    break;
                case 'umbrella':
                    tempFavoritesIcon = ['🌂', '☂️'];
                    break;
                case 'moon':
                    tempFavoritesIcon = ['🌑', '🌕'];
                    break;
                case 'moonFace':
                    tempFavoritesIcon = ['🌚', '🌝'];
                    break;
                case 'sunFace':
                    tempFavoritesIcon = ['☀️', '🌞'];
                    break;
                case 'noYes':
                    tempFavoritesIcon = ['❌', '⭕'];
                    break;
                case 'exclamation':
                    tempFavoritesIcon = ['❕', '❗'];
                    break;
                default:
                    break;
            }
            return {
                ...state,
                favoritesIcon: [...tempFavoritesIcon]
            }
        case EPISODE_VIEW:
            console.log(action.payload);
            return {
                ...state,
                episodeView: action.payload
            };
        case EPISODE_INFO_LABELS:
            console.log(action.payload);
            switch (action.payload.id) {
                case 'episodeNameView':
                    state.episodeNameView = action.payload.isChecked;
                    break;
                case 'episodeCodeView':
                    state.episodeCodeView = action.payload.isChecked;
                    break;
                case 'episodeDateView':
                    state.episodeDateView = action.payload.isChecked;
                    break;
                case 'episodeCharactersView':
                    state.episodeCharactersView = action.payload.isChecked;
                    break;
            }
            return {
                ...state
            }
        case CHARACTERS_VIEW:
            console.log(action.payload);
            return {
                ...state,
                charactersView: action.payload
            };
        case EPISODE_LIST_VIEW:
            console.log(action.payload);
            return {
                ...state,
                episodeListView: action.payload
            };
        default:
            return state;
    }
};