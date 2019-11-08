import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'rlg-pmo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    status: string;
    formDigestDetail: any;
    userInfo: any;
    isImageLoading: boolean;
    imageToShow: any;

    constructor(private httpClient: HttpClient,
        private toasterService: ToasterService,
        private spinnerService: Ng4LoadingSpinnerService) { }

    ngOnInit() {
        this.getFormDigest();
        this.getUserInfo();
    }

    public getUserInfo() {
        var siteUrl = "https://cognizantonline.sharepoint.com/_api/SP.UserProfiles.PeopleManager/GetMyProperties";
        this.spinnerService.show();
        this.httpClient.get(siteUrl).subscribe((response: any) => {
            var object = response.UserProfileProperties
                .reduce((obj, item) => Object.assign(obj, { [item.Key]: item.Value }), {});
            this.userInfo = object;
            this.spinnerService.hide();
        }, error => {
            console.log(error);
            this.spinnerService.hide();
        });
    }

    setStatus = message => {
        this.status = message;
    }

    sentMail() {
        this.sentMailUser();
    }

    private sentMailUser() {
        debugger;
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

        const data = {
            'properties': {
                '__metadata': {
                    'type': 'SP.Utilities.EmailProperties'
                },
                'From': "Thirumalaivasan.S2@Cognizant.com",
                'To': {
                    'results': ["Thirumalaivasan.S2@cognizant.com"]
                },
                'Body': `<!DOCTYPE html
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
                                                        <h1 class="h1-clas-1" align="left">Dear Chen, Daniel</h1>
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
            
            </html>`,
                'Subject': "Welcome to RLG"
            }
        };

        var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/SP.Utilities.Utility.SendEmail";
        this.httpClient.post<any>(siteUrl, JSON.stringify(data), options)
            .subscribe((response: Response) => {
                console.log(response);
                this.toasterService.pop("success", "Course Details", "Course Details Added Successfully");
            }, error => {
                console.log(error);
                this.toasterService.pop("error", "Course Details", "Error Occurred While Adding Course Details");
            });
    }

    private getFormDigest() {
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
            console.log(error);
            this.spinnerService.hide();
        });
    }
}