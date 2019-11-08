import { Component, OnInit } from '@angular/core';
import { CourseDetailService } from '../course-details/service/courseDetail.service';
import { ICourseDetail } from '../course-details/model/courseDetail';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IUserDetail } from '../group-course/model/userDetail';
import { ToasterService } from 'angular2-toaster';
import { UserGroupNewService } from '../group-course/service/userGroup.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
})
export class PlanSummaryComponent implements OnInit {
    courseForm: FormGroup;
    userDetails: IUserDetail[] = [];
    submitted = false;
    status: string;

    constructor(private courseDetailService: CourseDetailService,
        private formBuilder: FormBuilder,
        private toasterService: ToasterService,
        private userGroupService: UserGroupNewService,
        private spinnerService: Ng4LoadingSpinnerService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.courseForm = this.formBuilder.group({
            associateId: ['', Validators.required],
        });
    }

    get f() { return this.courseForm.controls; }

    addAssociateId() {
        debugger;
        this.status = "";
        this.userDetails = [];
        this.submitted = true;
        if (this.courseForm.invalid) {
            return;
        }
        const associateId = this.courseForm.get('associateId').value;
        this.spinnerService.show();
        this.userGroupService.getPlanInfoDetail(associateId).subscribe(model => {
            this.spinnerService.hide();
            debugger;
            if (model && model.value) {
                this.userDetails.push(model.value);
            } else {
                this.toasterService.pop("info", "User Info", "Could not find the associate status");
                this.status = "Could not find onboarding infomation for the associate";
            }
        });
    }
}