import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-population-details',
  templateUrl: './population-details.component.html',
  styleUrls: ['./population-details.component.css']
})
export class PopulationDetailsComponent implements OnInit {
  
  email: string;
  password: string;
  clients: any[];

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  
    constructor(private authService: AuthService,
      private router: Router,
      private flashMessagesService: FlashMessagesService,
      private clientService: ClientService,
    private settingsService: SettingsService) { }
  
    ngOnInit() {
      this.clientService.getClients().subscribe(clients => {
        console.log(clients);
        this.clients = clients;
      });

      this.authService.getAuth().subscribe(auth => {
        if(auth){
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        } else {
          this.isLoggedIn = false;
        }
      });
  
      this.showRegister = this.settingsService.getSettings().allowRegistration;
    }

    onSubmit(){
      this.authService.login(this.email, this.password)
        .then((res) => {
          this.flashMessagesService.show('You are logged in', {
            cssClass:'alert-success', timeout: 4000
          });
          this.router.navigate(['/dashboard']);
        })
        .catch((err) => {
          this.flashMessagesService.show(err.message, {
            cssClass:'alert-danger', timeout: 4000
          });
          this.router.navigate(['/login']);
        });
  
    }

    onLogoutClick(){
      this.authService.logout();
      this.flashMessagesService.show('You are logged out', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['/dashboard/login']);
    }


}
