const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/Users');
const encryptPassword = require('./encrypt-password');

/* registro */

router.post('/new-user', encryptPassword, function(req,res){
        
    let encryptedPassword = req.body.password;

    Users.find({username: req.body.username}, function(err,result){
        if(err!==null){
            res.send(err);
        }else{
            if (result.length>0){
                res.send({message:'Parece que ese usuario ya está registrado, intenta con uno nuevo o inicia sesión'});
            } else {
                Users.create({username: req.body.username, password: encryptedPassword}, function(err, result){
                    if (err !== null) {
                        console.log(err);
                        res.send({ message: "Parece que ha habido un error en la conexión" })

                    } else {
                        if (result.username === "admin") {
                            res.send({ message: "Usuario registrado correctamente. Ya se puede iniciar sesión en la página de inicio.", ok: true })
                        } else {
                            res.send({ message: "No se ha podido registrar el usuario. Intentalo otra vez.", ok: false })
                        }
                    }
                })
            }
            
        }
    })
  
});

/* login */

router.use(session(
    {
        secret: 'retoirontec',
        resave: false,
        saveUninitialized: false
    }
));

router.use(passport.initialize());
router.use(passport.session());

passport.use(
    new LocalStrategy(
        function (username, password, done) {
            Users.find({ username: username }, function (err, users) {
                if (users.length === 0) {
                    return done(null, false); //el usuario no existe
                }
                const user = users[0];
                if (bcrypt.compareSync(password, user.password)) {
                    return done(null, user); //contraseña correcta
                } else {
                    return done(null, false); //contraseña incorrecta
                }
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (id, done) {
    Users.find({ username: id }, function (err, users) {
        if (users.length === 0) {
            done(null, null);
        }
        done(null, users[0]);
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/api/users/',
    failureRedirect: '/api/users/fail'
}));

router.get('/fail', function (req, res) {
    res.send({ message: 'Usuario o contraseña incorrecta. Por favor, intenta de nuevo' });
});

router.get('/', function (req, res) {
    if (req.isAuthenticated() === false) {
        return res.send({ message: 'Para acceder al contenido necesitas previamente iniciar sesión' }); 
    }
    res.send({ message: 'Sesión iniciada' });
});

router.get('/user', function (req, res) {
    if (req.isAuthenticated()) {
        return res.send({ username: req.user.username });
    }
    res.send({ username: 'No valido' });
});

/*cerrar sesión */

router.get('/logout', function(req, res){
    req.logout();
    res.send({message: 'Sesión cerrada'});
  });


module.exports = router;