import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';

import { IAssociateDetail } from 'src/app/providers/models/model/associateDetail';
import { IProject, IRole } from 'src/app/providers/models/model/models';
import { Iteam } from 'src/app/providers/models/model/team';
import { IAccountRole } from 'src/app/providers/models/model/accountRole';
import { IUserRole } from 'src/app/providers/models/model/userRole';
import { TeamService } from 'src/app/providers/services/service/team.service';
import { RoleService } from 'src/app/providers/services/service/role.service';
import { AssociateDetailService } from 'src/app/providers/services/service/associateDetail.service';
import { ProjectService } from 'src/app/providers/services/service/project.service';
import { AccountRoleService } from 'src/app/providers/services/service/accountRole.service';
import { UserRoleService } from 'src/app/providers/services/service/userRole.service';

import Stepper from 'bs-stepper'

@Component({
    selector: 'associate-detail',
    templateUrl: './associateDetail.component.html'
})

export class AssociateDetailComponent implements OnInit {

    associateForm: FormGroup;
    associateDetail: IAssociateDetail[];
    associateObject: IAssociateDetail;
    project: IProject[];
    team: Iteam[];
    accountRole: IAccountRole[];
    role: IRole[];
    userRole: IUserRole[]
    associateId: string;
    mode: string;
    isAdmin: boolean = false;
    stepper: Stepper;

    constructor(private fb: FormBuilder, private associateDetailService: AssociateDetailService,
        private route: ActivatedRoute, private router: Router, private projectService: ProjectService,
        private teamService: TeamService, private accountRoleService: AccountRoleService,
        private roleService: RoleService, private userRoleService: UserRoleService) {
    }
    ngOnInit() {
        this.stepper = new Stepper(document.querySelector(".bs-stepper"), {
            animation : true,
            linear: false
        })
        this.route.params.subscribe(params => { this.associateId = params["id"] });
        this.checkUserRole();
        this.buildForm();
        if (this.associateId) {
            this.associateDetailService.getAssociate(this.associateId)
            .subscribe(modal => {
                this.associateDetail = modal;
                this.mode = "Update";
                this.bindData();
            });
        }
        else {
            this.mode = "Add";
        }

        this.getProjectList();
        this.getAccountRole();
        this.getCognizantRole();
        // this.associateForm.get("ProjectId").valueChanges.subscribe((data: string) =>
        //     this.associateForm.get("TeamId").setValue(null));
    }

    next() {
        this.stepper.next();
    }
    back() {
        this.stepper.previous();
    }

    private buildForm() {
        this.associateForm = this.fb.group({
            CognizantId: ['', Validators.required],
            AssociateName: ['', Validators.required],
            RLGUserName: [''],
            RLGStaffId: [''],
            RLGRoleId: [null],
            RLGEmail: [''],
            AssetNo: [''],
            VirtualMachineNo: [''],
            Portfolio: [null],
            RLGDateofJoining: [''],
            RLGDateofLeaving: [''],
            RLGExperience: [''],
            Billable: [null],
            Location: [null],
            ContactNo: [''],
            ProjectId: [null, Validators.required],
            TeamId: [null],
            CognizantRoleId: [null, Validators.required],
            CognizantEmailId: ['', Validators.required],
            AssociateId: ['']
        });

        this.associateForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }
    private getProjectList() {
        this.projectService.get()
            .subscribe(modal => {
                this.project = modal
            });
    }

    private getAccountRole() {
        this.roleService.get().
            subscribe(modal => {
                this.role = modal
            });
    }

    private getCognizantRole() {
        this.accountRoleService.get().
            subscribe(modal => {
                this.accountRole = modal
            });
    }

    private checkUserRole() {
        this.userRoleService.get().subscribe(userRole => {
            this.userRole = userRole;
            if (this.userRole.find(i => i.Role == "Admin")) {
                this.isAdmin = true;
            }
        });
    }

    private bindData() {
        this.associateObject = this.associateDetail[0];
        this.onChangeProject(this.associateObject.ProjectId);
        this.associateForm.setValue({
            CognizantId: this.associateObject.CognizantId,
            AssociateName: this.associateObject.AssociateName,
            RLGUserName: this.associateObject.RLGUserName,
            RLGStaffId: this.associateObject.RLGStaffId,
            RLGRoleId: this.associateObject.RLGRoleId,
            RLGEmail: this.associateObject.RLGEmail,
            AssetNo: this.associateObject.AssetNo,
            VirtualMachineNo: this.associateObject.VirtualMachineNo,
            Portfolio: this.associateObject.Portfolio,
            RLGDateofJoining: this.associateObject.RLGDateofJoining ? moment(this.associateObject.RLGDateofJoining).utc() : this.associateObject.RLGDateofJoining,
            RLGDateofLeaving: this.associateObject.RLGDateofLeaving ? moment(this.associateObject.RLGDateofLeaving).utc() : this.associateObject.RLGDateofLeaving,
            RLGExperience: this.associateObject.RLGExperience,
            Billable: this.associateObject.Billable,
            Location: this.associateObject.Location,
            ContactNo: this.associateObject.ContactNo,
            ProjectId: this.associateObject.ProjectId,
            TeamId: this.associateObject.TeamId,
            CognizantRoleId: this.associateObject.CognizantRoleId,
            CognizantEmailId: this.associateObject.CognizantEmailId,
            AssociateId: this.associateObject.AssociateId
        });

    }

    private resetForm() {
        this.associateForm.reset();
    }
    private onValueChanged(data?: any) {

        if (!this.associateForm) {
            return;
        }
        const form = this.associateForm;
        for (const field in this.formErrors) {
            this.formErrors[field] = "";
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    onChangeProject(projectId: string) {

        if (projectId === "null") {
            this.team = [];
            return;
        }

        this.teamService.getTeamList(projectId)
            .subscribe(modal => { this.team = modal });
    }
    onSubmit(formData: any) {
        if (this.mode == "Update") {
            alert("Associate Details Updated Successfully.");
            // this.associateDetailService.put(formData)
            //     .subscribe(modal => {
            //         alert("Associate Details Updated Successfully.");
            //     });
        }
        else {
            alert("Associate Details Added Successfully.");
            // this.associateDetailService.post(formData)
            //     .subscribe(modal => {
            //         alert("Associate Details Added Successfully.");
            //     });
        }
    }

    formErrors = {
        'CognizantId': '',
        'AssociateName': '',
        'ProjectId': '',
        'CognizantRoleId': '',
        'CognizantEmailId': '',
        'AssetNo': ''

    };
    validationMessages = {
        'CognizantId': {
            'required': 'Cognizant employee id is required.'
        },
        'AssociateName': {
            'required': 'Associate name is required.'
        },
        'ProjectId': {
            'required': 'Project name is required.'
        },
        'CognizantRoleId': {
            'required': 'Cognizant role is required.'
        },
        'CognizantEmailId': {
            'required': 'Cognizant email id is required'
        }
    };
}