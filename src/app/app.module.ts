import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import {NgxPaginationModule} from 'ngx-pagination';





import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PopulationDetailsComponent } from './components/population-details/population-details.component';
import { AddClientComponent } from './components/dashboard/add-client/add-client.component';
import { ClientDetailsComponent } from './components/dashboard/client-details/client-details.component';
import { ClientsComponent } from './components/dashboard/clients/clients.component';
import { EditClientComponent } from './components/dashboard/edit-client/edit-client.component';
import { LoginComponent } from './components/dashboard/login/login.component';
import { RegisterComponent } from './components/dashboard/register/register.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';

import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';

import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';
import { EventsComponent } from './components/events/events.component';


//creates routes
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'dashboard/login', component: LoginComponent},
    {path: 'dashboard/register', component: RegisterComponent, canActivate: [RegisterGuard]},
    {path: 'dashboard/settings', component: SettingsComponent, canActivate: [AuthGuard]},
    {path: 'dashboard/sidebar', component: SidebarComponent, canActivate: [AuthGuard]},
    {path: 'dashboard/add-client', component: AddClientComponent, canActivate: [AuthGuard]},
    {path: 'dashboard/clients', component: ClientsComponent, canActivate: [AuthGuard]},
    // {path: 'client/:id', component: ClientsComponent},
    {path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]},
    {path: 'edit-client/:id', component: EditClientComponent, canActivate: [AuthGuard]},
    {path: 'events', component: EventsComponent},
  {path: 'population-details', component: PopulationDetailsComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', component: PageNotFoundComponent}
 ]

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    PopulationDetailsComponent,
    AddClientComponent,
    ClientDetailsComponent,
    ClientsComponent,
    EditClientComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    SidebarComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'vdc-pannel-v2'),
    AngularFireAuthModule,
    NgxPaginationModule
  ],
  providers: [
    AngularFireDatabase,
    AngularFireDatabaseModule,
    ClientService,
    AuthService,
    SettingsService,
    AuthGuard,
    RegisterGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
