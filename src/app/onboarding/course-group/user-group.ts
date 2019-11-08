import { ICourse } from "./course";
import { ICourseDetail } from '../course-details/model/courseDetail';

export interface IUserGroup {
    GroupId: string,
    GroupName: string,
    GroupCode: string,
    GroupDescription: string,
    CourseIds: string
}

export class UserGroup implements IUserGroup {

    constructor(
        public GroupId: string,
        public GroupName: string,
        public GroupCode: string,
        public GroupDescription: string,
        public CourseIds: string) {
    }
}

export interface IUserGroupResponse {
    courseGroup: IUserGroup[],
    count: number
}

export class UserGroupResponse implements IUserGroupResponse {

    constructor(
        public courseGroup: IUserGroup[],
        public count: number) {
    }
}

export interface IGetUserGroupResponse {
    userGroup: IUserGroup,
    courseDetail: ICourseDetail[]
}

export class GetUserGroupResponse implements IGetUserGroupResponse {

    constructor(
        public userGroup: IUserGroup,
        public courseDetail: ICourseDetail[]) {
    }
}