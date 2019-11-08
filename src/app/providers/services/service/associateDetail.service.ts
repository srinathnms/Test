import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IAssociateDetail } from '../../models/model/associateDetail';
import { map } from 'rxjs/operators';

@Injectable()
export class AssociateDetailService {

    private baseUrl: string;
    private header: Headers;

    constructor(private httpInterceptorService: HttpClient) {
        this.baseUrl = "AssociateDetails";
        this.header = new Headers({ "Content-Type": "application/json" });
        // this.options = new RequestOptions({ headers: this.header });
    }

    getAssociate(associateId?: string): Observable<IAssociateDetail[]> {
        //return this.httpInterceptorService.get(this.baseUrl + "?AssociateId=" + associateId)
        return of(this.getResonse());

    }
    // post(modal: IAssociateDetail): Observable<IAssociateDetail> {
    //     let body = JSON.stringify(modal);
    //     return this.httpInterceptorService.post(this.baseUrl, body, this.options)
    //         .map((response: Response) => <IAssociateDetail>response.json())
    //         .catch(this.handleError);
    // }
    // put(modal: IAssociateDetail): Observable<IAssociateDetail> {
    //     let body = JSON.stringify(modal);
    //     return this.httpInterceptorService.put(this.baseUrl, body, this.options)
    //         .map((response: Response) => <IAssociateDetail>response.json())
    //         .catch(this.handleError);
    // }
    // deleteAssociate(associateId: string): Observable<any> {
    //     return this.httpInterceptorService.delete(this.baseUrl + "?Id=" + associateId)
    //         .map((response: Response) => <any>response.json())
    //         .catch(this.handleError);
    // }

    triggerOnboarding(associateId: string) {
        return this.httpInterceptorService.get("TriggerMail" + "?associateId=" + associateId)
            .pipe(map((response: Response) => <any>response.json()));
    }

    private handleError(error: Response) {
        return Observable.throw(error.json() || 'Server Error');
    }

    private getResonse(): IAssociateDetail[] {

        const first = {
            AssociateId: 12345,
            CognizantId: 12345,
            AssociateName: "wewerwer",
            ProjectName: "dsfsdfsdf",
            RLGUserName: "string",
            RLGStaffId: "string",
            RLGRoleId: "string",
            RLGEmail: "string",
            AssetNo: "string",
            VirtualMachineNo: "string",
            Portfolio: "string",
            RLGDateofJoining: new Date(),
            RLGDateofLeaving: new Date(),
            RLGExperience: 11,
            Billable: true,
            Location: "string",
            ContactNo: 234234,
            ProjectId: "string",
            TeamId: "string",
            CognizantRoleId: "string",
            CognizantEmailId: "string"
        };
        const second = {
            AssociateId: 12345,
            CognizantId: 12345,
            AssociateName: "wewerwer",
            ProjectName: "dsfsdfsdf",
            RLGUserName: "string",
            RLGStaffId: "string",
            RLGRoleId: "string",
            RLGEmail: "string",
            AssetNo: "string",
            VirtualMachineNo: "string",
            Portfolio: "string",
            RLGDateofJoining: new Date(),
            RLGDateofLeaving: new Date(),
            RLGExperience: 11,
            Billable: true,
            Location: "string",
            ContactNo: 234234,
            ProjectId: "string",
            TeamId: "string",
            CognizantRoleId: "string",
            CognizantEmailId: "string"
        };
        const third = {
            AssociateId: 12345,
            CognizantId: 12345,
            AssociateName: "wewerwer",
            ProjectName: "dsfsdfsdf",
            RLGUserName: "string",
            RLGStaffId: "string",
            RLGRoleId: "string",
            RLGEmail: "string",
            AssetNo: "string",
            VirtualMachineNo: "string",
            Portfolio: "string",
            RLGDateofJoining: new Date(),
            RLGDateofLeaving: new Date(),
            RLGExperience: 11,
            Billable: true,
            Location: "string",
            ContactNo: 234234,
            ProjectId: "string",
            TeamId: "string",
            CognizantRoleId: "string",
            CognizantEmailId: "string"
        };

        return [first, second, third] as IAssociateDetail[];
    }

}