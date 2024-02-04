// const verticalCardsPerRowSelected = localStorage.getItem('verticalCardsPerRow'); 
// const verticalCardsPerRowFSelected = localStorage.getItem('verticalCardsPerRowF'); 
// const horizontalCardsPerRowSelected = localStorage.getItem('horizontalCardsPerRow'); 
// const horizontalCardsPerRowFSelected = localStorage.getItem('horizontalCardsPerRowF'); 
// const infoPositionSelected = localStorage.getItem('infoPosition'); 
// const infoPositionFSelected = localStorage.getItem('infoPositionF'); 
// const textPositionXSelected = localStorage.getItem('textPositionX'); 
// const textPositionXFSelected = localStorage.getItem('textPositionXF'); 
// const textPositionYSelected = localStorage.getItem('textPositionY'); 
// const textPositionYFSelected = localStorage.getItem('textPositionYF'); 
// const favoritesIconSelected = localStorage.getItem('favoritesIcon'); 
// const episodesViewSelected = localStorage.getItem('episodesView'); 
// const episodeListViewSelected = localStorage.getItem('episodeListView'); 
// const charactersViewSelected = localStorage.getItem('charactersView');
import { useAuth } from './context/AuthContext.js';

const { user } = useAuth;

const getUserOptions = () => {
  if (user) {
    return {
      searchByCheckbox: {
        name: 'searchBy',
        mainTitle: 'Search By:',
        titles: ['Id', 'Name', 'Origin', 'Location'],
        ids: ['idCheckbox', 'nameCheckbox', 'originCheckbox', 'locationCheckbox'],
        checked: user.searchBy,
        checkedFavorites: user.searchByF
      },
      orderByOptions: {
        title: 'orderBy',
        options: ['Random', 'Id', 'Name', 'Status', 'Species', 'Gender', 'Origin', 'Location'],
        checked: user.orderBy,
        checkedFavorites: user.orderByF
      },
      homeCardsPerPage: user.selectedCardsPerPage,
      favoritesCardsPerPage: user.selectedCardsPerPageF,
      cardOptions: [
        {
          name: 'verticalCardsPerRow',
          nameF: 'verticalCardsPerRowF',
          mainTitle: 'Vertical Cards Per Row:',
          titles: ['2', '3', '4', '5', '6', '7', '8', '9', '10'],
          ids: ['twoCards', 'threeCards', 'fourCards', 'fiveCards', 'sixCards', 'sevenCards', 'eightCards', 'nineCards', 'tenCards'],
          idsF: ['twoCardsF', 'threeCardsF', 'fourCardsF', 'fiveCardsF', 'sixCardsF', 'sevenCardsF', 'eightCardsF', 'nineCardsF', 'tenCardsF'],
          checked: user.verticalCardsPerRow,
          checkedFavorites: user.verticalCardsPerRowF
        },
        {
          name: 'horizontalCardsPerRow',
          nameF: 'horizontalCardsPerRowF',
          mainTitle: 'Horizontal Cards Per Row:',
          titles: ['2', '3', '4'],
          ids: ['twoCards', 'threeCards', 'fourCards'],
          idsF: ['twoCards', 'threeCards', 'fourCards'],
          checked: user.horizontalCardsPerRow,
          checkedFavorites: user.horizontalCardsPerRowF
        },
        {
          name: 'infoLabels',
          nameF: 'infoLabelsF',
          mainTitle: 'Info Labels:',
          titles: ['Id', 'Name', 'Status', 'Species', 'Type', 'Gender', 'Origin', 'Location'],
          ids: ['idView', 'nameView', 'statusView', 'speciesView', 'typeView', 'genderView', 'originView', 'locationView'],
          idsF: ['idView', 'nameView', 'statusView', 'speciesView', 'typeView', 'genderView', 'originView', 'locationView'],
          checked: user.infoLabels,
          checkedFavorites: user.infoLabelsF
        },
        {
          name: 'infoPosition',
          nameF: 'infoPositionF',
          mainTitle: 'Info Position:',
          titles: ['Over', 'Above', 'Right', 'Below', 'Left'],
          ids: ['over', 'above', 'right', 'below', 'left'],
          idsF: ['over', 'above', 'right', 'below', 'left'],
          checked: user.infoPosition,
          checkedFavorites: user.infoPositionF
        },
        {
          name: 'textPositionX',
          nameF: 'textPositionXF',
          mainTitle: 'Text Position X:',
          titles: ['Left', 'Center', 'Right', 'Justify'],
          ids: ['leftX', 'centerX', 'rightX', 'justify'],
          idsF: ['leftX', 'centerX', 'rightX', 'justify'],
          checked: user.textPositionX,
          checkedFavorites: user.textPositionXF
        },
        {
          name: 'textPositionY',
          nameF: 'textPositionYF',
          mainTitle: 'Text Position Y:',
          titles: ['Top', 'Center', 'Bottom', 'Space-Around', 'Space-Between', 'Space-Evenly'],
          ids: ['top', 'centerY', 'bottom', 'space-around', 'space-between', 'space-evenly'],
          idsF: ['top', 'centerY', 'bottom', 'space-around', 'space-between', 'space-evenly'],
          checked: user.textPositionY,
          checkedFavorites: user.textPositionYF
        }
      ],
      favoritesIconRadio: {
        name: 'favoritesIcon',
        mainTitle: 'Favorites Icon:',
        titles: ['🤍❤️', '🤍🧡', '🤍💛', '🤍💚', '🤍💙', '🤍💜', '🤍🤎', '🤍🖤', '🤍❤️‍🔥', '🤍💗', '🤍💖',
          '🤍💝', '🌟⭐', '😶😍', '😑🤩', '🙈🐵', '⚪👁️', '✋🏻👍', '⚪🧿', '💿📀', '🪹🪺', '🍂🍃', '🚢⚓',
          '⚪🌎', '⚪🌍', '⚪🌏', '🗻🌋', '☁️☀️', '🌧️💧', '🌨️❄️', '🌂☂️', '🌑🌕', '🌚🌝', '☀️🌞', '❌⭕',
          '❕❗'],
        ids: ['heart', 'heartOrange', 'heartYellow', 'heartGreen', 'heartBlue', 'heartPurple', 'heartBrown', 'heartBlack',
          'heartFire', 'heartPink', 'heartStar', 'heartPresent', 'star', 'heartFace', 'starFace', 'monkeyFace', 'eye',
          'thumbsUp', 'nazar', 'disk', 'nest', 'leaves', 'ship', 'earthAmerica', 'earthAfrica', 'earthAsia', 'volcano',
          'cloudySunny', 'rainy', 'snowy', 'umbrella', 'moon', 'moonFace', 'sunFace', 'noYes', 'exclamation'],
        checked: user.favoritesIcon
      },
      detailOptions: [
        {
          name: 'episodeInfo',
          mainTitle: 'Episode Info:',
          titles: ['Episode Name', 'Episode Code', 'Air Date', 'Characters'],
          ids: ['episodeNameView', 'episodeCodeView', 'episodeDateView', 'episodeCharactersView'],
          checked: user.episodeInfo
        },
        {
          name: 'episodesView',
          mainTitle: 'Episodes View:',
          titles: ['Hidden (Deployable)', 'Shown (Printed)'],
          ids: ['hiddenEpisodes', 'shownEpisodes'],
          checked: user.episodesView
        },
        {
          name: 'episodeListView',
          mainTitle: 'Characters Info View:',
          titles: ['Character Names', 'Character Images', 'Character Images And Names'],
          ids: ['characterNames', 'characterImages', 'characterImagesAndNames'],
          checked: user.episodeListView
        },
        {
          name: 'charactersView',
          mainTitle: 'Characters View:',
          titles: ['Hidden (Deployable)', 'Shown (Printed)'],
          ids: ['hiddenCharacters', 'shownCharacters'],
          checked: user.charactersView
        }
      ]
    }
  }
  return {
    searchByCheckbox: {
      name: 'searchBy',
      mainTitle: 'Search By:',
      titles: ['Id', 'Name', 'Origin', 'Location'],
      ids: ['idCheckbox', 'nameCheckbox', 'originCheckbox', 'locationCheckbox'],
      checked: ['nameCheckbox'],
      checkedFavorites: ['nameCheckbox']
    },
    orderByOptions: {
      title: 'orderBy',
      options: ['Random', 'Id', 'Name', 'Status', 'Species', 'Gender', 'Origin', 'Location'],
      checked: 'Id',
      checkedFavorites: 'Id'
    },
    homeCardsPerPage: 8,
    favoritesCardsPerPage: 8,
    cardOptions: [
      {
        name: 'verticalCardsPerRow',
        nameF: 'verticalCardsPerRowF',
        mainTitle: 'Vertical Cards Per Row:',
        titles: ['2', '3', '4', '5', '6', '7', '8', '9', '10'],
        ids: ['twoCards', 'threeCards', 'fourCards', 'fiveCards', 'sixCards', 'sevenCards', 'eightCards', 'nineCards', 'tenCards'],
        idsF: ['twoCardsF', 'threeCardsF', 'fourCardsF', 'fiveCardsF', 'sixCardsF', 'sevenCardsF', 'eightCardsF', 'nineCardsF', 'tenCardsF'],
        checked: 'sixCards',
        checkedFavorites: 'tenCardsF'
      },
      {
        name: 'horizontalCardsPerRow',
        nameF: 'horizontalCardsPerRowF',
        mainTitle: 'Horizontal Cards Per Row:',
        titles: ['2', '3', '4'],
        ids: ['twoCards', 'threeCards', 'fourCards'],
        idsF: ['twoCards', 'threeCards', 'fourCards'],
        checked: 'fourCards',
        checkedFavorites: 'twoCards'
      },
      {
        name: 'infoLabels',
        nameF: 'infoLabelsF',
        mainTitle: 'Info Labels:',
        titles: ['Id', 'Name', 'Status', 'Species', 'Type', 'Gender', 'Origin', 'Location'],
        ids: ['idView', 'nameView', 'statusView', 'speciesView', 'typeView', 'genderView', 'originView', 'locationView'],
        idsF: ['idView', 'nameView', 'statusView', 'speciesView', 'typeView', 'genderView', 'originView', 'locationView'],
        checked: ['idView', 'nameView', 'statusView', 'speciesView', 'genderView'],
        checkedFavorites: ['nameView', 'statusView', 'speciesView', 'genderView']
      },
      {
        name: 'infoPosition',
        nameF: 'infoPositionF',
        mainTitle: 'Info Position:',
        titles: ['Over', 'Above', 'Right', 'Below', 'Left'],
        ids: ['over', 'above', 'right', 'below', 'left'],
        idsF: ['over', 'above', 'right', 'below', 'left'],
        checked: 'below',
        checkedFavorites: 'left'
      },
      {
        name: 'textPositionX',
        nameF: 'textPositionXF',
        mainTitle: 'Text Position X:',
        titles: ['Left', 'Center', 'Right', 'Justify'],
        ids: ['leftX', 'centerX', 'rightX', 'justify'],
        idsF: ['leftX', 'centerX', 'rightX', 'justify'],
        checked: 'leftX',
        checkedFavorites: 'centerX'
      },
      {
        name: 'textPositionY',
        nameF: 'textPositionYF',
        mainTitle: 'Text Position Y:',
        titles: ['Top', 'Center', 'Bottom', 'Space-Around', 'Space-Between', 'Space-Evenly'],
        ids: ['top', 'centerY', 'bottom', 'space-around', 'space-between', 'space-evenly'],
        idsF: ['top', 'centerY', 'bottom', 'space-around', 'space-between', 'space-evenly'],
        checked: 'top',
        checkedFavorites: 'bottom'
      }
    ],
    favoritesIconRadio: {
      name: 'favoritesIcon',
      mainTitle: 'Favorites Icon:',
      titles: ['🤍❤️', '🤍🧡', '🤍💛', '🤍💚', '🤍💙', '🤍💜', '🤍🤎', '🤍🖤', '🤍❤️‍🔥', '🤍💗', '🤍💖',
        '🤍💝', '🌟⭐', '😶😍', '😑🤩', '🙈🐵', '⚪👁️', '✋🏻👍', '⚪🧿', '💿📀', '🪹🪺', '🍂🍃', '🚢⚓',
        '⚪🌎', '⚪🌍', '⚪🌏', '🗻🌋', '☁️☀️', '🌧️💧', '🌨️❄️', '🌂☂️', '🌑🌕', '🌚🌝', '☀️🌞', '❌⭕',
        '❕❗'],
      ids: ['heart', 'heartOrange', 'heartYellow', 'heartGreen', 'heartBlue', 'heartPurple', 'heartBrown', 'heartBlack',
        'heartFire', 'heartPink', 'heartStar', 'heartPresent', 'star', 'heartFace', 'starFace', 'monkeyFace', 'eye',
        'thumbsUp', 'nazar', 'disk', 'nest', 'leaves', 'ship', 'earthAmerica', 'earthAfrica', 'earthAsia', 'volcano',
        'cloudySunny', 'rainy', 'snowy', 'umbrella', 'moon', 'moonFace', 'sunFace', 'noYes', 'exclamation'],
      checked: 'heart'
    },
    detailOptions: [
      {
        name: 'episodeInfo',
        mainTitle: 'Episode Info:',
        titles: ['Episode Name', 'Episode Code', 'Air Date', 'Characters'],
        ids: ['episodeNameView', 'episodeCodeView', 'episodeDateView', 'episodeCharactersView'],
        checked: ['episodeNameView', 'episodeCodeView', 'episodeDateView', 'episodeCharactersView']
      },
      {
        name: 'episodesView',
        mainTitle: 'Episodes View:',
        titles: ['Hidden (Deployable)', 'Shown (Printed)'],
        ids: ['hiddenEpisodes', 'shownEpisodes'],
        checked: 'shownEpisodes'
      },
      {
        name: 'episodeListView',
        mainTitle: 'Characters Info View:',
        titles: ['Character Names', 'Character Images', 'Character Images And Names'],
        ids: ['characterNames', 'characterImages', 'characterImagesAndNames'],
        checked: 'characterImagesAndNames'
      },
      {
        name: 'charactersView',
        mainTitle: 'Characters View:',
        titles: ['Hidden (Deployable)', 'Shown (Printed)'],
        ids: ['hiddenCharacters', 'shownCharacters'],
        checked: 'shownCharacters'
      }
    ]
  }
}

export const {
  searchByCheckbox,
  orderByOptions,
  homeCardsPerPage,
  favoritesCardsPerPage,
  cardOptions,
  favoritesIconRadio,
  detailOptions,
} = getUserOptions();

export const filterOptions = {
  status: ['Alive', 'Dead', 'unknown Status'],
  species: ['Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological Creature', 'Animal', 'Robot', 'Cronenberg', 'Disease', 'unknown Species'],
  gender: ['Male', 'Female', 'Genderless', 'unknown Gender']
}