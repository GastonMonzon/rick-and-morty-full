import {
  SET_ALL_CARDS, SET_VALUES, CHANGE_BACKGROUND, RANDOMIZE_ALL, ADD_FAV, REMOVE_FAV, QUERY_CHECKBOXES, QUERY, ORDER, ORDER_BY, FILTER, IS_FAVORITES_TOGETHER, OPTIONS_SIDEBAR_CARDS_PER_PAGE, OPTIONS_SIDEBAR_RADIOS, OPTIONS_SIDEBAR_CHECKBOXES, FAVORITES_ICONS, AUTOSAVE_TOGGLE, LOAD_SETTINGS, SAVE_SETTINGS
} from "./action-types"
import axios from "axios";

export const setAllCards = (cards) => {
  return { type: SET_ALL_CARDS, payload: cards }
}
export const setAllValues = (user) => {
  return { type: SET_VALUES, payload: user }
}
export const changeBackground = (backgroundInfo) => {
  return { type: CHANGE_BACKGROUND, payload: backgroundInfo }
}
export const randomizeAll = (isHome) => {
  return { type: RANDOMIZE_ALL, payload: isHome }
}
export const addFav = (character) => {
  // return async (dispatch) => {
  //   try {
  //     const { data } = await axios.patch('http://localhost:3001/userFavorites', character);
  //     console.log(data);
  //     return dispatch({ type: ADD_FAV, payload: data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  return { type: ADD_FAV, payload: character }
}
export const removeFav = (id) => {
  // const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
  //  return async (dispatch) => {
  //     try {
  //        const { data } = await axios.delete(endpoint);
  //        return dispatch({ type: REMOVE_FAV, payload: data });
  //     } catch (error) {
  //        console.log(error);
  //     }
  //  }
  return { type: REMOVE_FAV, payload: id }
}
export const queryCheckboxes = (checkboxData) => {
  return { type: QUERY_CHECKBOXES, payload: checkboxData }
}
export const query = (queryData) => {
  return { type: QUERY, payload: queryData }
}
export const orderDirection = (isHome) => {
  return { type: ORDER, payload: isHome }
}
export const orderBy = (orderData) => {
  return { type: ORDER_BY, payload: orderData }
}
export const filter = (filterData) => {
  return { type: FILTER, payload: filterData }
}
export const setIsFavoritesTogether = () => {
  return { type: IS_FAVORITES_TOGETHER }
}
export const optionsCardsPerPage = (optionsData) => {
  return { type: OPTIONS_SIDEBAR_CARDS_PER_PAGE, payload: optionsData }
}
export const optionsRadios = (optionsData) => {
  return { type: OPTIONS_SIDEBAR_RADIOS, payload: optionsData }
}
export const optionsCheckboxes = (checkboxData) => {
  return { type: OPTIONS_SIDEBAR_CHECKBOXES, payload: checkboxData }
}
export const favoritesIcon = (id) => {
  return { type: FAVORITES_ICONS, payload: id }
}
export const autoSaveToggle = (id) => {
  return { type: AUTOSAVE_TOGGLE, payload: id }
}
export const loadSettings = (loadData) => {
  return { type: LOAD_SETTINGS, payload: loadData }
}
export const saveSettings = (saveType) => {
  return { type: SAVE_SETTINGS, payload: saveType }
}