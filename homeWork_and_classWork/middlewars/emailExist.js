const users = require('../database/users');

function isEmailExist(req, res, next) {
    try {
        const {email} = req.body;
        const user = users.find(user => user.email === email);
        if (user) {
            throw new Error('Email exist')
        }
        next();
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message)
    }
}

module.exports = isEmailExist