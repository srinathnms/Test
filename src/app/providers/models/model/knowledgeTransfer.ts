export interface IKnowledgeTransfer {
    Id: string,
    Name: string,
    Description: string,
    Reference: string,
    Duration: number,
    ModeId: string,
    RoleId: string,
    OwnerId: string
}

export class KnowledgeTransfer implements IKnowledgeTransfer {

    constructor(
       public Id: string,      
       public Name: string,
       public Description: string,
       public Reference: string,
       public Duration: number,
       public ModeId: string,
       public RoleId: string,
       public OwnerId: string) {
    }
}