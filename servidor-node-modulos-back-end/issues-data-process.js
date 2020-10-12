function cleanIssues(array){
     
    let totalIssues = 0;
    let issuesOpened = 0;
    let issuesClosed = 0;

    for (let i=0; i<array.length; i++){
        totalIssues = totalIssues + array[i].datos.statistics.counts.all;
        issuesOpened = issuesOpened + array[i].datos.statistics.counts.opened;
        issuesClosed = issuesClosed + array[i].datos.statistics.counts.closed;        
    }
    let closingRatio = parseFloat((issuesClosed / totalIssues).toFixed(2));

    let totalStat = {
        totalIssues,
        issuesOpened,
        issuesClosed,
        closingRatio,
    }

    let mostIssues = (array.sort((a, b) => b.datos.statistics.counts.all - a.datos.statistics.counts.all)).slice(0,5);    
    let mostIssuesOpened = (array.sort((a, b) => b.datos.statistics.counts.opened - a.datos.statistics.counts.opened)).slice(0,5);
    let mostIssuesClosed = (array.sort((a, b) => b.datos.statistics.counts.closed - a.datos.statistics.counts.closed)).slice(0,5);
    let bestClosingRatio = (array.sort((a, b) => (b.datos.statistics.counts.closed / b.datos.statistics.counts.all) - (a.datos.statistics.counts.closed / a.datos.statistics.counts.all))).slice(0,5);
    
    let issuesStat = {
        totalStat,
        mostIssues,
        mostIssuesOpened,
        mostIssuesClosed,
        bestClosingRatio
    }
    return issuesStat;
}

module.exports = cleanIssues;