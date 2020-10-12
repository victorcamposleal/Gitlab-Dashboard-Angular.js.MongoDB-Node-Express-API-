const mongoose = require('mongoose');

let preferencesSchema = new mongoose.Schema({
    username: String,
    token: String,
    viewers: {mostCommitsUser: Boolean, mostCollaborativeProjects: Boolean,  mostCommitsLastWeek: Boolean, totalIssues: Boolean, mostIssuesCreated: Boolean, mostIssuesOpen: Boolean, mostIssuesClosed: Boolean, bestClosingRatio: Boolean, chosenProject:Boolean},
    selectedProjectID: String,
    selectedGroupID: String
});

let Preferences = new mongoose.model('Preference',preferencesSchema);

module.exports = Preferences;