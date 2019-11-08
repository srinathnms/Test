export interface IProjectProgram {
    ProgramProgramme: string
}
export interface IUpdateProjectProgram{
    ProgramProgramme: number;
    ModifiedDate:Date;
}

export class UpdateProjectProgram implements IUpdateProjectProgram {

    constructor(
        public ProgramProgramme: number,public ModifiedDate:Date) {
    }
}