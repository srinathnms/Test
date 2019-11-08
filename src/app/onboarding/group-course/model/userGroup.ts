import { ICourseDetail } from '../../course-details/model/courseDetail';

export interface IUserGroup {
    role:string;
    courseList: ICourseDetail[],
}