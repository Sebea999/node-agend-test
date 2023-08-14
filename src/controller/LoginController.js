const bcrypt = require('bcrypt');

function login(req, res) {
    console.log('[+] login.html');
    // verifico si el usuario ha ingresado por medio de la sesion
    if (req.session.loggedin != true) {
        // si no ingreso le muestro el login 
        res.render('login/index');
    } else {
        // si ingreso le muestro el menu 
        res.redirect('/');
    }
    //res.render('login/index');
}

function auth(req, res) {
    const data = req.body;
    console.log(data);
    
    // validacion
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            
            if (userdata.length > 0) {
                // si existen los datos 
                console.log('hello');
                // recorremos el objeto de userdata para poder recuperar el password y asi compararlo 
                userdata.forEach(element => {
                    // controlar la contraseña
                    bcrypt.compare(data.password, element.password, (err, isMatch) => {
                        // comparando las contraseñas y si no coinciden le paso mensaje  
                        if(!isMatch) {
                            res.render('login/index', { error: 'Error: incorrect password.' });
                        } else {
                            console.log('welcome to back');
                            // ahora cargaria los datos del usuario a la sesion 
                            req.session.loggedin = true;
                            req.session.name = element.name;
                            res.redirect('/');
                        }
                    });
                });
                
            } else {
                //  si no existe el usuario que muestre un mensaje 
                console.log('user not exists');
                res.render('login/index', { error: 'Error: User not exists.' });
            }
        });
    });
}

function register(req, res) {
    console.log('[+] register.html');
    // verifico si el usuario ha ingresado por medio de la sesion
    if (req.session.loggedin != true) {
        // si no ingreso le muestro el login 
        res.render('login/register');
    } else {
        // si ingreso le muestro el menu 
        res.redirect('/');
    }
    //res.render('login/register');
}

function storeUser(req, res) {
    const data = req.body;

    // validacion
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            if (userdata.length > 0) {
                // si existe el usuario que muestre un mensaje 
                console.log('user already created');
                res.render('login/register', { error: 'Error: User already exists.' });
            } else {
                // si no existe entonces pasaria a crear al usuario 
                bcrypt.hash(data.password, 12).then(hash => {
                    // pasamos el valor encriptado de la contraseña al objeto "data"
                    data.password = hash;
                    // y hacemos un insert a la db para cargar al user 
                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
                            // cargo los datos del usuario a la sesion 
                            req.session.loggedin = true;
                            req.session.name = data.name;
                            res.redirect('/');
                        })
                    });
                });
            }
        });
    });
    
}


function logout(req, res) {
    // controlo la sesion al momento de hacer un logout
    if (req.session.loggedin == true) {
        // si tiene abierta una session entonces la destruyo 
        req.session.destroy();
    }
    // si no tenemos abierto una session entonces le redirecciono al login 
    res.redirect('/login');
}


module.exports = {
    login: login,
    register: register, 
    storeUser, 
    auth, 
    logout,
}