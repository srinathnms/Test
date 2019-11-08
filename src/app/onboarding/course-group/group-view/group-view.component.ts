import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IUserGroup } from '../user-group';
import { ICourse } from '../course';
import { CoursesService } from '../courses.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserGroupService } from '../user-group.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: []
})
export class GroupViewComponent implements OnInit {
  fromPage: any;
  title: string;
  closeBtnName: string;
  list: any[] = [];
  groupDetails: IUserGroup;
  courseCount: number;
  courseList: ICourse[];
  constructor(private coursesService: UserGroupService,
    public dialogRef: MatDialogRef<GroupViewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private spinnerService: Ng4LoadingSpinnerService) {
    debugger;
    this.fromPage = data.courseIds;
  }

  ngOnInit() {
    this.getCourseList();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  private getCourseList() {
    this.spinnerService.show();
    this.coursesService.getCourseDetailsByIds(this.fromPage).subscribe(modal => {
      this.spinnerService.hide();
      this.courseList = modal.value
      this.courseCount = modal.length;
    });
  }
}