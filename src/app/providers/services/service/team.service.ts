import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Iteam } from '../../models/model/team';

@Injectable()
export class TeamService {

    private baseUrl: string;

    constructor(private httpInterceptorService: HttpClient) {
        this.baseUrl = "ProjectTeam";
    }

    getTeamList(projectId: string): Observable<Iteam[]> {
        return of(this.getResonse());
    }

    private handleError(error: Response) {
        return Observable.throw(error.json() || "Server Error");
    }

    private getResonse(): Iteam[] {

        const first = { Id: "1", Name: "Role1", Code: "Code 1" };
        const second = { Id: "2", Name: "Role2", Code: "Code 1" };
        const third = { Id: "3", Name: "Role3", Code: "Code 1" };

        return [first, second, third] as Iteam[];
    }
}