import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NewGuard } from './new.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AdminAppComponent } from './admin.app/admin.app.component';
import { LogComponent } from './admin.app/log/log.component';
import { PreferencesComponent } from './admin.app/preferences/preferences.component'

import { ViewersComponent } from './viewers.app/viewers.app.component';
import { BestClosingRatioComponent } from './viewers.app/best-closing-ratio/best-closing-ratio.component';
import { TotalIssuesComponent } from './viewers.app/total-issues/total-issues.component';
import { MostIssuesComponent } from './viewers.app/most-issues/most-issues.component';
import { MostIssuesOpenedComponent } from './viewers.app/most-issues-opened/most-issues-opened.component';
import { MostIssuesClosedComponent } from './viewers.app/most-issues-closed/most-issues-closed.component';
import { MostCollaborativeProjectsComponent } from './viewers.app/most-collaborative-projects/most-collaborative-projects.component';
import { MostCommitsUserComponent } from './viewers.app/most-commits-user/most-commits-user.component';
import { MostCommitsLastWeekComponent } from './viewers.app/most-commits-last-week/most-commits-last-week.component';
import { SpecificProjectComponent } from './viewers.app/specific-project/specific-project.component';

const validRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'viewers'},
  { path: 'viewers', pathMatch: 'full', component: ViewersComponent},
  { path: 'admin/login', pathMatch: 'full', component: LogComponent },
  { path: 'admin/preferences', pathMatch: 'full', component: PreferencesComponent, canActivate: [NewGuard] }];


@NgModule({
  declarations: [
    AppComponent,
    AdminAppComponent,
    LogComponent,
    PreferencesComponent,
    ViewersComponent,
    BestClosingRatioComponent,
    TotalIssuesComponent,
    MostIssuesComponent,
    MostIssuesOpenedComponent,
    MostIssuesClosedComponent,
    MostCollaborativeProjectsComponent,
    MostCommitsUserComponent,
    MostCommitsLastWeekComponent,
    SpecificProjectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartModule,
    RouterModule.forRoot(validRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
