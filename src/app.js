const express = require('express');
const {engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login.js');

const app = express();
app.set('port', 4000);

app.set('views', __dirname+'/views');
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// db
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root', 
    password: 'admin', 
    port: 3306, 
    database: 'odonto'
}));

// session
app.use(session({
    secret: 'secret', 
    resave: true, 
    saveUninitialized: true
}));


app.listen(app.get('port'), () => {
    console.log('Listening on port ', app.get('port'));
});

app.use('/', loginRoutes);

app.get('/', (req, res) => {
    // verifico si el usuario ha ingresado por medio de la sesion
    if (req.session.loggedin == true) {
        // si ingreso le muestro el home
        res.render('home', {name:req.session.name});
    } else {
        // si no ingreso le muestro el login 
        res.redirect('/login');
    }
});