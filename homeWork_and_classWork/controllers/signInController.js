const users = require('../database/users');

class SignInController {
    signInRender(req, res) {
        res.render('signIn')
    };

    postSignedUser({body}, res) {
        const user = users.find(user => user.email === body.email && user.password === body.password);
        if (!user) {
            res.render('notFound')
            return
        }
        res.render('user', {user})
    }
}

module.exports = new SignInController()