export interface IAssociatePlan {
    Id: string,
    AssociateId: string,
    AssociateCode: string,
    AssociateName: string,
    OwnerName: string,
    ModeName: string,
    Reference: string,
    KnowledgeTransferTitle: string,
    Duration: number,
    Week: number,
    Day: number
    ScheduledDate: Date,
    ProofType: number,
    Proof: any,
    CompletionDate?: Date    
}
export class AssociatePlan implements IAssociatePlan {
    constructor(
        public Id: string,
        public AssociateId: string,
        public AssociateCode: string,
        public AssociateName: string,
        public OwnerName: string,
        public ModeName: string,
        public Reference: string,
        public KnowledgeTransferTitle: string,
        public Duration: number,
        public Week: number,
        public Day: number,
        public ScheduledDate: Date,
        public ProofType: number,
        public Proof: any,
        public CompletionDate?: Date        
        ) {

    }
}