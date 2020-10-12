function cleanLastWeek(array){
   let commitsLastWeek=[];

    for (let i = 0; i < array.length; i++) {
        commitsLastWeek=[...commitsLastWeek,{name: array[i].name, commits: array[i].datos.length}]
    }

    // commitsLastWeek.sort((a, b) => (a.commits < b.commits) ? 1 : -1)
    commitsLastWeek.sort((a, b) => b.commits - a.commits).slice(0,5);

    return commitsLastWeek;
}

module.exports = cleanLastWeek;