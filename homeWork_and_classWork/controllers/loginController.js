const users = require('../database/users');

class LoginController {
    renderLogin(req, res) {
        res.render('login')
    };

    postUser({body}, res) {
        const emailExist = users.find(user => user.email === body.email);
        if (emailExist) {
            res.render('notFound')
        }
        users.push({id: users.length ? users[users.length - 1].id + 1 : 1, ...body});
        res.render('users', {users})
    }
}

module.exports = new LoginController()