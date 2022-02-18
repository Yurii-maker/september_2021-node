const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const path = require('path');

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const users = [];

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
    if (req.query) {
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

app.get('/signIn', ((req, res) => {
    res.render('signIn')

}));

app.post('/signIn', (({body}, res) => {
    const user = users.find(user => user.email === body.email && user.password === body.password);
    if (!user) {
        res.render('notFound')
        return
    }
    res.render('user', {user});


}));

app.use(((req, res) => {
    res.render('notFound')
}));

app.listen(5000, () => {
})
