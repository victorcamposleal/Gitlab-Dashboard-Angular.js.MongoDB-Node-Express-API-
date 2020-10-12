require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const usersRouter = require('./users-router');
const preferencesRouter = require('./preferences-router');
const Preferences = require('./models/Preferences');
const Users = require('./models/Users');
const token = require('./local-variables/Token');
const ProjectID = require('./local-variables/IDProject');
const GroupID = require('./local-variables/IDGroup');
const selectedPreferences = require('./local-variables/ChosenPreferences');
const projectsData = require('./projects-data');
const config= require('./config');

const app = express();
const getProjects = require('./projects-list');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/admin', preferencesRouter);
app.use('/api/info', projectsData);
let db = process.env.DB || config.db;
let username = process.env.USERNAME || config.username;
let password = process.env.PASSWORD || config.password;
mongoose.connect(`${db}`, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
    if (err !== null) {
        console.log('Ha habido un error de conexión, o bien es preciso instalar MongoDB en este equipo');
        console.log(err);
    } else {
        await createDefaultDatabaseValues();

    }
}
);
async function createDefaultDatabaseValues() {
    let users = await Users.find({});
    if (users.length === 0) {
        let encryptedPassword = bcrypt.hashSync(password, 10);
        let result = await Users.create({ username: username , password: encryptedPassword });

        if (result.username === "admin") {
            console.log({ message: "Usuario registrado correctamente. Ya se puede iniciar sesión en la página de inicio.", ok: true });
        } else {
            console.log({ message: "No se ha podido registrar el usuario. Intentalo otra vez.", ok: false })
        }
        await Preferences.create({ username: username, token: "default", viewers: { mostCommitsUser: false, mostCollaborativeProjects: false, mostCommitsLastWeek: false, totalIssues: false, mostIssuesCreated: false, mostIssuesOpen: false, mostIssuesClosed: false, bestClosingRatio: false, chosenProject: false }, selectedProjectID: 'default', selectedGroupID: 'default' });
        getDatabase();
    }
};

async function getDatabase() {
    let result;
    try {
        result = await Preferences.find({});
    } catch (error) {
        console.log(error);
        return;
    }
    token.setToken(result[0].token);
    selectedPreferences.setOptions(result[0].viewers);
    ProjectID.setIDProject(result[0].selectedProjectID);
    GroupID.setIDGroup(result[0].selectedGroupID);
    await getProjects();
}


setInterval(getDatabase, 10000);
let port= process.env.PORT||config.port
app.listen(port);
