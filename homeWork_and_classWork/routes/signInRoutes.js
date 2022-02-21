const {Router} = require('express');

const signInRouter = Router();
const signInController = require('../controllers/signInController');
const isEmailExist = require('../middlewars/emailExist');

signInRouter.get('/', signInController.signInRender);
signInRouter.post('/', isEmailExist, signInController.postSignedUser);

module.exports = signInRouter
