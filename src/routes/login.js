const express = require('express');
const LoginController = require('../controller/LoginController.js');

const router = express.Router();

// login
router.get('/login', LoginController.login);
router.post('/login', LoginController.auth);
// register 
router.get('/register', LoginController.register);
router.post('/register', LoginController.storeUser);
// logout
router.get('/logout', LoginController.logout);


module.exports = router;