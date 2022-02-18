const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const path = require('path');
const {urlencoded} = require("express");

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const users = [];

app.listen(5000, () => {
});

app.get('/login', ((req, res) => {
    res.render('login')
}));

app.post('/login', (({body}, res) => {
        const emailExist = users.find(user => user.email === body.email);
        if (emailExist) {
            res.render('notFound')
        }
        users.push({id: users.length ? users[users.length - 1].id + 1 : 1, ...body})
        res.render('users', {users})

    }
));

app.get('/users', (req, res) => {
    if (req.query !== {}) {
        const {age, city} = req.query;
        let filteredUsers = [...users];
        if (age) {
            filteredUsers = filteredUsers.filter(user => user.age === age)
        }
        if (city) {
            filteredUsers = filteredUsers.filter(user => user.city === city)
        }
        res.render('users', {users: filteredUsers})
        return
    }

    res.render('users', {users})

});

app.get('/users/:id', ((req, res) => {
    const {id} = req.params;
    const user = users.find(user => user.id === +id);
    res.render('user', {user})

}));

app.use(((req, res) => {
    res.render('notFound')
}))
// ДЗ
//
// декілька ендпоінтів зробити
//
// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на сторінку з
// усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж
// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city
// 3. /user/:id сторінка з інфою про одного юзера
//
// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект

