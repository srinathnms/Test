import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IRole } from '../../models/model/role';
import { map } from 'rxjs/operators';

@Injectable()
export class RoleService {
    private baseUrl:string

    constructor(public httpInterceptorService: HttpClient) {
        this.baseUrl = "Role"
    }

    get(): Observable<IRole[]> {
        return of(this.getResonse());
        // return this.httpInterceptorService.get(this.baseUrl)
        //     .pipe(map((response: IRole[]) => <IRole[]>response));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

    private getResonse(): IRole[] {

        const first = { Id: "1", Name: "Role1", Code: "Code 1" };
        const second = { Id: "2", Name: "Role2", Code: "Code 1" };
        const third = { Id: "3", Name: "Role3", Code: "Code 1" };

        return [first, second, third] as IRole[];
    }
}