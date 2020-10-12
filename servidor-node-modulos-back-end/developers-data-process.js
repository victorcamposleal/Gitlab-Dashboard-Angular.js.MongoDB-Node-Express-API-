function cleanCommits(array){
   

    let mostCollaborative=[];
    for (let i = 0; i < array.length; i++) {
        mostCollaborative=[...mostCollaborative,{name: array[i].name, developers: array[i].datos.length}]
    }
    
    let mostCollaboratives= mostCollaborative.sort((a, b) => b.developers - a.developers).slice(0,5);

    let developers = {};

    for (let i = 0; i < array.length; i++){
        for (let j = 0; j < array[i].datos.length;j++){
            if(developers[array[i].datos[j].name] === undefined) {
                developers[array[i].datos[j].name] = {commits: array[i].datos[j].commits, projects: 1};
            } else {
                developers[array[i].datos[j].name].commits += array[i].datos[j].commits;
                developers[array[i].datos[j].name].projects++;
            }
        }
    }
    
    let contributors = [];
    for (let user in developers){
        let contributor = {user: `${user}`, commits: developers[user].commits, projects: developers[user].projects};
        contributors.push(contributor);
    }

    let mostCommits = contributors.sort((a, b) => b.commits - a.commits).slice(0,5);

    let commitsStats = {
        mostCollaboratives,
        mostCommits
    }

    return commitsStats;
}

module.exports = cleanCommits;