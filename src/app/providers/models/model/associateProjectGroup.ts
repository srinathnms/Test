export interface IAssociateProjectGroup {
    Id: string,
    AssociateGroupId: string,
    Code: string,
    Name: string,
    RoleId: string,
    IsGroup: boolean
}

export class AssociateProjectGroup implements IAssociateProjectGroup {

    constructor(
        public Id: string,
        public AssociateGroupId: string,
        public Code: string,
        public Name: string,
        public RoleId: string,
        public IsGroup: boolean ) {
    }
}