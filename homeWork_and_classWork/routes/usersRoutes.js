const {Router} = require('express');

const usersRouter = Router();
const usersController = require('../controllers/usersControllers');

usersRouter.get('/', usersController.renderUsers);
usersRouter.get('/:id', usersController.renderUser);

module.exports = usersRouter