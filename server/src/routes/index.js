import { Router } from 'express';
const router = Router();

import getCharacters from '../controllers/getCharacters.js';
import getCharactersByName from '../controllers/getCharactersByName.js';
import getCharacterById from '../controllers/getCharacterById.js';
import getCharacterByRandomId from '../controllers/getCharacterByRandomId.js';
import getEpisodes from '../controllers/getEpisodes.js';
import getEpisodeById from '../controllers/getEpisodeById.js';
import getUserInfo from '../controllers/getUserInfo.js';
import patchUserInfo from '../controllers/patchUserInfo.js';
import patchUserOptions from '../controllers/patchUserOptions.js';
import patchUserFavorites from '../controllers/patchUserFavorites.js';
import postUser from '../controllers/postUser.js';
import loginUser from '../controllers/loginUser.js';
import logoutUser from '../controllers/logoutUser.js';
import getUserChange from '../controllers/getUserChange.js';

router.get('/characters', getCharacters);
router.get('/characters/query', getCharactersByName);
router.get('/characters/random', getCharacterByRandomId);
router.get('/characters/:id', getCharacterById);
router.get('/episodes', getEpisodes);
router.get('/episodes/:id', getEpisodeById);
router.get('/userInfo', getUserInfo);
router.patch('/userInfo', patchUserInfo);
router.patch('/userOptions', patchUserOptions);
router.patch('/userFavorites', patchUserFavorites);
router.post('/user/login', loginUser);
router.get('/user/logout', logoutUser);
router.get('/user/change', getUserChange);
router.post('/user', postUser);

export default router;