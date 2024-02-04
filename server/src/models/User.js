import { DataTypes } from 'sequelize';

const getUserModel =  (sequelize) => {
  const User = sequelize.define('user', {
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    surName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true
    },
    homeBackground: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'backgroundVideo.mp4'
    },
    favoritesBackground: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'backgroundVideo.mp4'
    },
    detailBackground: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'backgroundVideo.mp4'
    },
    loadingScreen: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'backgroundVideo.mp4'
    },
    searchBy: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ['nameCheckbox']
    },
    searchByF: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ['nameCheckbox']
    },
    orderBy: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Id'
    },
    orderByF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Id'
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
      defaultValue: 'sixCards'
    },
    horizontalCardsPerRow: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'fourCards'
    },
    horizontalCardsPerRowF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'fourCards'
    },
    infoLabels: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ['nameView', 'statusView', 'speciesView', 'genderView'],
    },
    infoLabelsF: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ['nameView', 'statusView', 'speciesView', 'genderView'],
    },
    infoPosition: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'below'
    },
    infoPositionF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'below'
    },
    textPositionX: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'leftX'
    },
    textPositionXF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'leftX'
    },
    textPositionY: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'top'
    },
    textPositionYF: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'top'
    },
    favoritesIcon: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'heart'
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
