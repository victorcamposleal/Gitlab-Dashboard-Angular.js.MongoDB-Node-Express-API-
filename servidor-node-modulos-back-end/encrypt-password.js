const bcrypt = require('bcrypt');

function encryptPassword(req,res,next){
    let password = req.body.password;
    req.body.password = bcrypt.hashSync(password, 10);
    next();
}

module.exports = encryptPassword;