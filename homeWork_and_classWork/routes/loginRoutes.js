const {Router} = require('express');

const loginRouter = Router();
const loginController = require('../controllers/loginController');
const allFieldsPresent = require('../middlewars/allFieldsPresent');
const isEmailExist = require('../middlewars/emailExist');

loginRouter.get('/', loginController.renderLogin);
loginRouter.post('/', allFieldsPresent, isEmailExist, loginController.postUser);

module.exports = loginRouter