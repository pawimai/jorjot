const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbConnection = require('./database');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.urlencoded({ extended:false }));

// SET OUR VIEWS AND VIEW ENGINE
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

// APPLY COOKIE SESSION MIDDLEWARE
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  3600 * 1000 // 1hr
}))

// DECLARING CUSTOM MIDDLEWA
const ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('login-register');
    }
    next();
}

// ROOT PAGE
app.get('/', ifNotLoggedin, (req,res,next) => {
    dbConnection.execute("SELECT `name` FROM `users` WHERE `name`=?",[req.session.userNAME])
    .then(([rows]) => {
        res.render('home',{
            name:rows[0].name
        });
    });
    
});// END OF ROOT PAGE

app.listen(3000, () => console.log("Server is running..."))