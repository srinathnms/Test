import { Injectable } from '@angular/core';
import { IUserGroup } from '../model/userGroup';
import { IRole, Role } from '../model/role';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, concatMap } from 'rxjs/operators';
import { ICourseDetail } from '../../course-details/model/courseDetail';
import { UserDetail } from '../model/userDetail';


@Injectable()
export class UserGroupNewService {

    private baseUrl: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = "UserGroup";
    }

    getRoleOptions(): Observable<any> {
        var apiURL = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('CourseGroup')/items?%24skiptoken=Paged%3dTRUE%26p_ID%3d";
        return this.httpClient.get(apiURL).pipe(map((resspone: any) => {
            const roleOptions = resspone.value.map(item => {
                return new Role(
                    item.CourseIds,
                    item.GroupCode,
                    item.Title,
                );
            });
            console.log(roleOptions);
            return of(roleOptions);
        }));
    }

    getUserDetail(userId: any): Observable<any> {
        var apiURL = "https://cognizantonline.sharepoint.com/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|" + userId + "@cognizant.com'&$select=DisplayName,Email,Title";
        return this.httpClient.get(apiURL).pipe(map((resspone: any) => {
            debugger;
            console.log(resspone);
            if (resspone && resspone.DisplayName) {
                const userDetails = new UserDetail(
                    resspone.DisplayName,
                    resspone.Email,
                    resspone.Title,
                    userId
                );
                console.log(userDetails);
                return of(userDetails);
            }
            return of(null);
        }));
    }

    getPlanInfoDetail(userId: any): Observable<any> {
        debugger;
        var apiURL = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('PlanDetails')/items?$filter=AssociateID eq " + userId + "&$select=AssociateID";
        return this.httpClient.get(apiURL).pipe(concatMap((resspone: any) => {
            debugger;
            if (!resspone && !resspone.value) {
                return of(null);
            }

            var apiURL = "https://cognizantonline.sharepoint.com/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|" + userId + "@cognizant.com'&$select=DisplayName,Email,Title";
            return this.httpClient.get(apiURL).pipe(map((resspone: any) => {
                debugger
                if (resspone && resspone.DisplayName) {
                    const userDetails = new UserDetail(
                        resspone.DisplayName,
                        resspone.Email,
                        resspone.Title,
                        userId
                    );
                    console.log(userDetails);
                    return of(userDetails);
                }
            }));
        }));
    }
}