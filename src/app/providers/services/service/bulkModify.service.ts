// import { Injectable } from '@angular/core';
// import { HttpInterceptorService } from '../shared/httpInterceptor.service';
// import { Observable } from 'rxjs/Observable';
// import { Response, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import { IUpdateProjectProgram } from '../model/projectprogram';


// @Injectable()
// export class BulkModifyService {

//     private baseUrl: string;
//     private ProjctListUrl:string;
//     private header: Headers;
//     private options: RequestOptions;

//     constructor(private httpInterceptorService: HttpInterceptorService) {
//         this.baseUrl = "ResourceMaster";
//         this.ProjctListUrl="ResourceMasterReference";
//         this.header = new Headers({ "Content-Type": "application/json" });
//         this.options = new RequestOptions({ headers: this.header });
//     }

//     getProjects(): Observable<any> {
//         return this.httpInterceptorService.get(this.ProjctListUrl)
//             .map((response: Response) => <any>response.json())
//             .catch(this.handleError);
//     }

//     put(modal: IUpdateProjectProgram): Observable<IUpdateProjectProgram> {
//         let body = JSON.stringify(modal);
//         return this.httpInterceptorService.put(this.baseUrl, body, this.options)
//             .map((response: Response) => <IUpdateProjectProgram>response.json())
//             .catch(this.handleError);
//     }
    
//     private handleError(error: Response) {
//         return Observable.throw(error.json().error || 'Server Error');
//     }
// }