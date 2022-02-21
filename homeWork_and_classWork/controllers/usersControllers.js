const users = require('../database/users');

class UsersController {
    renderUsers(req, res) {
        if (req.query) {
            const {age, city} = req.query;
            let filteredUsers = [...users];
            if (age) {
                filteredUsers = filteredUsers.filter(user => user.age === age)
            }
            if (city) {
                filteredUsers = filteredUsers.filter(user => user.city === city)
            }
            res.render('users', {users: filteredUsers});
            return
        }
        res.render('users', {users})
    };

    renderUser(req, res) {
        const {id} = req.params;
        const user = users.find(user => user.id === +id);
        res.render('user', {user})
    }
}

module.exports = new UsersController()