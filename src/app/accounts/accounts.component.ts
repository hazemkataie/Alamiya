import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  server: string = '';
  username: string = '';
  password: string = '';
  buttonColor: string = 'red';
  
  constructor(
    private location: Location
  ){}

  check(){
    if(this.username.trim() === this.password.trim() && this.username.trim() != '' && this.password.trim() != '' && this.server.trim() != ''){
      this.buttonColor = 'green';
    }
    else {
      this.buttonColor = 'red';
    }
  }

  goBack(): void {
    this.location.back();
  }
}
