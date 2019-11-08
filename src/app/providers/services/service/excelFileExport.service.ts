// import { Injectable } from '@angular/core';
// import { HttpInterceptorService } from '../shared/httpInterceptor.service';
// import { Observable } from 'rxjs/Observable';
// import { Response, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';

// @Injectable()
// export class ExcelFileExportService {
//   private baseUrl: string;
//   private header: Headers;
//   private options: RequestOptions;

//   constructor(private httpInterceptorService: HttpInterceptorService) {
//     this.baseUrl = "ResourceMaster";
//     this.header = new Headers({ "Content-Type": "multipart/form-data" });
//     this.options = new RequestOptions({ headers: this.header });
//   }

//   post(model: any): any {
//     let body = JSON.stringify(model);
//     return this.httpInterceptorService.post(this.baseUrl, body, this.options)
//       .map((response: Response) => <any>response.json())
//       .catch(this.handleError);
//   }

//   private handleError(error: Response) {
//     return Observable.throw(error.json().error || 'Server Error');
//   }
// }
