export interface IssuesCreated {
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
