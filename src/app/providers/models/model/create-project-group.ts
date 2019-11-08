import { IAssociate } from './associate'

export interface ICreateProjectGroup {
    ProjectId: string,
    Name: string,
    StartDate: Date,
    AddAssociates:IAssociate[]
}

export class CreateProjectGroup implements ICreateProjectGroup {

    constructor(
        public ProjectId: string,
        public Name: string,
        public StartDate: Date,
        public AddAssociates: IAssociate[]) {
    }
}