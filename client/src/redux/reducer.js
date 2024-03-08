import {
  SET_ALL_CARDS, SET_ALL_VALUES, CHANGE_BACKGROUND, ADD_FAV, REMOVE_FAV, RANDOMIZE_ALL, QUERY_CHECKBOXES, QUERY, ORDER, ORDER_BY, FILTER, IS_FAVORITES_TOGETHER, OPTIONS_SIDEBAR_CARDS_PER_PAGE, OPTIONS_SIDEBAR_RADIOS, OPTIONS_SIDEBAR_CHECKBOXES, FAVORITES_ICONS, AUTOSAVE_TOGGLE, LOAD_SETTINGS, SAVE_SETTINGS
} from "./action-types"
import {
  filterOptions, getSearchOptions, getCardOptions, getFavoritesIconOptions, getDetailOptions, getDefaultSearchOptions, getDefaultCardOptions, getDefaultFavoritesIconOptions, getDefaultDetailOptions, getDefaultCardsPerPage, getDefaultCardsPerPageF, getDefaultFavoritesIcon, getDefaultOrderOptions
} from '../config';

const generateCardOptions = (options, isRadio) => {
  if (options) {
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
              const indexToUpdate = generatedOptions.findIndex(option => option.nameF === options[i].checkedFavorites[k]);
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
}

const generateSearchCheckboxOptions = (options) => {
  if (options) {
    const generatedOptions = [];
    for (let i = 0; i < options.ids.length; i++) {
      generatedOptions.push({
        name: options.ids[i],
        nameF: options.idsF ? options.idsF[i] : null,
        value: false,
        valueF: false,
      });
    }
    for (let k = 0; k < options.checked.length; k++) {
      const indexToUpdate = generatedOptions.findIndex(option => option.name === options.checked[k]);
      if (indexToUpdate !== -1) {
        generatedOptions[indexToUpdate].value = true;
      }
    }
    for (let k = 0; k < options.checkedFavorites.length; k++) {
      const indexToUpdate = generatedOptions.findIndex(option => option.nameF === options.checkedFavorites[k]);
      if (indexToUpdate !== -1) {
        generatedOptions[indexToUpdate].valueF = true;
      }
    }
    return generatedOptions;
  }
}

const initialState = {
  allCards: [],
  filteredCards: [],
  randomizedCards: [],
  queriedCards: [],
  autoSaveSearch: false,
  autoSaveFilters: false,
  autoSaveOptions: true,
  searchQuery: '',
  selectedFilters: [],
  isFavoritesTogether: true,
  selectedCardsPerPage: getDefaultCardsPerPage,
  isAscending: true,
  selectedOrder: getDefaultOrderOptions().checked,
  searchByCheckboxOptions: generateSearchCheckboxOptions(getDefaultSearchOptions()),
  cardRadioOptions: generateCardOptions(getDefaultCardOptions(), true),
  cardCheckboxOptions: generateCardOptions(getDefaultCardOptions(), false),
  favoritesIcon: getDefaultFavoritesIcon,
  detailRadioOptions: generateCardOptions(getDefaultDetailOptions(), true),
  detailCheckboxOptions: generateCardOptions(getDefaultDetailOptions(), false),
  allFavorites: [],
  filteredFavorites: [],
  randomizedFavorites: [],
  queriedFavorites: [],
  searchQueryFavorites: '',
  selectedFiltersFavorites: [],
  selectedCardsPerPageFavorites: getDefaultCardsPerPageF,
  isAscendingFavorites: true,
  selectedOrderFavorites: getDefaultOrderOptions().checkedFavorites,
  homeBackground: '',
  favoritesBackground: '',
  detailBackground: '',
  loadingScreen: '',
  searchSettings: '',
  filterSettings: '',
  optionsSettings: '',
  userSettings: '',
  areSearchSettingsChanged: false,
  areFilterSettingsChanged: false,
  areOptionsSettingsChanged: false,
  areUserSettingsChanged: false,
  isLoading: false
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
    case SET_ALL_VALUES: {
      const userOptions = action.payload;
      const favorites = userOptions.favorites !== null
        ? userOptions.favorites.map((favorite) => state.allCards.find((card) => card.id === favorite))
        : [];
        console.log(userOptions.orderByF);
      return {
        ...state,
        autoSaveSearch: userOptions.autoSaveSearch,
        autoSaveFilters: userOptions.autoSaveFilters,
        autoSaveOptions: userOptions.autoSaveOptions,
        homeBackground: userOptions.homeBackground,
        favoritesBackground: userOptions.favoritesBackground,
        detailBackground: userOptions.detailBackground,
        loadingScreen: userOptions.loadingScreen,
        searchQuery: userOptions.searchQuery,
        selectedOrder: userOptions.orderBy,
        isAscending: userOptions.isAscending,
        selectedFilters: userOptions.selectedFilters,
        isFavoritesTogether: userOptions.isFavoritesTogether,
        selectedCardsPerPage: userOptions.selectedCardsPerPage,
        searchByCheckboxOptions: generateSearchCheckboxOptions(getSearchOptions(userOptions)),
        cardRadioOptions: generateCardOptions(getCardOptions(userOptions), true),
        cardCheckboxOptions: generateCardOptions(getCardOptions(userOptions), false),
        favoritesIcon: userOptions.favoritesIcon,
        detailRadioOptions: generateCardOptions(getDetailOptions(userOptions), true),
        detailCheckboxOptions: generateCardOptions(getDetailOptions(userOptions), false),
        allFavorites: favorites,
        searchQueryFavorites: userOptions.searchQueryF,
        selectedOrderFavorites: userOptions.orderByF,
        isAscendingFavorites: userOptions.isAscendingF,
        selectedFiltersFavorites: userOptions.selectedFiltersF,
        selectedCardsPerPageFavorites: userOptions.selectedCardsPerPageF,
      }
    }
    case CHANGE_BACKGROUND:
      switch (action.payload.name) {
        case 'home':
          return {
            ...state,
            homeBackground: action.payload.alt,
            areUserSettingsChanged: true
          }
        case 'favorites':
          return {
            ...state,
            favoritesBackground: action.payload.alt,
            areUserSettingsChanged: true
          }
        case 'detail':
          return {
            ...state,
            detailBackground: action.payload.alt,
            areUserSettingsChanged: true
          }
        case 'loading':
          return {
            ...state,
            loadingScreen: action.payload.alt,
            areUserSettingsChanged: true
          }
        default:
          return state;
      }
    case ADD_FAV:
      return {
        ...state,
        allFavorites: [...state.allFavorites, action.payload],
        areUserSettingsChanged: true
      };
    case REMOVE_FAV:
      return {
        ...state,
        allFavorites: state.allFavorites.filter((character) => character.id !== action.payload),
        areUserSettingsChanged: true
      };
    case RANDOMIZE_ALL: {
      let randomizedCards;
      if (action.payload) {
        randomizedCards = [...state.allCards];
      } else {
        randomizedCards = [...state.allFavorites];
      }
      for (let i = randomizedCards.length - 1; i > 0; i--) { // Fisher-Yates algorithm to shuffle elements randomly
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
    case QUERY_CHECKBOXES:
      let updatedCheckboxOptions = [...state.searchByCheckboxOptions];
      if (action.payload.isHome) {
        const index = updatedCheckboxOptions.findIndex(option => option.name === action.payload.name);
        console.log(state.searchByCheckboxOptions);
        console.log(action.payload.name, action.payload.isChecked, index);
        console.log(updatedCheckboxOptions);
        console.log(state.searchByCheckboxOptions);
        updatedCheckboxOptions[index].value = action.payload.isChecked;
        return {
          ...state,
          searchByCheckboxOptions: updatedCheckboxOptions,
          areSearchSettingsChanged: true
        }
      } else {
        const index = updatedCheckboxOptions.findIndex(option => option.nameF === action.payload.name);
        console.log(action.payload.name, action.payload.isChecked, index);
        updatedCheckboxOptions[index].valueF = action.payload.isChecked;
        console.log(updatedCheckboxOptions);
        return {
          ...state,
          searchByCheckboxOptions: updatedCheckboxOptions,
          areSearchSettingsChanged: true
        }
      }
    case QUERY: {
      state.isLoading = true;
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
        idCheckbox = document.getElementById('idCheckboxF');
        nameCheckbox = document.getElementById('nameCheckboxF');
        originCheckbox = document.getElementById('originCheckboxF');
        locationCheckbox = document.getElementById('locationCheckboxF');
      }
      const queryCardsFunction = (cardsTemp) => {
        return cardsTemp.filter((character) => {
          return (
            (idCheckbox.checked && character.id.toString().includes(query)) ||
            (nameCheckbox.checked && character.name.toLowerCase().includes(query)) ||
            (originCheckbox.checked && character.origin?.name.toLowerCase().includes(query)) ||
            (locationCheckbox.checked && character.location?.name.toLowerCase().includes(query))
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
          searchQuery: query,
          areSearchSettingsChanged: true,
          isLoading: false
        }
      } else {
        let queryTemp = queryCardsFunction([...state.allFavorites]);
        console.log(query, queryTemp);
        return {
          ...state,
          filteredFavorites: [...queryTemp],
          queriedFavorites: [...queryTemp],
          searchQueryFavorites: query,
          areSearchSettingsChanged: true,
          isLoading: false
        }
      }
    }
    case ORDER: {
      state.isLoading = true;
      if (action.payload) {
        state.isAscending = !state.isAscending;
        return {
          ...state,
          filteredCards: [...state.filteredCards].reverse(),
          areFilterSettingsChanged: true,
          isLoading: false
        }
      } else {
        state.isAscendingFavorites = !state.isAscendingFavorites;
        return {
          ...state,
          filteredFavorites: [...state.filteredFavorites].reverse(),
          areFilterSettingsChanged: true,
          isLoading: false
        }
      }
    }
    case ORDER_BY: {
      state.isLoading = true;
      let orderByTemp, order;
      if (action.payload.isHome) {
        orderByTemp = [...state.filteredCards];
        if (!action.payload.order) {
          order = state.selectedOrder;
        } else {
          order = action.payload.order;
        }
      } else {
        orderByTemp = [...state.filteredFavorites];
        if (!action.payload.order) {
          order = state.selectedOrderFavorites;
        } else {
          order = action.payload.order;
        }
      }
      console.log(order);
      switch (order) {
        case 'Random':
        case 'RandomF': {
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
        case 'IdF':
          orderByTemp = orderByTemp.sort((a, b) => a.id - b.id);
          break;
        case 'Name':
        case 'NameF':
          orderByTemp = orderByTemp.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'Status':
        case 'StatusF':
          orderByTemp = orderByTemp.sort((a, b) => a.status.localeCompare(b.status));
          break;
        case 'Species':
        case 'SpeciesF':
          orderByTemp = orderByTemp.sort((a, b) => a.species.localeCompare(b.species));
          break;
        case 'Gender':
        case 'GenderF':
          orderByTemp = orderByTemp.sort((a, b) => a.gender.localeCompare(b.gender));
          break;
        case 'Origin':
        case 'OriginF':
          orderByTemp = orderByTemp.sort((a, b) => a.origin_name.localeCompare(b.origin_name));
          break;
        case 'Location':
        case 'LocationF':
          orderByTemp = orderByTemp.sort((a, b) => a.location_name.localeCompare(b.location_name));
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
          filteredCards: [...orderByTemp],
          selectedOrder: order,
          areFilterSettingsChanged: true,
          isLoading: false
        }
      } else {
        console.log(action.payload.order);
        return {
          ...state,
          filteredFavorites: [...orderByTemp],
          selectedOrderFavorites: order,
          areFilterSettingsChanged: true,
          isLoading: false
        }
      }
    }
    case FILTER: {
      state.isLoading = true;
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
            state.areSearchSettingsChanged = true;
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
            const order = getDefaultOrderOptions().checked;
            return {
              ...state,
              filteredCards: [...state.queriedCards],
              selectedFilters: [],
              isAscending: true,
              selectedOrder: order,
              areFilterSettingsChanged: true
            }
          default:
            return state;
        }
      } else {
        switch (filterName) {
          case 'resetQueryButton': {
            state.searchQueryFavorites = '';
            const searchBarIdCheckbox = document.getElementById('idCheckboxF');
            const searchBarNameCheckbox = document.getElementById('nameCheckboxF');
            const searchBarOriginCheckbox = document.getElementById('originCheckboxF');
            const searchBarLocationCheckbox = document.getElementById('locationCheckboxF');
            searchBarIdCheckbox.checked = false;
            searchBarNameCheckbox.checked = true;
            searchBarOriginCheckbox.checked = false;
            searchBarLocationCheckbox.checked = false;
            state.queriedCards = [...state.allCards];
            state.areSearchSettingsChanged = true;
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
            const order = getDefaultOrderOptions().checkedFavorites;
            console.log(order);
            return {
              ...state,
              filteredFavorites: [...state.queriedFavorites],
              selectedFiltersFavorites: [],
              isAscendingFavorites: true,
              selectedOrderFavorites: order,
              areFilterSettingsChanged: true
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
          filteredCards: [...filterTemp],
          areFilterSettingsChanged: true,
          isLoading: false
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
          filteredFavorites: [...filterTemp],
          areFilterSettingsChanged: true,
          isLoading: false
        }
      }
    }
    case IS_FAVORITES_TOGETHER:
      return {
        ...state,
        isFavoritesTogether: !state.isFavoritesTogether,
        areOptionsSettingsChanged: true
      };
    case OPTIONS_SIDEBAR_CARDS_PER_PAGE: {
      if (action.payload.isHome) {
        return {
          ...state,
          selectedCardsPerPage: action.payload.value,
          areOptionsSettingsChanged: true
        }
      } else {
        return {
          ...state,
          selectedCardsPerPageFavorites: action.payload.value,
          areOptionsSettingsChanged: true
        }
      }
    }
    case OPTIONS_SIDEBAR_RADIOS: {
      let updatedRadioOptions = [...state.detailRadioOptions];
      const index = updatedRadioOptions.findIndex(option => option.name === action.payload.name);
      console.log(updatedRadioOptions, action.payload.name, action.payload.value, index);
      if (index !== -1) {
        updatedRadioOptions[index].value = action.payload.value;
        return {
          ...state,
          detailRadioOptions: updatedRadioOptions,
          areOptionsSettingsChanged: true
        }
      } else {
        updatedRadioOptions = [...state.cardRadioOptions];
        if (action.payload.isHome) {
          const index = updatedRadioOptions.findIndex(option => option.name === action.payload.name);
          updatedRadioOptions[index].value = action.payload.value;
          console.log(updatedRadioOptions);
          console.log(updatedRadioOptions[index]);
          return {
            ...state,
            cardRadioOptions: updatedRadioOptions,
            areOptionsSettingsChanged: true
          }
        } else {
          const index = updatedRadioOptions.findIndex(option => option.nameF === action.payload.name);
          console.log(action.payload.name, action.payload.value, action.payload.isHome);
          updatedRadioOptions[index].valueF = action.payload.value;
          console.log(updatedRadioOptions);
          console.log(index);
          console.log(updatedRadioOptions[index]);
          return {
            ...state,
            cardRadioOptions: updatedRadioOptions,
            areOptionsSettingsChanged: true
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
          detailCheckboxOptions: updatedCheckboxOptions,
          areOptionsSettingsChanged: true
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
            cardCheckboxOptions: updatedCheckboxOptions,
            areOptionsSettingsChanged: true
          }
        } else {
          const index = updatedCheckboxOptions.findIndex(option => option.nameF === action.payload.name);
          console.log(action.payload.name, action.payload.isChecked, index);
          console.log(updatedCheckboxOptions);
          updatedCheckboxOptions[index].valueF = action.payload.isChecked;
          return {
            ...state,
            cardCheckboxOptions: updatedCheckboxOptions,
            areOptionsSettingsChanged: true
          }
        }
      }
    }
    case FAVORITES_ICONS: {
      let tempFavoritesIcon;
      switch (action.payload) {
        case 'heart':
          tempFavoritesIcon = ['🤍', '❤️', 'heart'];
          break;
        case 'heartOrange':
          tempFavoritesIcon = ['🤍', '🧡', 'heartOrange'];
          break;
        case 'heartYellow':
          tempFavoritesIcon = ['🤍', '💛', 'heartYellow'];
          break;
        case 'heartGreen':
          tempFavoritesIcon = ['🤍', '💚', 'heartGreen'];
          break;
        case 'heartBlue':
          tempFavoritesIcon = ['🤍', '💙', 'heartBlue'];
          break;
        case 'heartPurple':
          tempFavoritesIcon = ['🤍', '💜', 'heartPurple'];
          break;
        case 'heartBrown':
          tempFavoritesIcon = ['🤍', '🤎', 'heartBrown'];
          break;
        case 'heartBlack':
          tempFavoritesIcon = ['🤍', '🖤', 'heartBlack'];
          break;
        case 'heartFire':
          tempFavoritesIcon = ['🤍', '❤️‍🔥', 'heartFire'];
          break;
        case 'heartPink':
          tempFavoritesIcon = ['🤍', '💗', 'heartPink'];
          break;
        case 'heartStar':
          tempFavoritesIcon = ['🤍', '💖', 'heartStar'];
          break;
        case 'heartPresent':
          tempFavoritesIcon = ['🤍', '💝', 'heartPresent'];
          break;
        case 'star':
          tempFavoritesIcon = ['🌟', '⭐', 'star'];
          break;
        case 'heartFace':
          tempFavoritesIcon = ['😶', '😍', 'heartFace'];
          break;
        case 'starFace':
          tempFavoritesIcon = ['😑', '🤩', 'starFace'];
          break;
        case 'monkeyFace':
          tempFavoritesIcon = ['🙈', '🐵', 'monkeyFace'];
          break;
        case 'eye':
          tempFavoritesIcon = ['⚪', '👁️', 'eye'];
          break;
        case 'thumbsUp':
          tempFavoritesIcon = ['✋🏻', '👍', 'thumbsUp'];
          break;
        case 'nazar':
          tempFavoritesIcon = ['⚪', '🧿', 'nazar'];
          break;
        case 'disk':
          tempFavoritesIcon = ['💿', '📀', 'disk'];
          break;
        case 'nest':
          tempFavoritesIcon = ['🪹', '🪺', 'nest'];
          break;
        case 'leaves':
          tempFavoritesIcon = ['🍂', '🍃', 'leaves'];
          break;
        case 'ship':
          tempFavoritesIcon = ['🚢', '⚓', 'ship'];
          break;
        case 'earthAmerica':
          tempFavoritesIcon = ['⚪', '🌎', 'earthAmerica'];
          break;
        case 'earthAfrica':
          tempFavoritesIcon = ['⚪', '🌍', 'earthAfrica'];
          break;
        case 'earthAsia':
          tempFavoritesIcon = ['⚪', '🌏', 'earthAsia'];
          break;
        case 'volcano':
          tempFavoritesIcon = ['🗻', '🌋', 'volcano'];
          break;
        case 'cloudySunny':
          tempFavoritesIcon = ['☁️', '☀️', 'cloudySunny'];
          break;
        case 'rainy':
          tempFavoritesIcon = ['🌧️', '💧', 'rainy'];
          break;
        case 'snowy':
          tempFavoritesIcon = ['🌨️', '❄️', 'snowy'];
          break;
        case 'umbrella':
          tempFavoritesIcon = ['🌂', '☂️', 'umbrella'];
          break;
        case 'moon':
          tempFavoritesIcon = ['🌑', '🌕', 'moon'];
          break;
        case 'moonFace':
          tempFavoritesIcon = ['🌚', '🌝', 'moonFace'];
          break;
        case 'sunFace':
          tempFavoritesIcon = ['☀️', '🌞', 'sunFace'];
          break;
        case 'noYes':
          tempFavoritesIcon = ['❌', '⭕', 'noYes'];
          break;
        case 'exclamation':
          tempFavoritesIcon = ['❕', '❗', 'exclamation'];
          break;
        default:
          return state;
      }
      return {
        ...state,
        favoritesIcon: [...tempFavoritesIcon],
        areOptionsSettingsChanged: true
      }
    }
    case AUTOSAVE_TOGGLE:
      switch (action.payload) {
        case 'autoSaveSearch':
          return {
            ...state,
            autoSaveSearch: !state.autoSaveSearch,
            areUserSettingsChanged: true
          }
        case 'autoSaveFilters':
          return {
            ...state,
            autoSaveFilters: !state.autoSaveFilters,
            areUserSettingsChanged: true
          }
        case 'autoSaveOptions':
          return {
            ...state,
            autoSaveOptions: !state.autoSaveOptions,
            areUserSettingsChanged: true
          }
        default:
          return state;
      }
    case LOAD_SETTINGS:
      const { id, userOptions } = action.payload;
      switch (id) {
        case 'loadSearchSettings':
          return {
            ...state,
            searchQuery: userOptions.searchQuery,
            searchQueryFavorites: userOptions.searchQueryF,
            searchByCheckboxOptions: generateSearchCheckboxOptions(getSearchOptions(userOptions), false),
            areSearchSettingsChanged: false
          }
        case 'loadFiltersSettings':
          return {
            ...state,
            isAscending: userOptions.isAscending,
            selectedOrder: userOptions.orderBy,
            selectedFilters: userOptions.selectedFilters,
            isAscendingFavorites: userOptions.isAscendingF,
            selectedOrderFavorites: userOptions.orderByF,
            selectedFiltersFavorites: userOptions.selectedFiltersF,
            areFilterSettingsChanged: false
          }
        case 'loadOptionsSettings':
          console.log(userOptions.favoritesIcon);
          return {
            ...state,
            isFavoritesTogether: userOptions.isFavoritesTogether,
            selectedCardsPerPage: userOptions.selectedCardsPerPage,
            selectedCardsPerPageFavorites: userOptions.selectedCardsPerPageF,
            cardRadioOptions: generateCardOptions(getCardOptions(userOptions), true),
            cardCheckboxOptions: generateCardOptions(getCardOptions(userOptions), false),
            favoritesIcon: userOptions.favoritesIcon,
            detailRadioOptions: generateCardOptions(getDetailOptions(userOptions), true),
            detailCheckboxOptions: generateCardOptions(getDetailOptions(userOptions), false),
            areOptionsSettingsChanged: false
          }
        default:
          return state;
      }
    case SAVE_SETTINGS:
      switch (action.payload) {
        case 'saveSearchSettings':
          const searchSettings = {
            searchQuery: state.searchQuery,
            searchQueryF: state.searchQueryFavorites,
            searchBy: state.searchByCheckboxOptions.reduce((array, option) => {
              if (option.value) {
                array.push(option.name);
              }
              return array;
            }, []),
            searchByF: state.searchByCheckboxOptions.reduce((array, option) => {
              if (option.valueF) {
                array.push(option.nameF);
              }
              return array;
            }, []),
          }
          console.log(searchSettings);
          return {
            ...state,
            searchSettings: searchSettings,
            areSearchSettingsChanged: false
          }
        case 'saveFiltersSettings':
          const filterSettings = {
            isAscending: state.isAscending,
            isAscendingF: state.isAscendingFavorites,
            orderBy: state.selectedOrder,
            orderByF: state.selectedOrderFavorites,
            selectedFilters: state.selectedFilters,
            selectedFiltersF: state.selectedFiltersFavorites
          }
          return {
            ...state,
            filterSettings: filterSettings,
            areFilterSettingsChanged: false
          }
        case 'saveOptionsSettings':
          const optionsSettings = {
            isFavoritesTogether: state.isFavoritesTogether,
            selectedCardsPerPage: state.selectedCardsPerPage,
            selectedCardsPerPageF: state.selectedCardsPerPageFavorites,
            verticalCardsPerRow: state.cardRadioOptions[0].value,
            verticalCardsPerRowF: state.cardRadioOptions[0].valueF,
            horizontalCardsPerRow: state.cardRadioOptions[1].value,
            horizontalCardsPerRowF: state.cardRadioOptions[1].valueF,
            infoLabels: state.cardCheckboxOptions.reduce((array, option) => {
              if (option.value) {
                array.push(option.name);
              }
              return array;
            }, []),
            infoLabelsF: state.cardCheckboxOptions.reduce((array, option) => {
              if (option.valueF) {
                array.push(option.nameF);
              }
              return array;
            }, []),
            infoPosition: state.cardRadioOptions[2].value,
            infoPositionF: state.cardRadioOptions[2].valueF,
            textPositionX: state.cardRadioOptions[3].value,
            textPositionXF: state.cardRadioOptions[3].valueF,
            textPositionY: state.cardRadioOptions[4].value,
            textPositionYF: state.cardRadioOptions[4].valueF,
            favoritesIcon: state.favoritesIcon,
            episodeInfo: state.detailCheckboxOptions.reduce((array, option) => {
              if (option.value) {
                array.push(option.name);
              }
              return array;
            }, []),
            episodesView: state.detailRadioOptions[0].value,
            episodeListView: state.detailRadioOptions[1].value,
            charactersView: state.detailRadioOptions[2].value,
          }
          return {
            ...state,
            optionsSettings: optionsSettings,
            areOptionsSettingsChanged: false
          }
        case 'saveUserSettings':
          const userSettings = {
            autoSaveSearch: state.autoSaveSearch,
            autoSaveFilters: state.autoSaveFilters,
            autoSaveOptions: state.autoSaveOptions,
            favorites: state.allFavorites.map(favorite => favorite?.id),
            homeBackground: state.homeBackground,
            favoritesBackground: state.favoritesBackground,
            detailBackground: state.detailBackground,
            loadingScreen: state.loadingScreen
          }
          return {
            ...state,
            userSettings: userSettings,
            areUserSettingsChanged: false
          }
        default:
          return state;
      }
    default:
      return state;
  }
}
export default reducer;