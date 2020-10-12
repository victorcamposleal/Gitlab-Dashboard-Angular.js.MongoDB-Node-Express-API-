require('dotenv').config();
const fetch = require('node-fetch');
const date = require('./local-variables/Date');
const ID =  require('./local-variables/IDProject');
const token = require('./local-variables/Token');
const config= require('./config');

let url = process.env.URL || config.url;

async function getSpecificProject() {
    let name;
    let members;
    let issues;
    let commitsLastWeek;
    let specificProjectData;
    
    let urlspecifc = {
        self: `${url}projects/${ID.value}`,
        issues: `${url}projects/${ID.value}/issues_statistics?scope=all`,
        commits: `${url}projects/${ID.value}/repository/contributors`,
        lastWeekCommits: `${url}projects/${ID.value}/repository/commits?since=${date}&per_page=100`
    };
    
    let specificNameRequest = fetch(`${urlspecifc.self}`, { headers: { "Private-Token": token.value } });
    let specificIssuesRequest = fetch(`${urlspecifc.issues}`, { headers: { "Private-Token": token.value } });
    let specificCommitsRequest = fetch(`${urlspecifc.commits}`, { headers: { "Private-Token": token.value } });
    let specificLastWeekCommitsRequest = fetch(`${urlspecifc.lastWeekCommits}`, { headers: { "Private-Token": token.value } });
    
    let respuestaName = await Promise.resolve(specificNameRequest);
    let datosName = await respuestaName.json();
    name = datosName.name;

    let respuestaIssues = await Promise.resolve(specificIssuesRequest);
    let datosIssues = await respuestaIssues.json();
    issues = datosIssues;

    let respuestaCommits = await Promise.resolve(specificCommitsRequest);
    let datosCommits = await respuestaCommits.json();
    members= datosCommits;

    let respuestaWeek = await Promise.resolve(specificLastWeekCommitsRequest);
    let datosWeek = await respuestaWeek.json();
    commitsLastWeek = datosWeek.length;

    specificProjectData = {name:name, members: members, issues: issues, commitsLastWeek: commitsLastWeek}
    return specificProjectData
}

module.exports = getSpecificProject;