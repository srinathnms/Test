// import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { IProjectGroup } from '../model/projectGroup'
// import { ICreateProjectGroup } from '../model/create-project-group'
// import { IUpdateProjectGroup } from '../model/update-project-group'
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import { HttpInterceptorService } from '../shared/httpInterceptor.service';

// @Injectable()
// export class ProjectGroupService {
//     private baseUrl:string
//     private headers: Headers;
//     private options: RequestOptions;

//     constructor(private httpInterceptorService: HttpInterceptorService) {
//         this.baseUrl = "ProjectGroup/"
//         this.headers = new Headers({ 'Content-Type': 'application/json' });
//         this.options = new RequestOptions({ headers: this.headers });
//     }

//     query(projectId: string): Observable<IProjectGroup[]> {
//         return this.httpInterceptorService.get(this.baseUrl + "?ProjectId=" + projectId)
//             .map((response: Response) => <IProjectGroup[]>response.json())
//             // .do(data => console.log("All: " + JSON.stringify(data)))
//             .catch(this.handleError);
//     }

//     post(model: ICreateProjectGroup): Observable<any> {
//         let body = JSON.stringify(model);
//         return this.httpInterceptorService.post(this.baseUrl, body, this.options)
//             .map((response: Response) => <any>response.json())
//             .catch(this.handleError);
//     }

//     put(id: string, model: IUpdateProjectGroup): Observable<any> {
//         let body = JSON.stringify(model);
//         return this.httpInterceptorService.put(this.baseUrl + id, body, this.options)
//             .map((response: Response) => <any>response.json())
//             .catch(this.handleError);
//     }

//     delete(id: string): Observable<any> {
//         return this.httpInterceptorService.delete(this.baseUrl + id, this.options)
//             .map((response: Response) => <any>response.json())
//             .catch(this.handleError);
//     }

//     private handleError(error: Response) {
//         console.error(error);
//         return Observable.throw(error.json().error || 'Server error');
//     }

// }