// import { Injectable } from "@angular/core";
// import { Routes, Router, CanActivate, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
// import { UserRoleService } from '../service/userRole.service';
// import { IUserRole } from '../model/userRole';
// import { ActivatedRoute } from '@angular/router';


// @Injectable()
// export class RouteAuthorization implements CanActivate {
//     userRole: IUserRole[];
//     private associateId: string;
//     constructor(private userRoleService: UserRoleService, private router: Router, private route: ActivatedRoute) { }
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
//         this.userRoleService.get().subscribe(userRole => {
//             this.userRole = userRole
//             if (this.userRole.find(i => i.Role == "Admin")) {
//                 this.router.navigate(['/dashboard']);
//             }
//             else {
//                 this.router.navigate(['/associatePlan']);
//             }
//         });
//     }
// }
