// import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { IAssociatePlan } from '../model/associatePlan';
// import { IUpdateAssociatePlan } from '../model/update-associate-plan';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';

// import { HttpInterceptorService } from '../shared/httpInterceptor.service';

// @Injectable()
// export class AssociatePlanService {
//     private baseURL: string
//     private headers: Headers;
//     private options: RequestOptions;

//     constructor(public httpInterceptorService: HttpInterceptorService)
//     {
//         this.baseURL = "AssociatePlan/"
//         this.headers = new Headers({ 'Content-Type': 'application/json' });
//         this.options = new RequestOptions({ headers: this.headers });
//     }

//     query(): Observable<IAssociatePlan[]>
//     {
//         return this.httpInterceptorService.get(this.baseURL)
//             .map((response: Response) => <IAssociatePlan[]>response.json())
//             .catch(this.handleError);
//     }

//     getAssociatePlanStatus(ProjectGroupPlanId: string): Observable<IAssociatePlan[]> {
//         return this.httpInterceptorService.get(this.baseURL + "?projectGroupPlanId=" + ProjectGroupPlanId)
//             .map((response: Response) => <IAssociatePlan[]>response.json())
//             .catch(this.handleError);
//     }

//     uploadFile(id: string, formData: any): Observable<string> {
//         return this.httpInterceptorService.post(this.baseURL + id, formData)
//             .map((response: Response) => <string>response.json())
//             .catch(this.handleError);
//     }

//     put(id: string, model: IUpdateAssociatePlan): Observable<IAssociatePlan> {
//         let body = JSON.stringify(model);
//         return this.httpInterceptorService.put(this.baseURL + id, body, this.options)
//             .map((response: Response) => <IAssociatePlan>response.json())
//             .catch(this.handleError);
//     }

//     private handleError(error: Response) {
//         console.error(error);
//         return Observable.throw(error.json().error || "Server Error")
//     }
// }

