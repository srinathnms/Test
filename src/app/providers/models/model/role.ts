export interface IRole {
    Id: string,
    Code: string,
    Name: string
}

export class Role implements IRole {

    constructor(
        public Id: string,
        public Code: string,
        public Name: string) {
    }
}