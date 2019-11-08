import { Injectable } from '@angular/core';
import { ICourse } from './course';
import { Observable, of } from 'rxjs';
import { IUserGroup, GetUserGroupResponse, UserGroup } from './user-group';
import { HttpClient } from '@angular/common/http';
import { map, concatMap } from 'rxjs/operators';
import { CourseDetail } from '../course-details/model/courseDetail';

@Injectable()
export class UserGroupService {
  private baseUrl: string;
  private header: Headers;
  private options: any;
  courses: ICourse[];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "CourseDetails";
  }


  get(): Observable<IUserGroup[]> {
    return of(this.getResponse());
  }

  getCourseById(courseId?: string): Observable<any> {
    var apiURL = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('CourseGroup')/items(" + courseId + ")";

    return this.httpClient.get(apiURL).pipe(
      concatMap((courseGroupDetail: any) => this.secondPOSTCallToAPI(courseGroupDetail.CourseIds.split(',')).pipe(map(
        (resspone: any) => {
          debugger;
          console.log(courseGroupDetail);
          console.log(resspone);

          const userGroup = new UserGroup(
            courseGroupDetail.ID,
            courseGroupDetail.Title,
            courseGroupDetail.GroupCode,
            courseGroupDetail.GroupDescription,
            courseGroupDetail.CourseIds
          );
          const courseDetails = resspone.value.map(item => {
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

          const getUserGroupResponse = new GetUserGroupResponse(userGroup, courseDetails);

          return of(getUserGroupResponse);
        }
      )))
    );
  }

  getCourseDetailsByIds(courseIds?: string): Observable<any> {
    return this.secondPOSTCallToAPI(courseIds.split(',')).pipe(map(
      (resspone: any) => {
        debugger;
        console.log(resspone);
        const courseDetails = resspone.value.map(item => {
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

        return of(courseDetails);
      })
    );
  }

  private secondPOSTCallToAPI(courseIds: any) {
    debugger;
    let courseIdsG = "";
    courseIds.forEach((courseIdNew, index, array) => {
      if (index === (array.length - 1)) {
        courseIdsG = courseIdsG + "(Id eq " + courseIdNew + ")";
      } else if (courseIdsG) {
        courseIdsG = courseIdsG + "(Id eq " + courseIdNew + ") or";
      } else {
        courseIdsG = "(Id eq " + courseIdNew + ") or";
      }
    });

    var apiURL = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('CourseDetail')/items?$filter=(" + courseIdsG + ")";
    return this.httpClient.get(apiURL);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }

  private getResponse(): IUserGroup[] {

    const first = { GroupId: "1", GroupName: "Developer", GroupCode: "A", GroupDescription: "Project 1" };
    const second = { GroupId: "2", GroupName: "Automation Tester", GroupCode: "B", GroupDescription: "Project 2" };
    const third = { GroupId: "3", GroupName: "Manual Tester", GroupCode: "C", GroupDescription: "Project 3" };

    return [first, second, third] as IUserGroup[];
  }
}