import { Injectable } from '@angular/core';

@Injectable()
export class UserInfoService {
    userInfoDetail: string

    constructor() { }

    getUserInfo(): any {
        return this.userInfoDetail;
    }

    setUserInfo(userInfo: any): any {
        this.userInfoDetail = userInfo;
    }
}