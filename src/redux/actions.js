import {
    SET_ALL_CARDS, RANDOMIZE_ALL, ADD_FAV, REMOVE_FAV, QUERY, RESET_QUERY, ORDER, ORDER_BY, FILTER, RESET_FILTER, RESET_FILTERS,
    VERTICAL_CARDS_PER_ROW, HORIZONTAL_CARDS_PER_ROW, INFO_LABELS, INFO_VERTICAL_POSITION, INFO_HORIZONTAL_POSITION, TEXT_POSITION_X, 
    TEXT_POSITION_Y, FAVORITES_ICON, EPISODE_VIEW, EPISODE_INFO_LABELS, CHARACTERS_VIEW, EPISODE_LIST_VIEW
} from "./action-types"

export const setAllCards = (cards) => {
    return { type: SET_ALL_CARDS, payload: cards }
}
export const randomizeAll = (randomizedCards) => {
    return { type: RANDOMIZE_ALL, payload: randomizedCards }
}
export const addFav = (character) => {
    return { type: ADD_FAV, payload: character }
}
export const removeFav = (id) => {
    return { type: REMOVE_FAV, payload: id }
}
export const queryFunction = (queryData) => {
    return { type: QUERY, payload: queryData }
}
export const resetQuery = () => {
    return { type: RESET_QUERY }
}
export const orderCards = () => {
    return { type: ORDER }
}
export const orderBy = (orderData) => {
    return { type: ORDER_BY, payload: orderData }
}
export const filter = (filterItem) => {
    return { type: FILTER, payload: filterItem }
}
export const resetFilter = (category) => {
    return { type: RESET_FILTER, payload: category }
}
export const resetFilters = () => {
    return { type: RESET_FILTERS }
}
export const verticalCardsPerRow = (id) => {
    return { type: VERTICAL_CARDS_PER_ROW, payload: id }
}
export const horizontalCardsPerRow = (id) => {
    return { type: HORIZONTAL_CARDS_PER_ROW, payload: id }
}
export const infoLabels = (labelData) => {
    return { type: INFO_LABELS, payload: labelData }
}
export const infoVerticalPosition = (position) => {
    return { type: INFO_VERTICAL_POSITION, payload: position }
}
export const infoHorizontalPosition = (position) => {
    return { type: INFO_HORIZONTAL_POSITION, payload: position }
}
export const textPositionX = (position) => {
    return { type: TEXT_POSITION_X, payload: position }
}
export const textPositionY = (position) => {
    return { type: TEXT_POSITION_Y, payload: position }
}
export const favoritesIcon = (id) => {
    return { type: FAVORITES_ICON, payload: id }
}
export const episodeView = (shows) => {
    return { type: EPISODE_VIEW, payload: shows }
}
export const episodeInfoLabels = (labelData) => {
    return { type: EPISODE_INFO_LABELS, payload: labelData }
}
export const charactersView = (shows) => {
    return { type: CHARACTERS_VIEW, payload: shows }
}
export const episodeListView = (shows) => {
    return { type: EPISODE_LIST_VIEW, payload: shows }
}