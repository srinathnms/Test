import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssociate, IAssociateProjectGroup } from '../../models/model/models';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AssociateService {
    private baseUrl:string

    constructor(public httpInterceptorService: HttpClient) {
        this.baseUrl = "Associate"
    }

    get(): Observable<IAssociate[]> {
        return this.httpInterceptorService.get(this.baseUrl)
        .pipe(map((response: IAssociate[]) => response));
    }

    getAssociateByProjectGroup(projectId: string, projectGroupId: string): Observable<IAssociateProjectGroup[]> {
        return this.httpInterceptorService.get(this.baseUrl + "?projectId=" + projectId + "&projectGroupId=" + projectGroupId)
            .pipe(map((response: IAssociateProjectGroup[]) => <IAssociateProjectGroup[]>response));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

}