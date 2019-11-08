import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ICourse, Course } from './course';
import { CourseDetail } from '../course-details/model/courseDetail';
import { UserGroupResponse, UserGroup } from './user-group';

@Injectable()
export class CoursesService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "CourseDetails";
  }

  getCourseGroup(startItem: any) {
    var apiURL = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('CourseGroup')/items?%24skiptoken=Paged%3dTRUE%26p_ID%3d" + startItem + "&%24top=10";
    var apiURLLast = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('CourseGroup')/items?$top=1&$select=Id&$orderby=Created%20desc";
    let getCourses = this.httpClient.get(apiURL);
    let getCoursesCountLast = this.httpClient.get(apiURLLast);

    return forkJoin([getCourses, getCoursesCountLast]).pipe(map((resspone: any) => {
      debugger;
      console.log(resspone);
      const courseDetails = resspone[0].value.map(item => {
        return new UserGroup(
          item.ID,
          item.Title,
          item.GroupCode,
          item.GroupDescription,
          item.CourseIds
        );
      });

      return new UserGroupResponse(courseDetails, this.getCoursesCountLast(resspone[1]));
    }));
  }

  getCourses(searchValue: string, type: string): Observable<CourseDetail[]> {
    var apiURL = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('CourseDetail')/items?$filter=(startswith(Title,%27" + searchValue + "%27)%20and%20(CourseType%20eq%20%27" + type + "%27))";
    return this.httpClient.get(apiURL).pipe(map((resspone: any) => {
      debugger;
      console.log(resspone);
      return resspone.value.map(item => {
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
    }));
  }

  private getCoursesCountLast(resspone: any): any {
    debugger;
    if (resspone && resspone.value) {
      return resspone.value[0].Id
    }
    return 0;
  }

  private handleError(error: Response) {
    return Observable.throw(error.json() || "Server Error");
  }

  private getResponse(): ICourse[] {

    const first = { Id: "1", Name: "Course1", URL: "https://www.w3schools.com", Description: "Course1", CourseType: "A", DocumentType: "A" };
    const second = { Id: "2", Name: "Course2", URL: "https://www.tutorialspoint.com", Description: "Course2", CourseType: "B", DocumentType: "B" };
    const third = { Id: "3", Name: "Course3", URL: "https://www.geeks4geeks.com", Description: "Course3", CourseType: "C", DocumentType: "C" };

    return [first, second, third] as ICourse[];
  }

  private getResonse(): ICourse[] {

    const first = {
      Id: "1",
      Name: "Angular",
      URL: "https://angular.io/tutorial",
      Description: "Basic concepts",
      CourseType: "common",
      DocumentType: "txt"
    };
    const second = {
      Id: "12",
      Name: "Cucumber",
      URL: "https://Cucumber.io/tutorial",
      Description: "Advanced concepts in Automation Testing",
      CourseType: "RLG",
      DocumentType: "pdf"
    };
    const third = {
      Id: "123",
      Name: "Typescript",
      URL: "https://Typescript.io/tutorial",
      Description: "basics of TSC",
      CourseType: "common",
      DocumentType: "txt"
    };
    const fourth = {
      Id: "1234",
      Name: "Typescript",
      URL: "https://Typescript.io/tutorial",
      Description: "basics of TSC",
      CourseType: "Technology",
      DocumentType: "txt"
    };
    const fifth = {
      Id: "1234",
      Name: "Typescript",
      URL: "https://Typescript.io/tutorial",
      Description: "basics of TSC",
      CourseType: "Technology",
      DocumentType: "txt"
    };
    const sixth = {
      Id: "12346",
      Name: "Typescript",
      URL: "https://Typescript.io/tutorial",
      Description: "basics of TSC",
      CourseType: "RLG",
      DocumentType: "txt"
    };

    return [first, second, third, fourth, fifth, sixth] as ICourse[];
  }
}
