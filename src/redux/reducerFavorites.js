import {
    ADD_FAV, REMOVE_FAV, RANDOMIZE_ALL_FAVORITES, QUERY_FAVORITES, RESET_QUERY_FAVORITES, ORDER_FAVORITES, ORDER_BY_FAVORITES,
    FILTER_FAVORITES, RESET_FILTER_FAVORITES, RESET_FILTERS_FAVORITES, VERTICAL_CARDS_PER_ROW_FAVORITES, HORIZONTAL_CARDS_PER_ROW_FAVORITES, 
    INFO_LABELS_FAVORITES, INFO_LABELS_POSITION_FAVORITES, TEXT_POSITION_X_FAVORITES, TEXT_POSITION_Y_FAVORITES
} from "./action-types"
import {
    orderBySelect, filters, verticalCardsPerRowRadio, horizontalCardsPerRowRadio, infoLabelsPositionRadio, textPositionXRadio, textPositionYRadio
} from '../config';

const initialState = {
    myFavorites: [],
    allFavorites: [],
    randomizedFavorites: [],
    queriedFavorites: [],
    isAscendingFavorites: true,
    selectedFiltersFavorites: [],
    selectedOrderFavorites: orderBySelect.default,
    verticalCardsPerRowFavorites: verticalCardsPerRowRadio.checked,
    horizontalCardsPerRowFavorites: horizontalCardsPerRowRadio.checked,
    idViewFavorites: true,
    nameView: true,
    statusView: true,
    typeView: true,
    speciesView: true,
    genderView: true,
    originView: true,
    locationView: true,
    infoLabelsPosition: infoLabelsPositionRadio.checked,
    textPositionX: textPositionXRadio.checked,
    textPositionY: textPositionYRadio.checked,
};

export const reducerFavorites = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAV:
            return {
                ...state,
                myFavorites: [...state.myFavorites, action.payload],
                allFavorites: [...state.allFavorites, action.payload],
                queriedFavorites: [...state.allFavorites, action.payload]
            };
        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: state.myFavorites.filter(
                    (character) => character.id !== action.payload
                )
            };
        case RANDOMIZE_ALL_FAVORITES:
            console.log(action.payload);
            const randomizedFavorites = action.payload;
            console.log(randomizedFavorites);
            return {
                ...state,
                myFavorites: randomizedFavorites,
                randomizedFavorites: randomizedFavorites,
                selectedOrderFavorites: 'Random'
            };
        case QUERY_FAVORITES:
            const checkboxes = action.payload.checkboxes;
            const query = action.payload.query.toLowerCase();
            console.log(checkboxes);
            console.log(query);
            let queryTemp = state.myFavorites.filter((character) => {
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
                myFavorites: [...queryTemp],
                queriedFavorites: [...queryTemp]
            };
        case RESET_QUERY_FAVORITES:
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
                queriedFavorites: [...state.queriedFavorites]
            };
        case ORDER_FAVORITES:
            state.isAscendingFavorites = !state.isAscendingFavorites;
            console.log(state.isAscendingFavorites);
            return {
                ...state,
                myFavorites: [...state.myFavorites].reverse()
            };
        case ORDER_BY_FAVORITES:
            state.selectedOrderFavorites = action.payload.order;
            console.log(state.selectedOrderFavorites);
            let orderByTemp = [...state.myFavorites];
            console.log(orderByTemp);
            switch (state.selectedOrderFavorites) {
                case 'Random':
                    if (state.randomizedFavorites.length === 0) {
                        const randomizedFavorites = [...state.myFavorites]; // Crea una copia de allCards
                        for (let i = randomizedFavorites.length - 1; i > 0; i--) { // Algoritmo Fisher-Yates para mezclar aleatoriamente los valores en el arreglo
                            const j = Math.floor(Math.random() * (i + 1));
                            [randomizedFavorites[i], randomizedFavorites[j]] = [randomizedFavorites[j], randomizedFavorites[i]];
                        }
                        console.log(randomizedFavorites);
                        orderByTemp = [...randomizedFavorites];
                        state.randomizedFavorites = [...randomizedFavorites];
                    } else {
                        console.log(state.myFavorites);
                        const randomOrder = [];
                        for (let i = 0; i < state.randomizedFavorites.length; i++) {
                            for (let j = 0; j < state.myFavorites.length; j++) {
                                if (state.randomizedFavorites[i].id === state.myFavorites[j].id) {
                                    randomOrder.push(state.myFavorites[j]);
                                    break;
                                }
                            }
                        }
                        console.log(state.randomizedFavorites);
                        console.log(randomOrder);
                        orderByTemp = [...randomOrder];
                    }
                    break;
                case 'Id':
                    orderByTemp = orderByTemp.sort((a, b) => a.id - b.id);
                    console.log(orderByTemp);
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
            if (!action.payload.isAscendingFavorites) {
                console.log(orderByTemp);
                orderByTemp.reverse();
            }
            console.log(orderByTemp);
            return {
                ...state,
                myFavorites: [...orderByTemp]
            };
        case FILTER_FAVORITES:
            const filter = action.payload;
            console.log(filter);
            if (filter !== '') {
                if (state.selectedFiltersFavorites.includes(filter)) {
                    state.selectedFiltersFavorites = state.selectedFiltersFavorites.filter((el) => el !== filter);
                    console.log(state.selectedFiltersFavorites);
                } else {
                    state.selectedFiltersFavorites.push(filter);
                    console.log(state.selectedFiltersFavorites);
                }
            }
            console.log(state.selectedFiltersFavorites);
            let filterTemp = [...state.queriedFavorites];
            let tempItems;
            if (state.selectedFiltersFavorites.length > 0) {
                tempItems = state.selectedFiltersFavorites.map((filterItem) => {
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
                tempItems = state.selectedFiltersFavorites.map((filterItem) => {
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
                tempItems = state.selectedFiltersFavorites.map((filterItem) => {
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
                myFavorites: [...filterTemp],
            };
        case RESET_FILTER_FAVORITES:
            let arrayTemp;
            console.log(state.selectedFiltersFavorites);
            console.log(action.payload);
            switch (action.payload) {
                case 'status':
                    arrayTemp = state.selectedFiltersFavorites.filter((item) => {
                        return !filters.status.includes(item);
                    })
                    break;
                case 'species':
                    arrayTemp = state.selectedFiltersFavorites.filter((item) => {
                        return !filters.species.includes(item);
                    })
                    break;
                case 'gender':
                    arrayTemp = state.selectedFiltersFavorites.filter((item) => {
                        return !filters.gender.includes(item);
                    })
                    break;
                default:
                    break;
            }
            return {
                ...state,
                selectedFiltersFavorites: [...arrayTemp]
            };
        case RESET_FILTERS_FAVORITES:
            const orderButton = document.getElementById('orderButtonFavorites');
            orderButton.textContent = '⬆️';
            console.log('RESET_FILTERS_FAVORITES');
            console.log(state.queriedFavorites);
            return {
                ...state,
                myFavorites: [...state.queriedFavorites],
                selectedFiltersFavorites: [],
                activeFilterButtons: [],
                isAscendingFavorites: true,
                selectedOrderFavorites: 'Id'
            };
        case VERTICAL_CARDS_PER_ROW_FAVORITES:
            return {
                ...state,
                verticalCardsPerRowFavorites: action.payload
            };
        case HORIZONTAL_CARDS_PER_ROW_FAVORITES:
            return {
                ...state,
                horizontalCardsPerRow: action.payload
            };
        case INFO_LABELS_FAVORITES:
            switch (action.payload.id) {
                case 'idView':
                    state.idViewFavorites = action.payload.isChecked;
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
            }
        case INFO_LABELS_POSITION_FAVORITES:
            return {
                ...state,
                infoLabelsPosition: action.payload
            }
        case TEXT_POSITION_X_FAVORITES:
            return {
                ...state,
                textPositionX: action.payload
            };
        case TEXT_POSITION_Y_FAVORITES:
            return {
                ...state,
                textPositionY: action.payload
            };
        default:
            return state;
    }
};