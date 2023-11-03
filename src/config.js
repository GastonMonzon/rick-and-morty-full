export const searchByCheckbox = {
    name: 'searchBy',
    mainTitle: 'Search By:',
    titles: ['Id', 'Name', 'Origin', 'Location'],
    ids: ['idCheckbox', 'nameCheckbox', 'originCheckbox', 'locationCheckbox'],
    checked: ['nameCheckbox']
}
export const filters = {
    status: ['Alive', 'Dead', 'unknown Status'],
    species: ['Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological Creature', 'Animal', 'Robot', 'Cronenberg', 'Disease', 'unknown Species'],
    gender: ['Male', 'Female', 'Genderless', 'unknown Gender']
}
export const orderBySelect = {
    title: 'orderBy',
    options: ['Random', 'Id', 'Name', 'Status', 'Species', 'Gender', 'Origin', 'Location'],
    default: 'Id'
}
export const verticalCardsPerRowRadio = {
    name: 'verticalCardsPerRow',
    mainTitle: 'Vertical Cards Per Row:',
    titles: ['2', '3', '4', '5', '6', '7', '8', '9', '10'],
    ids: ['twoCards', 'threeCards', 'fourCards', 'fiveCards', 'sixCards', 'sevenCards', 'eightCards', 'nineCards', 'tenCards'],
    checked: 'sixCards'
}
export const horizontalCardsPerRowRadio = {
    name: 'horizontalCardsPerRow',
    mainTitle: 'Horizontal Cards Per Row:',
    titles: ['2', '3', '4'],
    ids: ['twoCards', 'threeCards', 'fourCards'],
    checked: 'fourCards'
}
export const infoLabelsCheckbox = {
    name: 'infoLabels',
    mainTitle: 'Info Labels:',
    titles: ['Id', 'Name', 'Status', 'Species', 'Type', 'Gender', 'Origin', 'Location'],
    ids: ['idView', 'nameView', 'statusView', 'speciesView', 'typeView', 'genderView', 'originView', 'locationView'],
    checked: ['idView', 'nameView', 'statusView', 'speciesView', 'genderView']
}
export const infoLabelsPositionRadio = {
    name: 'infoPosition',
    mainTitle: 'Info Position:',
    titles: ['Over', 'Above', 'Right', 'Below', 'Left'],
    ids: ['over', 'above', 'right', 'below', 'left'],
    checked: 'below'
}
export const textPositionXRadio = {
    name: 'textPositionX',
    mainTitle: 'Text Position X:',
    titles: ['Left', 'Center', 'Right', 'Justify'],
    ids: ['leftX', 'centerX', 'rightX', 'justify'],
    checked: 'leftX'
}
export const textPositionYRadio = {
    name: 'textPositionY',
    mainTitle: 'Text Position Y:',
    titles: ['Top', 'Center', 'Bottom', 'Space-Around', 'Space-Between', 'Space-Evenly'],
    ids: ['top', 'centerY', 'bottom', 'space-around', 'space-between', 'space-evenly'],
    checked: 'top'
}
export const favoritesIconRadio = {
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
}
export const episodesViewRadio = {
    name: 'episodesView',
    mainTitle: 'Episodes View:',
    titles: ['Hidden (Deployable)', 'Shown (Printed)'],
    ids: ['hiddenEpisodes', 'shownEpisodes'],
    checked: 'shownEpisodes'
}
export const episodeInfoCheckbox = {
    name: 'episodeInfo',
    mainTitle: 'Episode Info:',
    titles: ['Episode Name', 'Episode Code', 'Air Date', 'Characters'],
    ids: ['episodeNameView', 'episodeCodeView', 'episodeDateView', 'episodeCharactersView'],
    checked: ['episodeNameView', 'episodeCodeView', 'episodeDateView', 'episodeCharactersView']
}
export const episodeCharactersViewRadio = {
    name: 'charactersView',
    mainTitle: 'Characters View:',
    titles: ['Hidden (Deployable)', 'Shown (Printed)'],
    ids: ['hiddenCharacters', 'shownCharacters'],
    checked: 'shownCharacters'
}
export const episodeListViewRadio = {
    name: 'episodeListView',
    mainTitle: 'Episode List View:',
    titles: ['Simple List (No Info)', 'Advanced List (Characters On Named List)', 'Complete List (Character Images)'],
    ids: ['simpleList', 'advancedList', 'completeList'],
    checked: 'completeList'
}