import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IMode, Mode } from '../../models/model/models';

@Injectable()
export class ModeService {
    private baseUrl:string

    constructor(public httpInterceptorService: HttpClient) {
        this.baseUrl = "Mode"
    }

    get(): Observable<IMode[]> {
        return of(this.getResonse());
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

    private getResonse(): IMode[] {

        const first = new Mode("1","CODE1","Project 1");
        const second = new Mode("1","CODE1","Project 1");
        const third = new Mode("1","CODE1","Project 1");

        return [first, second, third] as IMode[];
    }
}