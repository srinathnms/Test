import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BsDatepickerModule, PaginationModule, BsModalService } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ToasterModule, ToasterService} from 'angular2-toaster';

import { AssociatePlanComponent } from './associate-plan/associate-plan.component';
import { OnboardingRoutingModule } from './app-routing.module';
import { DashBoardComponent } from './dashboard/dashboard.component';

import { DashboardService } from '../providers/services/dashboard.service';

import { AssociateDetailComponent } from './associate-details/associateDetail.component';
import { AssociateListComponent } from './associate-details/associateList.component';

import { AccountRoleService } from '../providers/services/service/accountRole.service';
import { AssociateService } from '../providers/services/service/associate.service';
import { AssociateDetailService } from '../providers/services/service/associateDetail.service';
import { ModeService } from '../providers/services/service/mode.service';
import { ProjectService } from '../providers/services/service/project.service';
import { RoleService } from '../providers/services/service/role.service';
import { TeamService } from '../providers/services/service/team.service';
import { UserRoleService } from '../providers/services/service/userRole.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserInfoService } from '../providers/services/user-info.service';

import { CourseListComponent } from './course-details/course-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDetailService } from './course-details/service/courseDetail.service';
import { AddCourseDialogComponent } from './course-group/add-course-dialog/add-course-dialog.component';
import { GroupViewComponent } from './course-group/group-view/group-view.component';
import { UserRoleDetailsComponent } from './course-group/user-role-details/user-role-details.component';
import { UserroleComponent } from './course-group/userrole/userrole.component';
import { UserGroupService } from './course-group/user-group.service';
import { CoursesService } from './course-group/courses.service';
import { GroupCourseComponent } from './group-course/group-course.component';
import { UserGroupNewService } from './group-course/service/userGroup.service';
import { PlanSummaryComponent } from './plan-detail-summary/summary.component';

@NgModule({
  declarations: [
    AssociatePlanComponent,
    DashBoardComponent,
    AssociateDetailComponent,
    AssociateListComponent,
    CourseListComponent,
    CourseDetailsComponent,
    AddCourseDialogComponent,
    GroupViewComponent,
    UserRoleDetailsComponent,
    UserroleComponent,
    GroupCourseComponent,
    PlanSummaryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ToasterModule.forRoot(),
    OnboardingRoutingModule
  ],
  providers: [
    ToasterService,
    UserInfoService,
    DashboardService,
    AccountRoleService,
    AssociateService,
    AssociateDetailService,
    ModeService,
    ProjectService,
    RoleService,
    TeamService,
    UserRoleService,
    CourseDetailService,
    UserGroupService,
    CoursesService,
    BsModalService,
    UserGroupNewService
  ],
  entryComponents: [
    AddCourseDialogComponent,
    GroupViewComponent
  ]
})
export class OnboardingModule { }
