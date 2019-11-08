import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IAssociateDetail } from 'src/app/providers/models/model/associateDetail';
import { IUserRole } from 'src/app/providers/models/model/userRole';
import { AssociateDetailService } from 'src/app/providers/services/service/associateDetail.service';
import { UserRoleService } from 'src/app/providers/services/service/userRole.service';


@Component({
    templateUrl: './associateList.component.html'
})
export class AssociateListComponent implements OnInit {

    associateDetail: IAssociateDetail[];
    id: any;
    associateId: string;
    public isView: boolean = false;
    modeType: string;
    userRole: IUserRole[]
    associateCount: number = 0;
    isAdmin: boolean = true;

    constructor(private associateDetailService: AssociateDetailService,
        private router: Router, private userRoleService: UserRoleService) {

    }
    ngOnInit() {
        this.getAssociateListDetails();
    }

    private getAssociateListDetails() {
        this.associateDetailService.getAssociate(this.id).subscribe(modal => {
            this.associateDetail = modal
            this.associateCount = modal.length;
        });

        // this.userRoleService.get().subscribe(userRole => {
        //     this.userRole = userRole;
        //     if (this.userRole.find(i => i.Role == "Admin")) {
        //         this.id = 0;
        //         this.isAdmin = true;
        //     }
        //     else {
        //         this.id = 1;
        //     }
        //     this.associateDetailService.getAssociate(this.id).subscribe(modal => {
        //         this.associateDetail = modal
        //         this.associateCount = modal.length;
        //     });
        // });
    }

    editAssociateDetail(associateId: string): any {
        this.router.navigate(['/associateDetail', associateId]);
    }

    addAssociateDetail(): void {
        this.isView = false;
        this.isView = true
        this.modeType = "Add";
    }
    closeDetail(isClose: boolean): void {
        this.isView = isClose;
    }
    deleteAssociateDetail(associateId: string): void {
        alert("Associate Deleted Successfully.");
        // this.confirmationDialogsService.confirmWithoutContainer("Confirmation", "Are you sure you want to delete this associate detail? ", true)
        //     .subscribe(result => {
        //         if (result) {
        //             this.associateDetailService.deleteAssociate(associateId)
        //                 .subscribe(data => this.alertService.success("Associate Deleted Successfully."));
        //             this.getAssociateListDetails();
        //         }
        //     })
    }
    
    triggerMail(associateId: string){
        alert("Onboarding Initiated Successfully");
        // this.associateDetailService.triggerOnboarding(associateId)
        //         .subscribe(modal => {
        //             this.alertService.success("Onboarding Initiated Successfully");
        //         });
    }
}
