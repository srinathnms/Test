import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';
import { IUserGroup } from '../user-group';
import { AssociateDetailService } from 'src/app/providers/services/service/associateDetail.service';
import { UserGroupService } from '../user-group.service';
import { CoursesService } from '../courses.service';
import { MatDialog } from '@angular/material';
import { ICourseDetail } from '../../course-details/model/courseDetail';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-user-role-details',
  templateUrl: './user-role-details.component.html',
  styleUrls: ['./user-role-details.component.css']
})
export class UserRoleDetailsComponent implements OnInit {
  userRoleForm: FormGroup;
  userGroup: IUserGroup[];
  userGroupObject: IUserGroup;
  userRoleId: string;
  courseCount: number;
  coursesAdded: ICourseDetail[] = [];
  mode: string;
  isAdmin: boolean = false;
  submitted = false;
  formDigestDetail: any;

  constructor(private fb: FormBuilder, private associateDetailService: AssociateDetailService,
    private route: ActivatedRoute, private router: Router,
    private userRoleService: UserGroupService,
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private toasterService: ToasterService,
    private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.getFormDigest();
    this.route.params.subscribe(params => { this.userRoleId = params["id"] });
    this.checkUserRole();
    this.buildForm();
    this.courseCount = this.coursesAdded.length;
    if (this.userRoleId != "" && this.userRoleId != undefined && this.userRoleId != null) {
      this.spinnerService.show();
      this.userRoleService.getCourseById(this.userRoleId)
        .subscribe(modal => {
          this.spinnerService.hide();
          // this.userGroup = modal;
          this.coursesAdded = modal.value.courseDetail;
          this.userGroupObject = modal.value.userGroup;
          this.mode = "Update";

          this.bindData();
        });
    }
    else {
      this.mode = "Add";
    }
  }

  openDialog(): void {
    this.submitted = true;
    if (this.userRoleForm.invalid) {
      return;
    }

    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '70%',
      maxHeight: "700px",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

        result.forEach(e => {
          this.coursesAdded.push(e);
        });
        this.courseCount = this.coursesAdded.length;
      }
    });
  }

  deleteCourseDetail(courseData: any): void {
    const index: number = this.coursesAdded.indexOf(courseData);
    if (index !== -1) {
      this.coursesAdded.splice(index, 1);
    }
    this.courseCount = this.coursesAdded.length;
  }

  private buildForm() {
    this.userRoleForm = this.fb.group({
      groupName: ['', [Validators.required]],
      groupCode: ['', [Validators.required]],
      groupDescription: ['', [Validators.required]],
    });
  }

  get f() { return this.userRoleForm.controls; }

  private checkUserRole() {
    this.userRoleService.get().subscribe(userRole => {
      this.userGroup = userRole;
      if (this.userGroup.find(i => i.GroupName == "Admin")) {
        this.isAdmin = true;
      }
    });
  }
  private bindData() {
    this.userRoleForm.setValue({
      groupName: this.userGroupObject.GroupName,
      groupCode: this.userGroupObject.GroupCode,
      groupDescription: this.userGroupObject.GroupDescription
    });
  }

  private resetForm() {
    this.userRoleForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.userRoleForm.invalid && this.coursesAdded.length < 0) {
      return;
    }

    if (this.mode == "Update") {
      this.updateCourseDetail();
    }
    else {
      this.addCourseDetail();
    }
  }

  public addCourseDetail() {
    this.spinnerService.show();
    var courseIds = this.coursesAdded.map(a => a.id);
    let listName = "CourseGroup";
    var itemType = this.getItemTypeForListName(listName);
    var item = {
      "__metadata": { "type": itemType },
      "Title": this.userRoleForm.get('groupName').value,
      "GroupCode": this.userRoleForm.get('groupCode').value,
      "GroupDescription": this.userRoleForm.get('groupDescription').value,
      "CourseIds": courseIds.toString()
    };

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
      'Cache-Control': 'no-cache',
      'accept': 'application/json;odata=verbose',
      "X-HTTP-Method": "POST",
      "X-RequestDigest": this.formDigestDetail.FormDigestValue
    });
    let options = {
      headers: httpHeaders,
    };

    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('" + listName + "')/items";
    this.httpClient.post<any>(siteUrl, JSON.stringify(item), options).subscribe((response: Response) => {
      this.spinnerService.hide();
      this.toasterService.pop("success", "Course Group Details", "Course Group Details Added Successfully");
      this.router.navigate(['/onboarding/user-role-detail']);
    }, error => {
      this.spinnerService.hide();
      this.toasterService.pop("error", "Course Group Details", "Error Occurred While Adding Course Group Details");
      console.log(error);
    });
  }


  public updateCourseDetail() {
    this.spinnerService.show();
    var courseIds = this.coursesAdded.map(a => a.id);
    let listName = "CourseGroup";
    var itemType = this.getItemTypeForListName(listName);
    var item = {
      "__metadata": { "type": itemType },
      "Title": this.userRoleForm.get('groupName').value,
      "GroupCode": this.userRoleForm.get('groupCode').value,
      "GroupDescription": this.userRoleForm.get('groupDescription').value,
      "CourseIds": courseIds.toString()
    };

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
      'Cache-Control': 'no-cache',
      'Accept': 'application/json;odata=verbose',
      "X-HTTP-Method": "MERGE",
      "If-Match": "*",
      "X-RequestDigest": this.formDigestDetail.FormDigestValue
    });
    let options = {
      headers: httpHeaders,
    };

    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('" + listName + "')/items(" + this.userRoleId + ")";
    this.httpClient.post<any>(siteUrl, JSON.stringify(item), options).subscribe((response: Response) => {
      this.spinnerService.hide();
      this.toasterService.pop("success", "Course Group Details", "Course Group Updated Successfully");
      this.router.navigate(['/onboarding/user-role-detail']);
    }, error => {
      this.spinnerService.hide();
      this.toasterService.pop("error", "Course Group Details", "Error Occurred While Updating Course Group Details");
      console.log(error);
    });
  }

  public getItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.slice(1) + "ListItem";
  }

  public getFormDigest() {
    let options = {
      "accept": "application/json;odata=verbose",
      "contentType": "text/xml"
    };
    this.spinnerService.show();
    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/contextinfo";
    this.httpClient.post(siteUrl, options).subscribe((response: Response) => {
      this.spinnerService.hide();
      this.formDigestDetail = response;
    }, error => {
      this.spinnerService.hide();
      console.log(error);
    });
  }
}