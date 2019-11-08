import { Component, OnInit } from '@angular/core';
import { CourseDetailService } from './service/courseDetail.service';
import { ICourseDetail } from './model/courseDetail';
import { PageChangedEvent } from 'ngx-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courseDetail: ICourseDetail[];
  currentPage: number = 0;
  totalItems: number;

  constructor(private courseDetailService: CourseDetailService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getCourseListDetails();
  }

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.getCourseListDetails();
  }

  private getCourseListDetails() {
    const startItem = this.currentPage * 10;
    this.spinnerService.show();
    this.courseDetailService.getCourses(startItem).subscribe(model => {
      this.spinnerService.hide();
      this.courseDetail = model.courseDetail;
      this.totalItems = model.count;
    });
  }
}