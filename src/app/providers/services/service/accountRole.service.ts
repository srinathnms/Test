import { Injectable } from '@angular/core';
import { Observable, pipe, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAccountRole } from '../../models/model/accountRole';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountRoleService {

    private baseUrl: string;

    constructor(private httpInterceptorService: HttpClient) {
        this.baseUrl = "AccountRole";
    }

    get(): Observable<IAccountRole[]> {
        return of(this.getResonse());
        // return this.httpInterceptorService.get(this.baseUrl)
        //     .pipe(map((response: IRole[]) => <IRole[]>response));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

    private getResonse(): IAccountRole[] {

        const first = { Id: "1", Name: "Role1", Code: "Code 1" };
        const second = { Id: "2", Name: "Role2", Code: "Code 1" };
        const third = { Id: "3", Name: "Role3", Code: "Code 1" };

        return [first, second, third] as IAccountRole[];
    }
}