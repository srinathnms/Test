// import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { IKnowledgeTransfer, KnowledgeTransfer } from '../model/knowledgeTransfer'
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import { HttpInterceptorService } from '../shared/httpInterceptor.service';
// import { of } from 'rxjs/observable/of';

// @Injectable()
// export class KnowledgeTransferService {
//     private baseUrl:string

//     constructor(public httpInterceptorService: HttpInterceptorService) {
//         this.baseUrl = "KnowledgeTransfer"
//     }

//     get(): Observable<IKnowledgeTransfer[]> {
//         return of(this.getResonse());
//     }

//     private handleError(error: Response) {
//         console.error(error);
//         return Observable.throw(error.json().error || 'Server error');
//     }

//     private getResonse(): IKnowledgeTransfer[] {

//         const first = new KnowledgeTransfer("1","test1","test1","ref1",3,"1","1","1");
//         const second = new KnowledgeTransfer("1","second test1"," second test1","ref1 second",3,"1","1","1");
//         const third = new KnowledgeTransfer("1","third test1","test1","ref1",3,"1","1","1");

//         return [first, second, third] as IKnowledgeTransfer[];
//     }
// }