import {
    SET_ALL_CARDS, RANDOMIZE_ALL, ADD_FAV, REMOVE_FAV, QUERY, RESET_QUERY, ORDER, ORDER_BY, FILTER, RESET_FILTER, RESET_FILTERS,
    VERTICAL_CARDS_PER_ROW, HORIZONTAL_CARDS_PER_ROW, INFO_LABELS, INFO_LABELS_POSITION, TEXT_POSITION_X, TEXT_POSITION_Y, 
    RANDOMIZE_ALL_FAVORITES, QUERY_FAVORITES, RESET_QUERY_FAVORITES, ORDER_FAVORITES, ORDER_BY_FAVORITES, FILTER_FAVORITES, 
    RESET_FILTER_FAVORITES, RESET_FILTERS_FAVORITES, VERTICAL_CARDS_PER_ROW_FAVORITES, HORIZONTAL_CARDS_PER_ROW_FAVORITES,
    INFO_LABELS_FAVORITES, INFO_LABELS_POSITION_FAVORITES, TEXT_POSITION_X_FAVORITES, TEXT_POSITION_Y_FAVORITES, FAVORITES_ICON, 
    EPISODE_VIEW, EPISODE_INFO_LABELS, CHARACTERS_VIEW, EPISODE_LIST_VIEW
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
export const infoLabelsPosition = (position) => {
    return { type: INFO_LABELS_POSITION, payload: position }
}
export const textPositionX = (position) => {
    return { type: TEXT_POSITION_X, payload: position }
}
export const textPositionY = (position) => {
    return { type: TEXT_POSITION_Y, payload: position }
}
export const randomizeAllFavorites = (randomizedCards) => {
    return { type: RANDOMIZE_ALL_FAVORITES, payload: randomizedCards }
}
export const queryFunctionFavorites = (queryData) => {
    return { type: QUERY_FAVORITES, payload: queryData }
}
export const resetQueryFavorites = () => {
    return { type: RESET_QUERY_FAVORITES }
}
export const orderCardsFavorites = () => {
    return { type: ORDER_FAVORITES }
}
export const orderByFavorites = (orderData) => {
    return { type: ORDER_BY_FAVORITES, payload: orderData }
}
export const filterFavorites = (filterItem) => {
    return { type: FILTER_FAVORITES, payload: filterItem }
}
export const resetFilterFavorites = (category) => {
    return { type: RESET_FILTER_FAVORITES, payload: category }
}
export const resetFiltersFavorites = () => {
    return { type: RESET_FILTERS_FAVORITES }
}
export const verticalCardsPerRowFavorites = (id) => {
    return { type: VERTICAL_CARDS_PER_ROW_FAVORITES, payload: id }
}
export const horizontalCardsPerRowFavorites = (id) => {
    return { type: HORIZONTAL_CARDS_PER_ROW_FAVORITES, payload: id }
}
export const infoLabelsFavorites = (labelData) => {
    return { type: INFO_LABELS_FAVORITES, payload: labelData }
}
export const infoLabelsPositionFavorites = (position) => {
    return { type: INFO_LABELS_POSITION_FAVORITES, payload: position }
}
export const textPositionXFavorites = (position) => {
    return { type: TEXT_POSITION_X_FAVORITES, payload: position }
}
export const textPositionYFavorites = (position) => {
    return { type: TEXT_POSITION_Y_FAVORITES, payload: position }
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