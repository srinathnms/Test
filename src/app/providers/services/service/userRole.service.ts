import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IUserRole } from '../../models/model/userRole';


@Injectable()
export class UserRoleService {
    private baseUrl: string;
    constructor(public httpInterceptorService: HttpClient) {
        this.baseUrl = "UserRole";
    }
    get(): Observable<IUserRole[]> {
        return of(this.getResonse());
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

    private getResonse(): IUserRole[] {

        const first = {UserRoleId: "1",Role: "Admin",RoleDescription: "Admin User"};
        const second = {UserRoleId: "2",Role: "Normal",RoleDescription: "Normal User"};
        const third = {UserRoleId: "3",Role: "ResourceMasterAdmin",RoleDescription: "Resource Master Admin User"};

        return [first, second, third] as IUserRole[];
    }

}