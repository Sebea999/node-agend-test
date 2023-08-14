const express = require('express');
const {engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const configVars = require('./config.js');

const loginRoutes = require('./routes/login.js');

const app = express();

// puerto 
app.set('port', configVars.PORT);
// app.set('port', 4000);

// vistas 
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
console.log('-----------------------------------------');
console.log('db_host: ', configVars.DB_HOST);
console.log('db_user: ', configVars.DB_USER);
console.log('db_pass: ', configVars.DB_PASSWORD);
console.log('db_port: ', configVars.DB_PORT);
console.log('db_db  : ', configVars.DB_DATABASE);
console.log('-----------------------------------------');

app.use(myconnection(mysql, {
    host: configVars.DB_HOST,
    user: configVars.DB_USER, 
    password: configVars.DB_PASSWORD, 
    port: configVars.DB_PORT, 
    database: configVars.DB_DATABASE
}));
/*app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root', 
    password: 'admin', 
    port: 3306, 
    database: 'odonto'
}));*/

// session
app.use(session({
    secret: 'secret', 
    resave: true, 
    saveUninitialized: true
}));

// settings for listen on port 
app.listen(app.get('port'), () => {
    console.log('Listening on port ', app.get('port'));
});

// rutas 
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