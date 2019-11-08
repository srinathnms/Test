export interface IAssociate {
    Id: string,
    Code: string,
    Name: string,
    RoleId: string,
    ProjectId: string
}

export class Associate implements IAssociate {

    constructor(
        public Id: string,
        public Code: string,
        public Name: string,
        public RoleId: string,
        public ProjectId: string) {
    }
}