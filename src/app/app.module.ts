import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsDatepickerModule, PaginationModule  } from 'ngx-bootstrap';
import { ToasterModule, ToasterService} from 'angular2-toaster';
import { MatDialogModule, MatNativeDateModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import { OnboardingModule } from './onboarding/onboarding.module';
import { HomeComponent } from './common/home/home.component';
import { UserPermissionsService } from './common/header/service/user-permissions.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ToasterModule.forRoot(),
    MatDialogModule,
    MatNativeDateModule,
    OnboardingModule,
    AppRoutingModule
  ],
  providers: [ToasterService, Ng4LoadingSpinnerService, UserPermissionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
