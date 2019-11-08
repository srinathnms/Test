export interface IProject {
    Id: string,
    Code: string,
    Name: string
}

export class Project implements IProject {

    constructor(
        public Id: string,
        public Code: string,
        public Name: string) {
    }
}