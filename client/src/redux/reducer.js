import {
  SET_ALL_CARDS, SET_VALUES, CHANGE_BACKGROUND, ADD_FAV, REMOVE_FAV, RANDOMIZE_ALL, QUERY, ORDER, ORDER_BY, FILTER, OPTIONS_SIDEBAR_CARDS_PER_PAGE, OPTIONS_SIDEBAR_RADIOS, OPTIONS_SIDEBAR_CHECKBOXES, FAVORITES_ICONS
} from "./action-types"
import {
  orderByOptions, filterOptions, cardOptions, detailOptions
} from '../config';

const generateCardOptions = (options, isRadio) => {
  const generatedOptions = [];
  if (isRadio) {
    for (let i = 0; i < options.length; i++) {
      if (Array.isArray(options[i].checked)) {
        continue;
      }
      generatedOptions.push({
        name: options[i].name,
        nameF: options[i]?.nameF || null,
        value: options[i].checked,
        valueF: options[i]?.checkedFavorites || null
      });
    }
  } else {
    for (let i = 0; i < options.length; i++) {
      if (Array.isArray(options[i].checked)) {
        for (let j = 0; j < options[i].ids.length; j++) {
          generatedOptions.push({
            name: options[i].ids[j],
            nameF: options[i].idsF ? options[i].idsF[j] : null,
            value: false,
            valueF: false,
          });
        }
        for (let k = 0; k < options[i].checked.length; k++) {
          const indexToUpdate = generatedOptions.findIndex(option => option.name === options[i].checked[k]);
          if (indexToUpdate !== -1) {
            generatedOptions[indexToUpdate].value = true;
          }
        }
        if (options[i].checkedFavorites) {
          for (let k = 0; k < options[i].checkedFavorites.length; k++) {
            const indexToUpdate = generatedOptions.findIndex(option => option.name === options[i].checkedFavorites[k]);
            if (indexToUpdate !== -1) {
              generatedOptions[indexToUpdate].valueF = true;
            }
          }
        }
      }
    }
  }
  return generatedOptions;
}

const initialState = {
  allCards: [],
  filteredCards: [],
  randomizedCards: [],
  queriedCards: [],
  autoSaveSearch: true,
  autoSaveFilters: true,
  autoSaveOptions: true,
  searchQuery: '',
  selectedFilters: [],
  isFavoritesTogether: true,
  selectedCardsPerPage: '',
  isAscending: true,
  selectedOrder: '',
  cardRadioOptions: {},
  cardCheckboxOptions: {},
  detailRadioOptions: {},
  detailCheckboxOptions: {},
  favoritesIcon: ['🤍', '❤️'],
  allFavorites: [],
  filteredFavorites: [],
  randomizedFavorites: [],
  queriedFavorites: [],
  searchQueryFavorites: '',
  selectedFiltersFavorites: [],
  selectedCardsPerPageFavorites: '',
  isAscendingFavorites: true,
  selectedOrderFavorites: '',
  homeBackground: '',
  favoritesBackground: '',
  detailBackground: '',
  loadingScreen: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_CARDS:
      return {
        ...state,
        allCards: action.payload,
        filteredCards: action.payload,
        queriedCards: action.payload
      };
    case SET_VALUES: {
      const userOptions = action.payload;
      return {
        ...state,
        autoSaveSearch: userOptions.autoSaveSearch,
        autoSaveFilters: userOptions.autoSaveFilters,
        autoSaveOptions: userOptions.autoSaveOptions,
        selectedFilters: userOptions.selectedFilters,
        isFavoritesTogether: userOptions.isFavoritesTogether,
        selectedCardsPerPage: userOptions.selectedCardsPerPage,
        isAscending: true,
        selectedOrder: userOptions.orderBy,
        cardRadioOptions: generateCardOptions(cardOptions, true),
        detailRadioOptions: generateCardOptions(detailOptions, true),
        cardCheckboxOptions: generateCardOptions(cardOptions, false),
        detailCheckboxOptions: generateCardOptions(detailOptions, false),
        favoritesIcon: ['🤍', '❤️'],
        allFavorites: userOptions.favorites === null ? [] : userOptions.favorites,
        filteredFavorites: [],
        randomizedFavorites: [],
        queriedFavorites: [],
        searchQueryFavorites: '',
        selectedFiltersFavorites: userOptions.selectedFiltersF,
        selectedCardsPerPageFavorites: userOptions.selectedCardsPerPageF,
        isAscendingFavorites: true,
        selectedOrderFavorites: userOptions.orderByF,
        homeBackground: userOptions.homeBackground,
        favoritesBackground: userOptions.favoritesBackground,
        detailBackground: userOptions.detailBackground,
        loadingScreen: userOptions.loadingScreen
      }
    }
    case CHANGE_BACKGROUND:
      switch (action.payload.name) {
        case 'home':
          return {
            ...state,
            homeBackground: action.payload.alt
          }
        case 'favorites':
          return {
            ...state,
            favoritesBackground: action.payload.alt
          }
        case 'detail':
          return {
            ...state,
            detailBackground: action.payload.alt
          }
        case 'loading':
          return {
            ...state,
            loadingScreen: action.payload.alt
          }
        default:
          return {
            ...state
          }
      }
    case ADD_FAV:
      return {
        ...state,
        allFavorites: [...state.allFavorites, action.payload],
      };
    case REMOVE_FAV:
      return {
        ...state,
        allFavorites: state.allFavorites.filter(
          (character) => character.id !== action.payload
        )
      };
    case RANDOMIZE_ALL: {
      let randomizedCards;
      if (action.payload) {
        randomizedCards = [...state.allCards];
      } else {
        randomizedCards = [...state.allFavorites];
      }
      for (let i = randomizedCards.length - 1; i > 0; i--) { // Algoritmo Fisher-Yates para mezclar aleatoriamente los valores en el arreglo
        const j = Math.floor(Math.random() * (i + 1));
        [randomizedCards[i], randomizedCards[j]] = [randomizedCards[j], randomizedCards[i]];
      }
      if (action.payload) {
        return {
          ...state,
          allCards: randomizedCards,
          randomizedCards: randomizedCards,
          selectedOrder: 'Random'
        }
      } else {
        return {
          ...state,
          allFavorites: randomizedCards,
          randomizedFavorites: randomizedCards,
          selectedOrderFavorites: 'Random'
        }
      }
    }
    case QUERY: {
      const query = action.payload.query.toLowerCase();
      let idCheckbox;
      let nameCheckbox;
      let originCheckbox;
      let locationCheckbox;
      if (action.payload.isHome) {
        idCheckbox = document.getElementById('idCheckbox');
        nameCheckbox = document.getElementById('nameCheckbox');
        originCheckbox = document.getElementById('originCheckbox');
        locationCheckbox = document.getElementById('locationCheckbox');
      } else {
        idCheckbox = document.getElementById('idCheckbox');
        nameCheckbox = document.getElementById('nameCheckbox');
        originCheckbox = document.getElementById('originCheckbox');
        locationCheckbox = document.getElementById('locationCheckbox');
      }
      const queryCardsFunction = (cardsTemp) => {
        return cardsTemp.filter((character) => {
          return (
            (idCheckbox.checked && character.id.toString().includes(query)) ||
            (nameCheckbox.checked && character.name.toLowerCase().includes(query)) ||
            (originCheckbox.checked && character.origin.name.toLowerCase().includes(query)) ||
            (locationCheckbox.checked && character.location.name.toLowerCase().includes(query))
          );
        });
      }
      if (action.payload.isHome) {
        let queryTemp = queryCardsFunction([...state.allCards]);
        console.log(query, queryTemp);
        return {
          ...state,
          filteredCards: [...queryTemp],
          queriedCards: [...queryTemp],
          searchQuery: query
        }
      } else {
        let queryTemp = queryCardsFunction([...state.allFavorites]);
        console.log(query, queryTemp);
        return {
          ...state,
          filteredFavorites: [...queryTemp],
          queriedFavorites: [...queryTemp],
          searchQueryFavorites: query
        }
      }
    }
    case ORDER: {
      if (action.payload) {
        state.isAscending = !state.isAscending;
        return {
          ...state,
          filteredCards: [...state.filteredCards].reverse()
        }
      } else {
        state.isAscendingFavorites = !state.isAscendingFavorites;
        return {
          ...state,
          filteredFavorites: [...state.filteredFavorites].reverse()
        }
      }
    }
    case ORDER_BY: {
      state.selectedOrder = action.payload.order;
      let orderByTemp;
      if (action.payload.isHome) {
        orderByTemp = [...state.filteredCards];
      } else {
        orderByTemp = [...state.filteredFavorites];
      }
      switch (state.selectedOrder) {
        case 'Random': {
          const orderCardsInRandom = (randomizedOrder, cardsToRandomize) => {
            const randomOrder = [];
            for (let i = 0; i < randomizedOrder.length; i++) {
              for (let j = 0; j < cardsToRandomize.length; j++) {
                if (randomizedOrder[i].id === cardsToRandomize[j].id) {
                  randomOrder.push(cardsToRandomize[j]);
                  break;
                }
              }
            }
            return randomOrder;
          }
          if (action.payload.isHome) {
            orderByTemp = orderCardsInRandom([...state.randomizedCards], [...state.filteredCards]);
          } else {
            orderByTemp = orderCardsInRandom([...state.randomizedFavorites], [...state.filteredFavorites]);
          }
          break;
        }
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
      if (action.payload.isHome) {
        return {
          ...state,
          filteredCards: [...orderByTemp]
        }
      } else {
        return {
          ...state,
          filteredFavorites: [...orderByTemp]
        }
      }
    }
    case FILTER: {
      const filterName = action.payload.name;
      const filterValue = action.payload.value;
      console.log(action.payload);
      if (action.payload.isHome) {
        switch (filterName) {
          case 'resetQueryButton': {
            state.searchQuery = '';
            const searchBarIdCheckbox = document.getElementById('idCheckbox');
            const searchBarNameCheckbox = document.getElementById('nameCheckbox');
            const searchBarOriginCheckbox = document.getElementById('originCheckbox');
            const searchBarLocationCheckbox = document.getElementById('locationCheckbox');
            searchBarIdCheckbox.checked = false;
            searchBarNameCheckbox.checked = true;
            searchBarOriginCheckbox.checked = false;
            searchBarLocationCheckbox.checked = false;
            state.queriedCards = [...state.allCards];
            break;
          }
          case 'filterButton':
            if (state.selectedFilters.includes(filterValue)) {
              state.selectedFilters = state.selectedFilters.filter((el) => el !== filterValue);
            } else {
              state.selectedFilters = [...state.selectedFilters, filterValue];
            }
            break;
          case 'AnystatusButton':
            state.selectedFilters = state.selectedFilters.filter((item) => {
              return !filterOptions.status.includes(item);
            })
            break;
          case 'AnyspeciesButton':
            state.selectedFilters = state.selectedFilters.filter((item) => {
              return !filterOptions.species.includes(item);
            })
            break;
          case 'AnygenderButton':
            state.selectedFilters = state.selectedFilters.filter((item) => {
              return !filterOptions.gender.includes(item);
            })
            break;
          case 'resetFiltersButton':
            return {
              ...state,
              filteredCards: [...state.queriedCards],
              selectedFilters: [],
              isAscending: true,
              selectedOrder: orderByOptions.default
            }
          default:
            break;
        }
      } else {
        switch (filterName) {
          case 'resetQueryButton': {
            state.searchQueryFavorites = '';
            const searchBarIdCheckbox = document.getElementById('idCheckbox');
            const searchBarNameCheckbox = document.getElementById('nameCheckbox');
            const searchBarOriginCheckbox = document.getElementById('originCheckbox');
            const searchBarLocationCheckbox = document.getElementById('locationCheckbox');
            searchBarIdCheckbox.checked = false;
            searchBarNameCheckbox.checked = true;
            searchBarOriginCheckbox.checked = false;
            searchBarLocationCheckbox.checked = false;
            state.queriedCards = [...state.allCards];
            break;
          }
          case 'filterButton':
            if (state.selectedFiltersFavorites.includes(filterValue)) {
              state.selectedFiltersFavorites = state.selectedFiltersFavorites.filter((el) => el !== filterValue);
            } else {
              state.selectedFiltersFavorites = [...state.selectedFiltersFavorites, filterValue];
            }
            console.log(state.selectedFiltersFavorites);
            break;
          case 'AnystatusButton':
            state.selectedFiltersFavorites = state.selectedFiltersFavorites.filter((item) => {
              return !filterOptions.status.includes(item);
            })
            break;
          case 'AnyspeciesButton':
            state.selectedFiltersFavorites = state.selectedFiltersFavorites.filter((item) => {
              return !filterOptions.species.includes(item);
            })
            break;
          case 'AnygenderButton':
            state.selectedFiltersFavorites = state.selectedFiltersFavorites.filter((item) => {
              return !filterOptions.gender.includes(item);
            })
            break;
          case 'resetFiltersButton':
            return {
              ...state,
              filteredFavorites: [...state.queriedFavorites],
              selectedFiltersFavorites: [],
              isAscendingFavorites: true,
              selectedOrderFavorites: orderByOptions.default
            }
          default:
            break;
        }
      }
      let filterTemp;
      let tempItems;
      if (action.payload.isHome) {
        filterTemp = [...state.queriedCards];
        if (state.selectedFilters.length > 0) {
          tempItems = state.selectedFilters.map((filterItem) => {
            if (filterOptions.status.includes(filterItem)) {
              return filterTemp.filter((card) => {
                return filterItem.includes('unknown')
                  ? card.status === filterItem.split(' ')[0]
                  : card.status === filterItem
              });
            }
            return undefined;
          });
          if (!tempItems.every(item => item === undefined)) {
            tempItems = tempItems.filter(item => {
              return Array.isArray(item);
            });
            tempItems = tempItems.flat();
            filterTemp = [...tempItems];
          }
          tempItems = state.selectedFilters.map((filterItem) => {
            if (filterOptions.species.includes(filterItem)) {
              return filterTemp.filter((card) => {
                return filterItem.includes('unknown')
                  ? card.species === filterItem.split(' ')[0]
                  : card.species === filterItem
              });
            }
            return undefined;
          });
          if (!tempItems.every(item => item === undefined)) {
            tempItems = tempItems.filter(item => {
              return Array.isArray(item);
            });
            tempItems = tempItems.flat();
            filterTemp = [...tempItems];
          }
          tempItems = state.selectedFilters.map((filterItem) => {
            if (filterOptions.gender.includes(filterItem)) {
              return filterTemp.filter((card) => {
                return filterItem.includes('unknown')
                  ? card.gender === filterItem.split(' ')[0]
                  : card.gender === filterItem
              });
            }
            return undefined;
          });
          if (!tempItems.every(item => item === undefined)) {
            tempItems = tempItems.filter(item => {
              return Array.isArray(item);
            });
            tempItems = tempItems.flat();
            filterTemp = [...tempItems];
          }
          console.log(filterTemp);
        }
        return {
          ...state,
          filteredCards: [...filterTemp]
        }
      } else {
        filterTemp = [...state.queriedFavorites];
        if (state.selectedFiltersFavorites.length > 0) {
          tempItems = state.selectedFiltersFavorites.map((filterItem) => {
            if (filterOptions.status.includes(filterItem)) {
              return filterTemp.filter((card) => {
                return filterItem.includes('unknown')
                  ? card.status === filterItem.split(' ')[0]
                  : card.status === filterItem
              });
            }
            return undefined;
          });
          if (!tempItems.every(item => item === undefined)) {
            tempItems = tempItems.filter(item => {
              return Array.isArray(item);
            });
            tempItems = tempItems.flat();
            filterTemp = [...tempItems];
          }
          tempItems = state.selectedFiltersFavorites.map((filterItem) => {
            if (filterOptions.species.includes(filterItem)) {
              return filterTemp.filter((card) => {
                return filterItem.includes('unknown')
                  ? card.species === filterItem.split(' ')[0]
                  : card.species === filterItem
              });
            }
            return undefined;
          });
          if (!tempItems.every(item => item === undefined)) {
            tempItems = tempItems.filter(item => {
              return Array.isArray(item);
            });
            tempItems = tempItems.flat();
            filterTemp = [...tempItems];
          }
          tempItems = state.selectedFiltersFavorites.map((filterItem) => {
            if (filterOptions.gender.includes(filterItem)) {
              return filterTemp.filter((card) => {
                return filterItem.includes('unknown')
                  ? card.gender === filterItem.split(' ')[0]
                  : card.gender === filterItem
              });
            }
            return undefined;
          });
          if (!tempItems.every(item => item === undefined)) {
            tempItems = tempItems.filter(item => {
              return Array.isArray(item);
            });
            tempItems = tempItems.flat();
            filterTemp = [...tempItems];
          }
          console.log(filterTemp);
        }
        return {
          ...state,
          filteredFavorites: [...filterTemp]
        }
      }
    }
    case OPTIONS_SIDEBAR_CARDS_PER_PAGE: {
      if (action.payload.isHome) {
        return {
          ...state,
          selectedCardsPerPage: action.payload.value
        }
      } else {
        return {
          ...state,
          selectedCardsPerPageFavorites: action.payload.value
        }
      }
    }
    case OPTIONS_SIDEBAR_RADIOS: {
      let updatedRadioOptions = [...state.detailRadioOptions];
      const index = updatedRadioOptions.findIndex(option => option.name === action.payload.name);
      if (index !== -1) {
        updatedRadioOptions[index].value = action.payload.value;
        return {
          ...state,
          detailRadioOptions: updatedRadioOptions
        }
      } else {
        updatedRadioOptions = [...state.cardRadioOptions];
        if (action.payload.isHome) {
          const index = updatedRadioOptions.findIndex(option => option.name === action.payload.name);
          updatedRadioOptions[index].value = action.payload.value;
          console.log(updatedRadioOptions);
          return {
            ...state,
            cardRadioOptions: updatedRadioOptions
          }
        } else {
          const index = updatedRadioOptions.findIndex(option => option.nameF === action.payload.name);
          updatedRadioOptions[index].valueF = action.payload.value;
          return {
            ...state,
            cardRadioOptions: updatedRadioOptions
          }
        }
      }
    }
    case OPTIONS_SIDEBAR_CHECKBOXES: {
      let updatedCheckboxOptions = [...state.detailCheckboxOptions];
      const index = updatedCheckboxOptions.findIndex(option => option.name === action.payload.name);
      if (index !== -1) {
        updatedCheckboxOptions[index].value = action.payload.isChecked;
        return {
          ...state,
          detailCheckboxOptions: updatedCheckboxOptions
        }
      } else {
        updatedCheckboxOptions = [...state.cardCheckboxOptions];
        if (action.payload.isHome) {
          console.log(action.payload.name);
          const index = updatedCheckboxOptions.findIndex(option => option.name === action.payload.name);
          console.log(updatedCheckboxOptions);
          updatedCheckboxOptions[index].value = action.payload.isChecked;
          return {
            ...state,
            cardCheckboxOptions: updatedCheckboxOptions
          }
        } else {
          const index = updatedCheckboxOptions.findIndex(option => option.nameF === action.payload.name);
          updatedCheckboxOptions[index].valueF = action.payload.isChecked;
          return {
            ...state,
            cardCheckboxOptions: updatedCheckboxOptions
          }
        }
      }
    }
    case FAVORITES_ICONS: {
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
          return tempFavoritesIcon;
      }
      return {
        ...state,
        favoritesIcon: [...tempFavoritesIcon]
      }
    }
    default:
      return state;
  }
}
export default reducer;