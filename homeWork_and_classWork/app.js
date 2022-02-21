const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const path = require('path');

const apiRoutes = require('./routes/apiRoutes');

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(apiRoutes);

app.listen(5000, () => {
})
