export interface Data {
    data: {
        preferences: {
            mostCommitsUser: boolean,
            mostCollaborativeProjects: boolean,
            mostCommitsLastWeek: boolean,
            totalIssues: boolean,
            mostIssuesCreated: boolean,
            mostIssuesOpen: boolean,
            mostIssuesClosed: boolean,
            bestClonsingRatio: boolean,    
            chosenProject: boolean
        },
        issues: {
            totalStat: {
                totalIssues: number,
                issuesOpened: number,
                issuesClosed: number,
                closingRatio: number
            },
            mostIssues: [
                {
                    name: string,
                    datos: {
                        statistics: {
                            counts: {
                                all: number,
                                closed: number,
                                opened: number
                            }
                        }
                    }
                }
            ],
            mostIssuesOpened: [
                {
                    name: string,
                    datos: {
                        statistics: {
                            counts: {
                                all: number,
                                closed: number,
                                opened: number
                            }
                        }
                    }
                }
            ],
            mostIssuesClosed: [
                {
                    name: string,
                    datos: {
                        statistics: {
                            counts: {
                                all: number,
                                closed: number,
                                opened: number
                            }
                        }
                    }
                }
            ],
            bestClosingRatio: [
                {
                    name: string,
                    datos: {
                        statistics: {
                            counts: {
                                all: number,
                                closed: number,
                                opened: number
                            }
                        }
                    }
                }
            ]

        },
        users: {
            mostCollaboratives: [
                {
                    name: string,
                    developers: number
                }
            ],
            mostCommits: [
                {
                    user: string,
                    commits: number,
                    projects: number
                }
            ]
        },
        commits: [
            {
                name: string,
                commits: number
            }
        ],
        projects: [
            {
                id: number,
                name: string
            }
        ],
        chosenProject: {
            name: string,
            members: [
            {
                name: string,
                email: string,
                commits: number,
                additions: number,
                deletions: number
            }],
            issues: 
                {
                   statistics: {
                       counts: {
                           all: number,
                           closed: number,
                           opened: number
                       }
                   }
                },
            commitsLastWeek: number
        },
        chosenGroup: string,
        status:{
            message: string
        }
    }    
}
