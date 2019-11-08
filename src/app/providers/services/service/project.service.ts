import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IProject, Project } from '../../models/model/models';

@Injectable()
export class ProjectService {
    private baseUrl:string

    constructor(private httpInterceptorService: HttpClient) {
        this.baseUrl = "Project"
    }

    get(): Observable<IProject[]> {
        return of(this.getResonse());
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

    private getResonse(): IProject[] {

        const first = new Project("1","PRD1","Project 1");
        const second = new Project("2","PRD2","Project 2");
        const third = new Project("3","PRD3","Project 3");

        return [first, second, third] as IProject[];
    }
}