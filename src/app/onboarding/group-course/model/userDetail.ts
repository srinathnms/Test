export interface IUserDetail {
    DisplayName:string,
    Email:string,
    Title:string,
    AssociateId:string
 }
 export class UserDetail implements IUserDetail {
 
     constructor(
         public DisplayName: string,
         public Email: string,
         public Title: string,
         public AssociateId: string
        ) {
     }
 }
 