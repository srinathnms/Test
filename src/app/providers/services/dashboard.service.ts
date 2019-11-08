import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IDashboard } from '../models/dashboard/dashboard.inteface';
import { Dashboard } from '../models/dashboard/dashboard';

@Injectable()
export class DashboardService {
    private baseUrl: string

    constructor() {
        this.baseUrl = "Dashboard"
    }

    get(): Observable<IDashboard[]> {
        return of(this.getResonse());
          // return this.httpInterceptorService.get(this.baseUrl)
        //     .pipe(map((response: IRole[]) => <IRole[]>response));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

    private getResonse(): IDashboard[] {

        const first = new Dashboard("1", "1", "1", "Project 1", "Team 1", "Role 1", 10, 7);
        const second = new Dashboard("2", "2", "2", "Project 2", "Team 2", "Role 2", 8, 6);
        const third = new Dashboard("3", "3", "3", "Project 3", "Team 3", "Role 3", 10, 5);
        const fourth = new Dashboard("4", "4", "4", "Project 4", "Team 4", "Role 4", 14, 5);
        const fifth = new Dashboard("5", "5", "5", "Project 4", "Team 4", "Role 4", 7, 2);
        const fifth2 = new Dashboard("7", "7", "7", "Project 4", "Team 4", "Role 4", 5, 3);

        return [first, second, third, fourth, fifth, fifth2] as IDashboard[];
    }

}