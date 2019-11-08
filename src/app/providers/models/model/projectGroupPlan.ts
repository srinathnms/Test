export interface IProjectGroupPlan {
    Id: string,
    Week: number,
    Day: number,
    KnowledgeTransferId: string,
    KnowledgeTransferName: string,
    Description: string,
    Reference: string,
    Duration: number,
    ModeId: string,
    ModeName: string,
    RoleId: string,
    RoleName: string,
    OwnerId: string,
    OwnerName: string,
    TotalCount: number,
    CompletedCount: number,
    ScheduledDate: Date,
    ProjectGroupId: string
}

export class ProjectGroupPlan implements IProjectGroupPlan {

    constructor(
       public Id: string,
       public Week: number,
       public Day: number,
       public KnowledgeTransferId: string,
       public KnowledgeTransferName: string,
       public Description: string,
       public Reference: string,
       public Duration: number,
       public ModeId: string,
       public ModeName: string,
       public RoleId: string,
       public RoleName: string,
       public OwnerId: string,
       public OwnerName: string,
       public TotalCount: number,
       public CompletedCount: number,
       public ScheduledDate: Date,
       public ProjectGroupId: string) {
    }
}