import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Output, EventEmitter, Inject } from '@angular/core';
import { CoursesService } from '../courses.service';
import { MatDialogRef } from '@angular/material';
import { ICourseDetail } from '../../course-details/model/courseDetail';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})
export class AddCourseDialogComponent implements OnInit {
  courseForm: FormGroup;
  submitted = false;
  courses: ICourseDetail[];
  marked: false;
  selectedCourses: ICourseDetail[] = [];
  courseLength: number = 0;
  @Output() submitClicked = new EventEmitter<any>();
  courseType: Array<string> = ['Common', 'Technology', 'RLG', 'Insurance'];
  documentType: Array<string> = ['Date', "File"];

  constructor(
    private courseDetailService: CoursesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      courseName: ['', [Validators.required]]
    });
  }

  get f() { return this.courseForm.controls; }

  onSearch(formData: any) {
    this.submitted = true;
    if (this.courseForm.invalid) {
      return;
    }
    this.spinnerService.show();
    this.courses = [];
    this.courseDetailService.getCourses(this.courseForm.get('description').value, this.courseForm.get('courseName').value)
      .subscribe(model => {
        this.spinnerService.hide();
        this.courses = model;
        this.courseLength = this.courses.length;
      });
  }

  onAddSubmit() {
    this.dialogRef.close(this.selectedCourses);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClear() {
    this.formDataClear();
  }

  toggleVisibility(e, data: any) {
    this.marked = e.target.checked;
    if (this.marked) {
      this.selectedCourses.push(data);
    }
    else {
      let i = this.selectedCourses.indexOf(data);
      this.selectedCourses.splice(i, 1);
    }
  }

  private formDataClear() {
    this.courseForm.setValue({
      courseName: "",
      description: ""
    });
    this.submitted = false;
    this.courses = [];
  }
}