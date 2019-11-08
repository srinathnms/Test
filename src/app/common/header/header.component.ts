import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/providers/services/user-info.service';
import { HttpClient } from '@angular/common/http';
import { UserPermissionsService } from './service/user-permissions.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  status: string;
  userDetail: any;
  formDigestDetail: any;
  routeDetails: any[];

  routePath = [
    { "path": "onboarding/course-detail", "displayName": "Course Details", "category": "Onboarding", "isOther": false },
    { "path": "onboarding/user-role-detail", "displayName": "User Group Details", "category": "Onboarding", "isOther": false },
    { "path": "onboarding/add-plan-detail", "displayName": "Raise Onboarding", "category": "Onboarding", "isOther": false },
    { "path": "onboarding/plan-detail", "displayName": "Plan Detail", "category": "Onboarding", "isOther": true },
    { "path": "onboarding/plan-detail-summary", "displayName": "Plan Detail Summary", "category": "Onboarding", "isOther": false },
    { "path": "onboarding/dashboard", "displayName": "Dashboard", "category": "Onboarding", "isOther": false }
  ];

  constructor(private httpClient: HttpClient,
    private userInfoService: UserInfoService,
    private userPermissionsService: UserPermissionsService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit(): void {
    this.getFormDigest();
    this.getUserInfo();
  }

  public getUserInfo() {
    this.spinnerService.show();
    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/web/currentuser";
    this.httpClient.get(siteUrl, {
      headers:
      {
        "accept": "application/json;odata=verbose",
        "contentType": "text/xml"
      }
    }).subscribe((response: any) => {
      this.userDetail = response.d;
      this.userInfoService.setUserInfo(response.d);

      const userId = response.d.UserPrincipalName.substr(0, 6);
      if (userId != "" && userId != undefined && userId != null) {
        this.userPermissionsService.getUserById(userId)
          .subscribe(model => {
            this.spinnerService.hide();
            if (model != undefined && model != null && model.value) {
              this.routeDetails = this.routePath;
            } else {
              this.routeDetails = this.routePath.filter(route => route.isOther == true);
            }
          });
      }
    }, error => {
      this.spinnerService.hide();
      console.log(error);
    });
  }

  get routeLinkDetails(): any {
    return this.routeDetails;
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

  setStatus = message => {
    this.status = message;
  };
}
