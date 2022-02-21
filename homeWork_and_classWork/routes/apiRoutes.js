const {Router} = require('express');
const routes = Router();

const usersRouter = require('./usersRoutes');
const loginRouter = require('./loginRoutes');
const signInRoutes = require('./signInRoutes');

routes.use('/users', usersRouter);
routes.use('/login', loginRouter);
routes.use('/signIn', signInRoutes);
routes.use(((req, res) => {
    res.render('notFound')
}));

module.exports = routes
