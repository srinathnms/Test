import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GroupViewComponent } from '../group-view/group-view.component';
import { IUserGroup } from '../user-group';
import { UserRoleService } from 'src/app/providers/services/service/userRole.service';
import { UserGroupService } from '../user-group.service';
import { PageChangedEvent } from 'ngx-bootstrap';
import { CoursesService } from '../courses.service';
import { MatDialog } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-userrole',
    templateUrl: './userrole.component.html',
    styleUrls: []
})
export class UserroleComponent implements OnInit {

    courseList: IUserGroup[];
    currentPage: number = 0;
    totalItems: number;

    constructor(private router: Router, private coursesService: CoursesService, private userGroupService: UserGroupService,
        private modalService: BsModalService,
        public dialog: MatDialog,
        private spinnerService: Ng4LoadingSpinnerService) {
    }

    ngOnInit() {
        this.getCourseList();
    }

    pageChanged(event: PageChangedEvent): void {
        this.currentPage = event.page;
        this.getCourseList();
    }

    viewCourseGroupDetail(courseIds: string): void {

        const dialogRef = this.dialog.open(GroupViewComponent, {
            width: '70%',
            maxHeight: "700px",
            data: { courseIds: courseIds }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
            }
        });
    }

    private getCourseList() {
        this.spinnerService.show();
        const startItem = this.currentPage * 10;
        this.coursesService.getCourseGroup(startItem).subscribe(modal => {
            this.spinnerService.hide();
            this.courseList = modal.courseGroup
            this.totalItems = modal.count;
        });
    }
}