import { DataTypes } from 'sequelize';

const getUserModel =  (sequelize) => {
  const User = sequelize.define('user', {
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    autoSaveSearch: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    autoSaveFilters: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    autoSaveOptions: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      defaultValue: []
    },
    homeBackground: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'backgroundVideo1'
    },
    favoritesBackground: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'backgroundVideo1'
    },
    detailBackground: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'backgroundVideo1'
    },
    loadingScreen: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'backgroundVideo1'
    },
    searchBy: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ['nameCheckbox']
    },
    searchByF: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ['nameCheckboxF']
    },
    searchQuery: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    searchQueryF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    isAscending: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    isAscendingF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    orderBy: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Id'
    },
    orderByF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'IdF'
    },
    selectedFilters: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    selectedFiltersF: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    isFavoritesTogether: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    selectedCardsPerPage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 8
    },
    selectedCardsPerPageF: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 8
    },
    verticalCardsPerRow: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'sixCards'
    },
    verticalCardsPerRowF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'sixCardsF'
    },
    horizontalCardsPerRow: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'fourCardsH'
    },
    horizontalCardsPerRowF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'fourCardsHF'
    },
    infoLabels: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ['nameView', 'statusView', 'speciesView', 'genderView'],
    },
    infoLabelsF: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ['nameViewF', 'statusViewF', 'speciesViewF', 'genderViewF'],
    },
    infoPosition: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'below'
    },
    infoPositionF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'belowF'
    },
    textPositionX: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'leftX'
    },
    textPositionXF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'leftXF'
    },
    textPositionY: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'top'
    },
    textPositionYF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'topF'
    },
    favoritesIcon: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ['🤍', '❤️', 'heart']
    },
    episodeInfo: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ['episodeNameView', 'episodeCodeView', 'episodeDateView', 'episodeCharactersView']
    },
    episodesView: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'shownEpisodes'
    },
    episodeListView: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:  'characterImagesAndNames'
    },
    charactersView: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'shownCharacters'
    }
  }, { timestamps: false });
  return User;
};

export default getUserModel;
