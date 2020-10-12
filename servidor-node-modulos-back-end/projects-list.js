require('dotenv').config();
const fetch = require('node-fetch');
const cleanLastWeek = require('./last-week-commits-data-process');
const cleanIssues = require('./issues-data-process');
const cleanCommits = require('./developers-data-process');
const getSpecificProject = require('./specificUrl');

const chosenPreferences = require('./local-variables/ChosenPreferences');
const requestParams = require('./local-variables/RequestParams');
const issuesData = require('./local-variables/IssuesData');
const developersData = require('./local-variables/DevelopersData');
const commitsPerDate = require('./local-variables/LastWeekStats');
const date = require('./local-variables/Date');
const mostRecentProjects = require('./local-variables/MostRecentProjects');
const finalData = require('./local-variables/FinalData');
const groupID = require('./local-variables/IDGroup');
const token = require('./local-variables/Token');
const config= require('./config');

let url= process.env.URL|| config.url;

async function getProjects() {
    if (token.value !== 'default') {
        let urls = [];
        let members = [];
        let issues = [];
        let commitsLastWeek = [];
        let projectsIDs = []

        let respuesta = await fetch(`${url}groups/${groupID.value}/projects?order_by=last_activity_at&per_page=10`, {
            headers: {
                "Private-Token": token.value
            },
        });
        let datos = await respuesta.json();
        for (let i = 0; i < datos.length; i++) {
            let url = {
                id: datos[i].id,
                name: datos[i].name,
                self: datos[i]._links.self,
                issues: datos[i]._links.self + '/issues_statistics?scope=all',
                commits: datos[i]._links.self + '/repository/contributors',
                lastWeekCommits: datos[i]._links.self + `/repository/commits?since=${date}&per_page=100`
            }
            urls = [...urls, url];
        }
        requestParams.setLinks(urls);

        let issuesRequest = urls.map((url) => { return { name: url.name, promise: fetch(`${url.issues}`, { headers: { "Private-Token": token.value } }) } });
        let commitsRequest = urls.map((url) => { return { name: url.name, promise: fetch(`${url.commits}`, { headers: { "Private-Token": token.value } }) } });
        let lastWeekCommitsRequest = urls.map((url) => { return { name: url.name, promise: fetch(`${url.lastWeekCommits}`, { headers: { "Private-Token": token.value } }) } });

        for (let i = 0; i < issuesRequest.length; i++) {
            let respuesta = await Promise.resolve(issuesRequest[i].promise);
            let datos = await respuesta.json();
            issues.push({ name: issuesRequest[i].name, datos });
        }

        for (let i = 0; i < commitsRequest.length; i++) {
            let respuesta = await Promise.resolve(commitsRequest[i].promise);
            let datos = await respuesta.json();
            members.push({ name: commitsRequest[i].name, datos });
        }

        for (let i = 0; i < lastWeekCommitsRequest.length; i++) {
            let respuesta = await Promise.resolve(lastWeekCommitsRequest[i].promise)
            let datos = await respuesta.json();
            commitsLastWeek.push({ name: lastWeekCommitsRequest[i].name, datos });
        }

        for (let i = 0; i < requestParams.links.length; i++) {
            projectsIDs.push({ id: requestParams.links[i].id, name: requestParams.links[i].name })
        }

        let issuesStats = cleanIssues(issues);
        let commitStats = cleanCommits(members);
        let lastWeekStats = cleanLastWeek(commitsLastWeek);
        let specificProject = await getSpecificProject();
        let status;

        if (specificProject.members.message === '401 Unauthorized') {
            status = { message: specificProject.members.message };
        }else if(projectsIDs.length === 0){
            status = { message: "404 Group Not Found"}
        } else if (specificProject.members.message === '404 Project Not Found') {
            status = { message: specificProject.members.message };
        } else {
            status = { message: "200 OK" };
        }
        
        mostRecentProjects.setMostRecentProjects(projectsIDs);
        issuesData.setIssuesData(issuesStats);
        developersData.setDevelopers(commitStats);
        commitsPerDate.setLastWeekStats(lastWeekStats);
        let stats = { preferences: chosenPreferences.options, issues: issuesData.data, users: developersData.developers, commits: commitsPerDate.lastWeekStats, projects: mostRecentProjects.projects, chosenProject: specificProject, chosenGroup: groupID.value, status};
        finalData.setFinalData(stats);
    } else {
        console.log('Tienes que introducir un Token que no sea default')
    }
}



module.exports = getProjects;