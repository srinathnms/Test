import { Component, OnInit } from '@angular/core';
import { UserGroupNewService } from './service/userGroup.service';
import { IUserGroup } from './model/userGroup';
import { IGroupCourse } from './model/groupCourse';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IRole } from './model/role';
import { GroupViewComponent } from '../course-group/group-view/group-view.component';
import { UserGroupService } from '../course-group/user-group.service';
import { AddCourseDialogComponent } from '../course-group/add-course-dialog/add-course-dialog.component';
import { ICourseDetail } from '../course-details/model/courseDetail';
import { IUserDetail } from './model/userDetail';
import { ToasterService } from 'angular2-toaster';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-course',
  templateUrl: './group-course.component.html',
  styleUrls: ['./group-course.component.css']
})
export class GroupCourseComponent implements OnInit {
  courseForm1: FormGroup;
  associateId: string;
  associateIdCount: number = 0;
  associateIdList: Array<number> = [];
  isGenerateClicked: boolean;
  isGenerateDisabled: boolean;
  role: string;
  courseDetail: ICourseDetail[];
  groupCourse: IGroupCourse[] = [];
  groupCourseCount: number = 0;
  id: any;
  startDate: Date;
  incrementDate: Date;
  roleOptions: IRole;
  isAddCourseDisabled: boolean = true;
  userDetails: IUserDetail[] = [];
  formDigestDetail: any;

  courseForm: FormGroup;
  submitted = false;
  constructor(private userGroupService: UserGroupNewService, public dialog: MatDialog, private formBuilder: FormBuilder,
    private coursesService: UserGroupService,
    private router: Router,
    private toasterService: ToasterService,
    private httpClient: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getFormDigest();
    this.createForm();
    this.getRoleOptions();
  }

  createForm() {
    this.courseForm = this.formBuilder.group({
      associateId: ['', Validators.required],
      role: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  private getRoleOptions() {
    this.spinnerService.show();
    this.userGroupService.getRoleOptions().subscribe(options => {
      this.spinnerService.hide();
      this.roleOptions = options.value
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.courseForm.invalid) {
      return;
    }
  }
  get f() { return this.courseForm.controls; }

  addAssociateId() {
    this.associateId = this.courseForm.get('associateId').value;
    const isAssociateId = this.userDetails.filter(x => x.AssociateId === this.associateId);

    if (isAssociateId.length > 0) {
      this.toasterService.pop("info", "User Info", "Associate Id Adready Added");
      return;
    }

    this.userGroupService.getUserDetail(this.associateId).subscribe(model => {
      if (model && model.value) {
        this.userDetails.push(model.value);
      } else {
        this.toasterService.pop("info", "User Info", "Invalid User Id");
      }
    });
  }

  deleteAssociateId(data: any) {
    this.userDetails.splice(this.userDetails.indexOf(data), 1);
  }

  generateClicked() {
    this.submitted = true;
    if (this.courseForm.invalid) {
      return;
    }
    else {
      this.getCourseListDetails();
      if (this.groupCourseCount != 0 && this.startDate != null) {
        this.isGenerateClicked = true;
        this.isGenerateDisabled = true;
        this.isAddCourseDisabled = false;
      }
    }
  }

  clearData() {
    this.clearAll();
    this.courseForm.setValue({
      associateId: "",
      role: "",
      startDate: ""
    });
    this.submitted = false;
    this.courseDetail = null;
  }

  viewCourseGroupDetail(): void {
    const dialogRef = this.dialog.open(GroupViewComponent, {
      width: '70%',
      maxHeight: "700px",
      data: { courseIds: this.courseForm.get('role').value.toString() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
      }
    });
  }

  submitOnboardingDetails() {
    this.spinnerService.show();
    let listName = "PlanDetails";
    var itemType = this.getItemTypeForListName(listName);
    var item = [];
    this.userDetails.forEach(x => {
      this.groupCourse.forEach(y => {
        var test = {
          "__metadata": { "type": itemType },
          "AssociateID": x.AssociateId,
          "Week": y.week,
          "Day": y.day,
          "Date": y.startDate,
          "CourseCode": y.courseCode,
          "CourseTitle": y.title,
          "ReferenceUrl": y.url,
          "DocumentType": y.documentType,
          "CourseType": y.courseType
        }
        item.push(test);
      })
    });
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
    const calls = [];
    item.forEach((singleItem) => {
      calls.push(this.httpClient.post<any>(siteUrl, JSON.stringify(singleItem), options));
    });
    forkJoin(calls).subscribe(responses => {
      this.spinnerService.hide();
      this.userDetails.forEach(user => {
        this.sentMailUser(user);
      });
    });
  }

  public getItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.slice(1) + "ListItem";
  }

  private clearAll() {
    this.isGenerateDisabled = false;
    this.isGenerateClicked = false;
    this.groupCourse = [];
    this.isAddCourseDisabled = true;
  }

  private getCourseListDetails() {
    this.startDate = this.courseForm.get('startDate').value;
    this.incrementDate = this.startDate;
    if (this.startDate != null) {
      this.spinnerService.show();
      this.coursesService.getCourseDetailsByIds(this.courseForm.get('role').value).subscribe(modal => {
        this.spinnerService.hide();
        this.courseDetail = modal.value;
        this.courselist(this.courseDetail);
      });
    }
  }

  private courselist(courseList: ICourseDetail[]) {

    let i = 1, j = 1;
    this.getWeekDays(this.incrementDate);
    const uniquevalue = Array.from(new Set(courseList.map(obj => obj.courseType)));
    uniquevalue.forEach(x => {
      courseList.forEach(y => {
        if (x == y.courseType) {
          let data = {
            day: i.toString(),
            week: j.toString(),
            startDate: this.incrementDate.toString(),
            courseType: y.courseType,
            code: y.code,
            title: y.title,
            url: y.url,
            courseCode: y.code,
            documentType: y.documentType
          }
          this.groupCourse.push(data);
          let dt = new Date(this.incrementDate);
          dt.setDate(dt.getDate() + 1);
          this.getWeekDays(dt);
          if (i % 5 == 0) {
            j++;
          }
          i++;
        }
      })
    });
    this.groupCourseCount = this.groupCourse.length;
  }

  getWeekDays(newIncrementDate: Date) {
    let dt = new Date(newIncrementDate);
    if (dt.getDay() == 6) {
      dt.setDate(dt.getDate() + 2);
    } else if (dt.getDay() == 0) {
      dt.setDate(dt.getDate() + 1);
    }
    this.incrementDate = dt;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '70%',
      maxHeight: "700px",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.clearAll();
        this.groupCourse = [];
        result.forEach(e => {
          if (!this.courseDetail.some(x => x.title == e.title)) {
            this.courseDetail.push(e);
          }
        });
        this.incrementDate = this.startDate;
        this.courselist(this.courseDetail);
        this.isGenerateClicked = true;
        this.isGenerateDisabled = true;
      }
    });
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

  private sentMailUser(userDetail: IUserDetail) {
    this.spinnerService.show();
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

    const associateName = userDetail.DisplayName.replace("(Cognizant)", "");
    const template = this.getTemplate().replace("[AssociateName]", associateName);

    const data = {
      'properties': {
        '__metadata': {
          'type': 'SP.Utilities.EmailProperties'
        },
        'From': "Thirumalaivasan.S2@Cognizant.com",
        'To': {
          'results': [userDetail.Email]
        },
        'Body': template,
        'Subject': "Welcome to RLG"
      }
    };

    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/SP.Utilities.Utility.SendEmail";
    this.httpClient.post<any>(siteUrl, JSON.stringify(data), options)
      .subscribe((response: Response) => {
        this.toasterService.pop("success", "Onboarding", "Onboarding Raised Successfully");
        this.spinnerService.hide();
        this.router.navigate(["onboarding/plan-detail-summary"]);
      }, error => {
        this.toasterService.pop("error", "Onboarding", "Error Occurred While Raise Onboarding");
        this.spinnerService.hide();
      });
  }

  private getTemplate() {
    return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">

    <title></title>

    <style type="text/css" rel="stylesheet" media="all">
        body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            -webkit-text-size-adjust: none;
        }

        body {
            font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
        }

        body {
            background-color: #F4F4F7;
            color: #51545E;
        }

        .bodyclass {
            width: 100% !important;
            height: 100%;
            -webkit-text-size-adjust: none;
            font-family: "Nunito Sans&quot;, Helvetica, Arial, sans-serif";
            background-color: #F4F4F7;
            color: #51545E;
            margin: 0;
        }

        .preheader {
            display: none !important;
            visibility: hidden;
            mso-hide: all;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
        }

        p {
            color: #51545E;
        }

        p.sub {
            color: #6B6E76;
        }

        .email-wrapper {
            width: 100%;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #F4F4F7;
            margin: 0;
            padding: 0;
        }

        .p-clas {
            font-size: 16px;
            line-height: 1.625;
            color: #51545E;
            margin: 2.4em 0 0.1875em;
        }

        .p-clas-1 {
            font-size: 16px;
            line-height: 1.625;
            color: #51545E;
            margin: 0 0 0.1875em;
        }

        .h1-clas-1 {
            margin-top: 0;
            color: #333333;
            font-size: 22px;
            font-weight: bold;
            text-align: left;
        }

        .email-content-td {
            word-break: break-word;
            font-family: "Nunito Sans,Helvetica,Arial,sans-serif";
            font-size: 16px;
        }

        .button-green {
            background-color: #e2542f;
            border-top: 10px solid #e2542f;
            border-right: 18px solid #e2542f;
            border-bottom: 10px solid #e2542f;
            border-left: 18px solid #e2542f;
            margin-top: 15px !important;
        }

        .email-content {
            width: 100%;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            margin: 0;
            padding: 0;
        }

        @media only screen and (max-width: 600px) {

            .email-body_inner,
            .email-footer {
                width: 100% !important;
            }
        }

        @media (prefers-color-scheme: dark) {

            body,
            .email-body,
            .email-body_inner,
            .email-content,
            .email-wrapper,
            .email-masthead,
            .email-footer {
                background-color: #333333 !important;
                color: #FFF !important;
            }

            p,
            ul,
            ol,
            blockquote,
            h1,
            h2,
            h3 {
                color: #FFF !important;
            }

            .attributes_content,
            .discount {
                background-color: #222 !important;
            }

            .email-masthead_name {
                text-shadow: none !important;
            }
        }

        .content-cell {
            word-break: break-word;
            font-family: &quot;
            Nunito Sans&quot;
            ,
            Helvetica,
            Arial,
            sans-serif;
            font-size: 16px;
            padding: 35px;
        }

        .email-masthead_logo {
            width: 94px;
        }

        .email-masthead_name {
            font-size: 20px;
            font-weight: bold;
            color: #e2542f !important;
            text-decoration: none;
        }

        .email-body {
            word-break: break-word;
            margin: 0;
            padding: 0;
            font-family: &quot;
            Nunito Sans&quot;
            ,
            Helvetica,
            Arial,
            sans-serif;
            font-size: 16px;
            width: 100%;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #FFFFFF;
        }

        .email-body_inner {
            width: 570px;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #FFFFFF;
            margin: 0 auto;
            padding: 0;
        }

        .email-masthead {
            background-color: #421853;
            word-break: break-word;
            font-family: &quot;
            Nunito Sans&quot;
            ,
            Helvetica,
            Arial,
            sans-serif;
            font-size: 16px;
            text-align: center;
            padding: 25px 0;
        }

        .button {
        background-color: #e2542f;
        border-top: 10px solid #e2542f;
        border-right: 18px solid #e2542f;
        border-bottom: 10px solid #e2542f;
        border-left: 18px solid #e2542f;
        display: inline-block;
        color: #FFF;
        text-decoration: none;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
        -webkit-text-size-adjust: none;
        box-sizing: border-box;
    }

    @media only screen and (max-width: 500px) {
        .button {
            width: 100% !important;
            text-align: center !important;
        }
    }
    a {
            color: #3869D4;
        }

        a img {
            border: none;
        }
        .button {
            background-color: #3869D4;
            border-top: 10px solid #3869D4;
            border-right: 18px solid #3869D4;
            border-bottom: 10px solid #3869D4;
            border-left: 18px solid #3869D4;
            display: inline-block;
            color: #FFF;
            text-decoration: none;
            border-radius: 3px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
            -webkit-text-size-adjust: none;
            box-sizing: border-box;
        }    
    </style>
</head>

<body class="bodyclass" bgcolor="#F4F4F7">
    <span class="preheader">This is example text for the preheader set via the YAML front-matter for each email.</span>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation" bgcolor="#F4F4F7">
        <tr>
            <td class="email-content-td" align="center">
                <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td class="email-masthead" align="center">
                            <span class="email-masthead_name">
                                Welcome to RLG
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-body" width="100%" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
                            <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0"
                                role="presentation" bgcolor="#FFFFFF">
                                <tr>
                                    <td class="content-cell">
                                        <div class="f-fallback">
                                            <hr>
                                            <br>
                                            <h1 class="h1-clas-1" align="left">Dear [AssociateName]</h1>
                                            <p class="p-clas">
                                                Please use below link to access RLG Onboarding Application.</p>
                                                <br>
                                                <a href="https://cognizantonline.sharepoint.com/sites/TestWeb/SitePages/Development/Thiru/index.aspx" class="f-fallback button button-green" target="_blank" style="margin-top: 15px !important;color: #FFF; border-color: #e2542f; border-style: solid; border-width: 10px 18px; background-color: #e2542f; display: inline-block; text-decoration: none; border-radius: 3px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16); -webkit-text-size-adjust: none; box-sizing: border-box;">Click Here</a>

                                            <p class="p-clas">
                                                Note : Do not share access link with anyone and the attached document is
                                                for
                                                your reference.</p>
                                            <p class="p-clas">
                                                Kindly reach out to S, Thirumalaivasan(568182) for any issues.</p>

                                            <p class="p-clas">
                                                Thanks,</p>
                                            <p class="p-clas-1">
                                                RLG Onboarding Team.</p>
                                            <hr>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`;
  }
}