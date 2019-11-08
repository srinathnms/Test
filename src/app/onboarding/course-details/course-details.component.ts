import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourseDetail } from './model/courseDetail';
import { CourseDetailService } from './service/courseDetail.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html'
})
export class CourseDetailsComponent implements OnInit {
  courseId: string;
  mode: string;
  courseDetail: ICourseDetail;
  courseForm: FormGroup;
  submitted = false;
  status: string;
  formDigestDetail: any;

  courseType: Array<string> = ['Common', 'Technology', 'RLG', 'Insurance'];
  documentType: Array<string> = ['Date', "File"];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private courseDetailService: CourseDetailService,
    private httpClient: HttpClient,
    private toasterService: ToasterService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getFormDigest();
    this.createForm();
    this.route.params.subscribe(params => {
      this.courseId = params["id"]
    });

    if (this.courseId != "" && this.courseId != undefined && this.courseId != null) {
      this.courseDetailService.getCourseById(this.courseId)
        .subscribe(model => {
          this.courseDetail = model.value;
          this.mode = "Update";
          this.bindData();
        });
    }
    else {
      this.mode = "Add";
    }
  }

  createForm() {
    this.courseForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      code: ['', [Validators.required]],
      url: ['', [Validators.required]],
      description: ['', [Validators.required]],
      docType: ['', [Validators.required]],
      courseType: ['', [Validators.required]]
    });
  }

  get f() { return this.courseForm.controls; }

  private bindData() {
    const result = Object.assign({}, this.courseDetail);
    this.courseForm.setValue({
      title: result.title,
      code: result.code,
      url: result.url,
      description: result.description,
      docType: result.documentType,
      courseType: result.courseType
    });
  }

  changeCourseType(e) {
    this.getCourseType.setValue(e.target.value, { onlySelf: true });
  }

  get getCourseType() {
    return this.courseForm.get('courseType');
  }

  changeDocumentType(e) {
    this.docType.setValue(e.target.value, { onlySelf: true });
  }

  get docType() {
    return this.courseForm.get('docType');
  }

  onSubmit() {
    // // this.toasterService.pop("success", "Course Details", "Course Details Added Successfully");
    // // this.toasterService.pop("error", "Course Details", "Course Details Added Successfully");
    // // this.toasterService.pop("info", "Course Details", "Course Details Added Successfully");
    // // this.toasterService.pop("warning", "Course Details", "Course Details Added Successfully");
    this.submitted = true;
    if (this.courseForm.invalid) {
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
    let listName = "CourseDetail";
    var itemType = this.getItemTypeForListName(listName);
    var item = {
      "__metadata": { "type": itemType },
      "Title": this.courseForm.get('title').value,
      "Code": this.courseForm.get('code').value,
      "Reference": this.courseForm.get('url').value,
      "Description": this.courseForm.get('description').value,
      "CourseType": this.courseForm.get('courseType').value,
      "DocumentType": this.courseForm.get('docType').value
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
    this.spinnerService.show();
    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('" + listName + "')/items";
    this.httpClient.post<any>(siteUrl, JSON.stringify(item), options).subscribe((response: Response) => {
      this.spinnerService.hide();
      this.toasterService.pop("success", "Course Details", "Course Details Added Successfully");
      this.formDataClear();
      this.router.navigate(['/onboarding/course-detail']);
    }, error => {
      this.spinnerService.hide();
      this.toasterService.pop("error", "Course Details", "Error Occurred While Adding Course Details");
      console.log(error);
    });
  }

  public updateCourseDetail() {
    let listName = "CourseDetail";
    var itemType = this.getItemTypeForListName(listName);
    var item = {
      "__metadata": { "type": itemType },
      "Title": this.courseForm.get('title').value,
      "Code": this.courseForm.get('code').value,
      "Reference": this.courseForm.get('url').value,
      "Description": this.courseForm.get('description').value,
      "CourseType": this.courseForm.get('courseType').value,
      "DocumentType": this.courseForm.get('docType').value
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
    this.spinnerService.show();
    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('" + listName + "')/items(" + this.courseId + ")";
    this.httpClient.post<any>(siteUrl, JSON.stringify(item), options).subscribe((response: Response) => {
      this.spinnerService.hide();
      this.toasterService.pop("success", "Course Details", "Course Details Updated Successfully");
      this.formDataClear();
      this.router.navigate(['/onboarding/course-detail']);
    }, error => {
      this.spinnerService.hide();
      this.toasterService.pop("error", "Course Details", "Error Occurred While Updating Course Details");
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
      this.formDigestDetail = response;
      this.spinnerService.hide();
    }, error => {
      this.spinnerService.hide();
      console.log(error);
    });
  }

  private formDataClear() {
    this.courseForm.setValue({
      title: "",
      code: "",
      url: "",
      description: "",
      docType: "",
      courseType: ""
    });
    this.submitted = false;
  }
}