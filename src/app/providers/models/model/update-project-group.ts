import { IAssociate } from './associate'

export interface IUpdateProjectGroup {
    ProjectGroupId: string,
    Name: string,
    StartDate: Date,
    AddAssociates: IAssociate[],
    DeleteAssociates: IAssociate[]
}

export class UpdateProjectGroup implements IUpdateProjectGroup {

    constructor(
        public ProjectGroupId: string,
        public Name: string,
        public StartDate:Date,
        public AddAssociates: IAssociate[],
        public DeleteAssociates: IAssociate[]) {
    }
}