import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { reducerFavorites } from './reducerFavorites';
import { ReducerAllCards } from './reducerAllCards';


const rootReducer = combineReducers({
  favorites: reducerFavorites,
  allCards: ReducerAllCards,
  // Add other reducers if needed
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware)) // Para hacer peticiones asíncronas
);