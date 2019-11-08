import { Injectable } from '@angular/core';
import { ICourseDetail, CourseDetail, CourseResponse } from '../model/courseDetail';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CourseDetailService {

    private baseUrl: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = "CourseDetails";
    }

    getCourses(startItem: any) {
        // var apiURLGetCount = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('CourseDetail')/ItemCount";
        var apiURL = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('CourseDetail')/items?%24skiptoken=Paged%3dTRUE%26p_ID%3d" + startItem + "&%24top=10";
        var apiURLLast = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('CourseDetail')/items?$top=1&$select=Id&$orderby=Created%20desc";
        let getCourses = this.httpClient.get(apiURL);
        // let getCoursesCount = this.httpClient.get(apiURLGetCount);
        let getCoursesCountLast = this.httpClient.get(apiURLLast);

        return forkJoin([getCourses, getCoursesCountLast]).pipe(map((resspone: any) => {
            console.log(resspone);
            const courseDetails = resspone[0].value.map(item => {
                return new CourseDetail(
                    item.ID,
                    item.Title,
                    item.Code,
                    item.Reference,
                    item.Description,
                    item.CourseType,
                    item.DocumentType
                );
            });

            return new CourseResponse(courseDetails, this.getCoursesCountLast(resspone[1]));
        }));
    }

    getCourseById(courseId?: string): Observable<any> {
        var apiURL = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('CourseDetail')/items(" + courseId + ")";
        return this.httpClient.get(apiURL).pipe(map((resspone: any) => {
            const courseDetails = new CourseDetail(
                resspone.ID,
                resspone.Title,
                resspone.Code,
                resspone.Reference,
                resspone.Description,
                resspone.CourseType,
                resspone.DocumentType
            );

            return of(courseDetails);
        }));
    }

    post(model: ICourseDetail): Observable<ICourseDetail> {
        return of(null);
    }


    put(model: ICourseDetail): Observable<ICourseDetail> {
        return of(null);
    }

    delete(id: string): Observable<ICourseDetail> {
        return of(null);
    }

    private handleError(error: any) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

    private getCoursesCountLast(resspone: any): any {
        debugger;
        if (resspone && resspone.value) {
            return resspone.value[0].Id
        }
        return 0;
    }
}