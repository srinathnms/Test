export interface IUpdateAssociatePlan {
    Id: string,
    Status: boolean,
    CompletionDate: Date
}
export class UpdateAssociatePlan implements IUpdateAssociatePlan {
    constructor(
        public Id: string,
        public Status: boolean,
        public CompletionDate: Date 
        ) {

    }
}