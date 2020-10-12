const express = require('express');
const router = express.Router();
const Preferences = require('./models/Preferences');

router.put('/mod-viewers', function (req,res){
    let newViewers = req.body;
    
    Preferences.updateOne({username: "admin"}, {$set: {viewers: newViewers}}, function(err, result){
        if(err!==null){
            res.send(err);
        }else{            
            res.send(result);
        }
    })
});

router.put('/mod-token', function (req,res){
    let newToken = req.body.token;

    Preferences.updateOne({username: "admin"}, {$set: {token: newToken}}, function(err, result){
        if(err!==null){
            res.send(err);
        }else{
            res.send(result);
        }
    })
});

router.put('/mod-project', function (req,res){
    let newProject = req.body;

    Preferences.updateOne({username: "admin"}, {$set: {project: newProject}}, function(err, result){
        if(err!==null){
            res.send(err);
        }else{
            res.send(result);
        }
    })
});

router.put('/mod-selected-project-ID', function (req,res){
    let newProject = req.body.value;

    Preferences.updateOne({username: "admin"}, {$set: {selectedProjectID: newProject}}, function(err, result){
        if(err!==null){
            res.send(err);
        }else{
            res.send(result);            
        }
    })
});

router.put('/mod-selected-group-ID', function (req,res){
    let newGroup = req.body.value;

    Preferences.updateOne({username: "admin"}, {$set: {selectedGroupID: newGroup}}, function(err, result){
        if(err!==null){
            res.send(err);
        }else{
            res.send(result);            
        }
    })
});

module.exports = router;