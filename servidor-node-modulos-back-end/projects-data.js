const express = require('express');
const router = express.Router();
const finalData = require('./local-variables/FinalData');

router.get('/data', function(req,res){
    res.send(finalData);
});


module.exports = router;