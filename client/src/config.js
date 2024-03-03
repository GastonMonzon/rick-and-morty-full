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
        idsF: ['idCheckboxF', 'nameCheckboxF', 'originCheckboxF', 'locationCheckboxF'],
        checked: userOptions.searchBy,
        checkedFavorites: userOptions.searchByF
      },
      orderByOptions: {
        title: 'orderBy',
        options: ['Random', 'Id', 'Name', 'Status', 'Species', 'Gender', 'Origin', 'Location'],
        checked: userOptions.orderBy,
        checkedFavorites: userOptions.orderByF
      },
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
        selectedIcon: userOptions.favoritesIcon
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
      nameF: 'searchByF',
      mainTitle: 'Search By:',
      titles: ['Id', 'Name', 'Origin', 'Location'],
      ids: ['idCheckbox', 'nameCheckbox', 'originCheckbox', 'locationCheckbox'],
      idsF: ['idCheckboxF', 'nameCheckboxF', 'originCheckboxF', 'locationCheckboxF'],
      checked: ['nameCheckbox'],
      checkedFavorites: ['nameCheckboxF']
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
        ids: ['twoCardsH', 'threeCardsH', 'fourCardsH'],
        idsF: ['twoCardsHF', 'threeCardsHF', 'fourCardsHF'],
        checked: 'fourCardsH',
        checkedFavorites: 'twoCardsHF'
      },
      {
        name: 'infoLabels',
        nameF: 'infoLabelsF',
        mainTitle: 'Info Labels:',
        titles: ['Id', 'Name', 'Status', 'Species', 'Type', 'Gender', 'Origin', 'Location'],
        ids: ['idView', 'nameView', 'statusView', 'speciesView', 'typeView', 'genderView', 'originView', 'locationView'],
        idsF: ['idViewF', 'nameViewF', 'statusViewF', 'speciesViewF', 'typeViewF', 'genderViewF', 'originViewF', 'locationViewF'],
        checked: ['idView', 'nameView', 'statusView', 'speciesView', 'genderView'],
        checkedFavorites: ['nameViewF', 'statusViewF', 'speciesViewF', 'genderViewF']
      },
      {
        name: 'infoPosition',
        nameF: 'infoPositionF',
        mainTitle: 'Info Position:',
        titles: ['Over', 'Above', 'Right', 'Below', 'Left'],
        ids: ['over', 'above', 'right', 'below', 'left'],
        idsF: ['overF', 'aboveF', 'rightF', 'belowF', 'leftF'],
        checked: 'below',
        checkedFavorites: 'leftF'
      },
      {
        name: 'textPositionX',
        nameF: 'textPositionXF',
        mainTitle: 'Text Position X:',
        titles: ['Left', 'Center', 'Right', 'Justify'],
        ids: ['leftX', 'centerX', 'rightX', 'justify'],
        idsF: ['leftXF', 'centerXF', 'rightXF', 'justifyF'],
        checked: 'leftX',
        checkedFavorites: 'centerXF'
      },
      {
        name: 'textPositionY',
        nameF: 'textPositionYF',
        mainTitle: 'Text Position Y:',
        titles: ['Top', 'Center', 'Bottom', 'Space-Around', 'Space-Between', 'Space-Evenly'],
        ids: ['top', 'centerY', 'bottom', 'space-around', 'space-between', 'space-evenly'],
        idsF: ['topF', 'centerYF', 'bottomF', 'space-aroundF', 'space-betweenF', 'space-evenlyF'],
        checked: 'top',
        checkedFavorites: 'bottomF'
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
      selectedIcon: ['🤍', '❤️']
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
  cardOptions,
  favoritesIconRadio,
  detailOptions,
} = getUserOptions();

export const filterOptions = {
  status: ['Alive', 'Dead', 'unknown Status'],
  species: ['Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological Creature', 'Animal', 'Robot', 'Cronenberg', 'Disease', 'unknown Species'],
  gender: ['Male', 'Female', 'Genderless', 'unknown Gender']
}