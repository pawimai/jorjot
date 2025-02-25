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

const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/home');
    }
    next();
}
// END OF CUSTOM MIDDLEWARE

// ROOT PAGE
app.get('/', ifNotLoggedin, (req,res,next) => {
    dbConnection.execute("SELECT `name` FROM `users` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('home',{
            name:rows[0].name
        });
    });
    
});// END OF ROOT PAGE

// REGISTER PAGE
app.post('/register', ifLoggedin, 
    [
        body('user_email', 'Invalid email address!').isEmail().custom((value) => {
            return dbConnection.execute('SELECT `email` FROM `users` WHERE `email`=?', [value])
            .then(([rows]) => {
                if (rows.length > 0) {
                    return Promise.reject('This E-mail is already in use!');
                }
                return true;
            });
        }),
        body('user_name', 'Username is Empty!').trim().not().isEmpty(),
        body('user_pass', 'The password must be at least 6 characters long').trim().isLength({ min: 6 }),
        body('confirm_pass').custom((value, { req }) => {
            console.log("User Password:", req.body.user_pass);
            console.log("Confirm Password:", req.body.confirm_pass);
            if (value !== req.body.user_pass) {
                throw new Error('Confirm Password does not match.');
            }
            return true;
        })
    ],
    (req, res, next) => {
        console.log(req.body); // เช็คค่าที่ส่งมา

        const validation_result = validationResult(req);
        const { user_name, user_pass, user_email } = req.body;

        if (validation_result.isEmpty()) {
            bcrypt.hash(user_pass, 12).then((hash_pass) => {
                dbConnection.execute("INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)", [user_name, user_email, hash_pass])
                .then(result => {
                    res.send(`Your account has been created successfully, now you can <a href="/">Login</a>`);
                }).catch(err => {
                    if (err) throw err;
                });
            }).catch(err => {
                if (err) throw err;
            });
        } else {
            let allErrors = validation_result.errors.map((error) => error.msg);
            res.render('login-register', {
                register_error: allErrors,
                old_data: req.body
            });
        }
    }
);
// END OF REGISTER PAGE

// LOGIN PAGE 
app.post('/', ifLoggedin, [
    body('user_name').custom((value) => {
        return dbConnection.execute('SELECT name FROM users WHERE name=?', [value])
        .then(([rows]) => {
            if(rows.length == 1){
                return true;
                
            }
            return Promise.reject('Invalid Name!');
            
        });
    }),
    body('user_pass','Password is empty!').trim().not().isEmpty(),
], (req, res) => {
    const validation_result = validationResult(req);
    const {user_pass, user_name} = req.body;
    if(validation_result.isEmpty()){
        
        dbConnection.execute("SELECT * FROM `users` WHERE `name`=?",[user_name])
        .then(([rows]) => {
            bcrypt.compare(user_pass, rows[0].password).then(compare_result => {
                if(compare_result === true){
                    req.session.isLoggedIn = true;
                    req.session.userID = rows[0].id;

                    res.redirect('/');
                }
                else{
                    res.render('login-register',{
                        login_errors:['Invalid Password!']
                    });
                }
            })
            .catch(err => {
                if (err) throw err;
            });


        }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg; 
        });
        // REDERING login-register PAGE WITH LOGIN VALIDATION ERRORS
        res.render('login-register',{
            login_errors:allErrors
        });
    }
});
// END OF LOGIN PAGE 

// LOGOUT
app.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
});
// END OF LOGOUT

// CHANGE NAME & PASSWORD
// อัปเดตชื่อ
app.post('/update-name', ifNotLoggedin, async (req, res) => {
    const { new_name } = req.body;
    const userID = req.session.userID;

    if (!new_name) {
        return res.send('Please provide a new name.');
    }

    try {
        await dbConnection.execute('UPDATE users SET name = ? WHERE id = ?', [new_name, userID]);
        res.send('Name updated successfully. <a href="/">Go back</a>');
    } catch (error) {
        console.error(error);
        res.send('Error updating name.');
    }
});

// อัปเดตรหัสผ่าน
app.post('/update-password', ifNotLoggedin, async (req, res) => {
    const { current_password, new_password, confirm_new_password } = req.body;
    const userID = req.session.userID;

    if (!current_password || !new_password || !confirm_new_password) {
        return res.send('Please fill in all fields.');
    }

    if (new_password.length < 6) {
        return res.send('New password must be at least 6 characters long.');
    }

    if (new_password !== confirm_new_password) {
        return res.send('New password and Confirm password do not match.');
    }

    try {
        // ดึงรหัสผ่านเดิมจากฐานข้อมูล
        const [rows] = await dbConnection.execute('SELECT password FROM users WHERE id = ?', [userID]);

        if (rows.length === 0) {
            return res.send('User not found.');
        }

        const storedPassword = rows[0].password;

        // ตรวจสอบรหัสผ่านเดิม
        const passwordMatch = await bcrypt.compare(current_password, storedPassword);
        if (!passwordMatch) {
            return res.send('Current password is incorrect.');
        }

        // เข้ารหัสรหัสผ่านใหม่
        const hashedPassword = await bcrypt.hash(new_password, 12);
        await dbConnection.execute('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userID]);

        res.send('Password updated successfully. <a href="/">Go back</a>');
    } catch (error) {
        console.error(error);
        res.send('Error updating password.');
    }
});
// END CHANGE NAME & PASSWORD


app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});

app.listen(3000, () => console.log("Server is running..."));