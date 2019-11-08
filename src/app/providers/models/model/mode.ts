export interface IMode {
    Id: string,
    Code: string,
    Name: string
}

export class Mode implements IMode {

    constructor(
        public Id: string,
        public Code: string,
        public Name: string) {
    }
}