export interface ICourseDetail {
    id:string,
    title:string,
    code: string,
    url:string,
    description:string,
    courseType:string,
    documentType:string
}

export class CourseDetail implements ICourseDetail {

    constructor(
        public id: string,
        public title: string,
        public code: string,
        public url: string,
        public description: string,
        public courseType: string,
        public documentType: string) {
    }
}

export interface ICourseResponse {
    courseDetail:ICourseDetail[],
    count: number
}

export class CourseResponse implements ICourseResponse {

    constructor(
        public courseDetail:ICourseDetail[],
        public count: number) {
    }
}