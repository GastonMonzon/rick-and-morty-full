// // const verticalCardsPerRowSelected = localStorage.getItem('verticalCardsPerRow'); 
// // const verticalCardsPerRowFSelected = localStorage.getItem('verticalCardsPerRowF'); 
// // const horizontalCardsPerRowSelected = localStorage.getItem('horizontalCardsPerRow'); 
// // const horizontalCardsPerRowFSelected = localStorage.getItem('horizontalCardsPerRowF'); 
// // const infoPositionSelected = localStorage.getItem('infoPosition'); 
// // const infoPositionFSelected = localStorage.getItem('infoPositionF'); 
// // const textPositionXSelected = localStorage.getItem('textPositionX'); 
// // const textPositionXFSelected = localStorage.getItem('textPositionXF'); 
// // const textPositionYSelected = localStorage.getItem('textPositionY'); 
// // const textPositionYFSelected = localStorage.getItem('textPositionYF'); 
// // const favoritesIconSelected = localStorage.getItem('favoritesIcon'); 
// // const episodesViewSelected = localStorage.getItem('episodesView'); 
// // const episodeListViewSelected = localStorage.getItem('episodeListView'); 
// // const charactersViewSelected = localStorage.getItem('charactersView');
import axios from 'axios';
import { useAuth } from './context/AuthContext.js';

const { userOptions } = useAuth;

const getUserOptions = () => {
  if (userOptions) {
    return {
      searchByCheckbox: {
        name: 'searchBy',
        mainTitle: 'Search By:',
        titles: ['Id', 'Name', 'Origin', 'Location'],
        ids: ['idCheckbox', 'nameCheckbox', 'originCheckbox', 'locationCheckbox'],
        checked: userOptions.searchBy,
        checkedFavorites: userOptions.searchByF
      },
      orderByOptions: {
        title: 'orderBy',
        options: ['Random', 'Id', 'Name', 'Status', 'Species', 'Gender', 'Origin', 'Location'],
        checked: userOptions.orderBy,
        checkedFavorites: userOptions.orderByF
      },
      homeCardsPerPage: userOptions.selectedCardsPerPage,
      favoritesCardsPerPage: userOptions.selectedCardsPerPageF,
      cardOptions: [
        {
          name: 'verticalCardsPerRow',
          nameF: 'verticalCardsPerRowF',
          mainTitle: 'Vertical Cards Per Row:',
          titles: ['2', '3', '4', '5', '6', '7', '8', '9', '10'],
          ids: ['twoCards', 'threeCards', 'fourCards', 'fiveCards', 'sixCards', 'sevenCards', 'eightCards', 'nineCards', 'tenCards'],
          idsF: ['twoCardsF', 'threeCardsF', 'fourCardsF', 'fiveCardsF', 'sixCardsF', 'sevenCardsF', 'eightCardsF', 'nineCardsF', 'tenCardsF'],
          checked: userOptions.verticalCardsPerRow,
          checkedFavorites: userOptions.verticalCardsPerRowF
        },
        {
          name: 'horizontalCardsPerRow',
          nameF: 'horizontalCardsPerRowF',
          mainTitle: 'Horizontal Cards Per Row:',
          titles: ['2', '3', '4'],
          ids: ['twoCards', 'threeCards', 'fourCards'],
          idsF: ['twoCards', 'threeCards', 'fourCards'],
          checked: userOptions.horizontalCardsPerRow,
          checkedFavorites: userOptions.horizontalCardsPerRowF
        },
        {
          name: 'infoLabels',
          nameF: 'infoLabelsF',
          mainTitle: 'Info Labels:',
          titles: ['Id', 'Name', 'Status', 'Species', 'Type', 'Gender', 'Origin', 'Location'],
          ids: ['idView', 'nameView', 'statusView', 'speciesView', 'typeView', 'genderView', 'originView', 'locationView'],
          idsF: ['idView', 'nameView', 'statusView', 'speciesView', 'typeView', 'genderView', 'originView', 'locationView'],
          checked: userOptions.infoLabels,
          checkedFavorites: userOptions.infoLabelsF
        },
        {
          name: 'infoPosition',
          nameF: 'infoPositionF',
          mainTitle: 'Info Position:',
          titles: ['Over', 'Above', 'Right', 'Below', 'Left'],
          ids: ['over', 'above', 'right', 'below', 'left'],
          idsF: ['over', 'above', 'right', 'below', 'left'],
          checked: userOptions.infoPosition,
          checkedFavorites: userOptions.infoPositionF
        },
        {
          name: 'textPositionX',
          nameF: 'textPositionXF',
          mainTitle: 'Text Position X:',
          titles: ['Left', 'Center', 'Right', 'Justify'],
          ids: ['leftX', 'centerX', 'rightX', 'justify'],
          idsF: ['leftX', 'centerX', 'rightX', 'justify'],
          checked: userOptions.textPositionX,
          checkedFavorites: userOptions.textPositionXF
        },
        {
          name: 'textPositionY',
          nameF: 'textPositionYF',
          mainTitle: 'Text Position Y:',
          titles: ['Top', 'Center', 'Bottom', 'Space-Around', 'Space-Between', 'Space-Evenly'],
          ids: ['top', 'centerY', 'bottom', 'space-around', 'space-between', 'space-evenly'],
          idsF: ['top', 'centerY', 'bottom', 'space-around', 'space-between', 'space-evenly'],
          checked: userOptions.textPositionY,
          checkedFavorites: userOptions.textPositionYF
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
        checked: userOptions.favoritesIcon
      },
      detailOptions: [
        {
          name: 'episodeInfo',
          mainTitle: 'Episode Info:',
          titles: ['Episode Name', 'Episode Code', 'Air Date', 'Characters'],
          ids: ['episodeNameView', 'episodeCodeView', 'episodeDateView', 'episodeCharactersView'],
          checked: userOptions.episodeInfo
        },
        {
          name: 'episodesView',
          mainTitle: 'Episodes View:',
          titles: ['Hidden (Deployable)', 'Shown (Printed)'],
          ids: ['hiddenEpisodes', 'shownEpisodes'],
          checked: userOptions.episodesView
        },
        {
          name: 'episodeListView',
          mainTitle: 'Characters Info View:',
          titles: ['Character Names', 'Character Images', 'Character Images And Names'],
          ids: ['characterNames', 'characterImages', 'characterImagesAndNames'],
          checked: userOptions.episodeListView
        },
        {
          name: 'charactersView',
          mainTitle: 'Characters View:',
          titles: ['Hidden (Deployable)', 'Shown (Printed)'],
          ids: ['hiddenCharacters', 'shownCharacters'],
          checked: userOptions.charactersView
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

// export const backgroundVideoNumber = countFilesWithExtension('./assets/loadingGifs', '.gif');
// export const backgroundGifsNumber = countFilesWithExtension('./assets/videos', '.mp4');

async function checkFilesCount(type, extension) {
  try {
    const { data } = await axios.post('http://localhost:3001/count', { type, extension });
    return data;
  } catch (error) {
    console.error('Error counting files', error);
  }
}

export const backgroundImagesNumber = checkFilesCount('images', '.jpg') + checkFilesCount('images', '.png');
export const backgroundVideoNumber = checkFilesCount('videos', '.mp4');
export const backgroundGifsNumber = checkFilesCount('gifs', '.gif');
console.log(backgroundImagesNumber);
console.log(backgroundVideoNumber);
console.log(backgroundGifsNumber);