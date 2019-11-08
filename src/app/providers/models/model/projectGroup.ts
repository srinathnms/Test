export interface IProjectGroup {
    Id: string,
    ProjectId: string,
    Name: string,
    Description: string,
    StartDate: Date,
}

export class ProjectGroup implements IProjectGroup {

    constructor(
        public Id: string,
        public ProjectId: string,
        public Name: string,
        public Description: string,
        public StartDate: Date) {
    }
}