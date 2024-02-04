import {
  SET_ALL_CARDS, RANDOMIZE_ALL, ADD_FAV, REMOVE_FAV, QUERY, ORDER, ORDER_BY, FILTER, OPTIONS_SIDEBAR_CARDS_PER_PAGE, OPTIONS_SIDEBAR_RADIOS, OPTIONS_SIDEBAR_CHECKBOXES, FAVORITES_ICONS
} from "./action-types"
import axios from "axios";

export const setAllCards = (cards) => {
  return { type: SET_ALL_CARDS, payload: cards }
}
export const setAllValues = (user) => {
  return { type: 'SET_VALUES', payload: user }
}
export const randomizeAll = (isHome) => {
  return { type: RANDOMIZE_ALL, payload: isHome }
}
export const addFav = (character) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch('http://localhost:3001/userFavorites', character);
      return dispatch({ type: ADD_FAV, payload: data });
    } catch (error) {
      console.log(error);
    }
  }
}
export const removeFav = (id) => {
  const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
   return async (dispatch) => {
      try {
         const { data } = await axios.delete(endpoint);
         return dispatch({ type: REMOVE_FAV, payload: data });
      } catch (error) {
         console.log(error);
      }
   }
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
export const optionsCardsPerPage = (optionsData) => {
  return { type: OPTIONS_SIDEBAR_CARDS_PER_PAGE, payload: optionsData }
}
export const optionsRadios = (optionsData) => {
  return { type: OPTIONS_SIDEBAR_RADIOS, payload: optionsData }
}
export const optionsCheckboxes = (labelData) => {
  return { type: OPTIONS_SIDEBAR_CHECKBOXES, payload: labelData }
}
export const favoritesIcon = (id) => {
  return { type: FAVORITES_ICONS, payload: id }
}